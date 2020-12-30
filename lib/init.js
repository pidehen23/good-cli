const fse = require("fs-extra");
const path = require("path");
const ora = require("ora");
const chalk = require("chalk");
const symbols = require("log-symbols");
const inquirer = require("inquirer"); // 请求 inquirer 库，用于控制台交互
const handlebars = require("handlebars"); // 请求 handlebars 库，用于替换模板字符

// 请求 download.js 文件，模板不在本地时执行该操作
const dlTemplate = require("./download");

async function initProject(projectName) {
  try {
    const exists = await fse.pathExists(projectName);
    if (exists) {
      // 项目重名时提醒用户
      console.log(symbols.error, chalk.red("The project already exists."));
    } else {
      // 执行控制台交互
      inquirer
        .prompt([
          {
            type: "input", // 类型，其他类型看官方文档
            name: "name", // 名称，用来索引当前 name 的值
            message: "Set a project name for this project?",
            default: "react-template-pc" // 默认值，用户不输入时用此值
          }
        ])
        .then(async answers => {
          // Spinner 初始设置
          const initSpinner = ora(chalk.cyan("Initializing project..."));
          // 开始执行等待动画
          initSpinner.start();

          // 拼接 template 文件夹路径
          const templatePath = path.resolve(__dirname, "../template/");
          // 返回 Node.js 进程的当前工作目录
          const processPath = process.cwd();
          // 把项目名转小写
          const LCProjectName = projectName.toLowerCase();
          // 拼接项目完整路径
          const targetPath = `${processPath}/${LCProjectName}`;

          // 先判断模板路径是否存在
          const exists = await fse.pathExists(templatePath);
          if (!exists) {
            // 不存在时，就先等待下载模板，下载完再执行下面的语句
            await dlTemplate();
          }

          // 等待复制好模板文件到对应路径去
          try {
            await fse.copy(templatePath, targetPath);
          } catch (err) {
            console.log(symbols.error, chalk.red(`Copy template failed. ${err}`));
            process.exit();
          }

          // 把要替换的模板字符准备好
          const multiMeta = {
            file_name: LCProjectName, // 下载的文件名
            package_name: answers.name // package.json name
          };
          // 把要替换的文件准备好
          const multiFiles = [`${targetPath}/package.json`];

          // 用条件循环把模板字符替换到文件去
          for (let i = 0; i < multiFiles.length; i++) {
            try {
              // 等待读取文件
              const multiFilesContent = await fse.readFile(multiFiles[i], "utf8");
              // 等待替换文件，handlebars.compile(原文件内容)(模板字符)
              const multiFilesResult = await handlebars.compile(multiFilesContent)(
                multiMeta
              );
              // 等待输出文件
              await fse.outputFile(multiFiles[i], multiFilesResult);
            } catch (err) {
              initSpinner.text = chalk.red(`Initialize project failed. ${err}`);
              initSpinner.fail();
              process.exit();
            }
          }
          // success
          initSpinner.text = "Initialize project successful.";
          initSpinner.succeed();
          console.log(`
To get started:

	cd ${chalk.green(LCProjectName)}
	${chalk.green("npm install")} or ${chalk.green("yarn install")}
	${chalk.green("npm run dev")} or ${chalk.green("yarn run dev")}
					`);
        })
        .catch(error => {
          if (error.isTtyError) {
            console.log(
              symbols.error,
              chalk.red("Prompt couldn't be rendered in the current environment.")
            );
          } else {
            console.log(symbols.error, chalk.red(error));
          }
        });
    }
  } catch (err) {
    console.error(err);
    process.exit();
  }
}

// 将上面的 initProject(projectName) 方法导出
module.exports = initProject;
