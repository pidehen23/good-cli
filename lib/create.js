const fse = require("fs-extra");
const path = require("path");
const symbols = require("log-symbols");
const inquirer = require("inquirer"); // 请求 inquirer 库，用于控制台交互
const chalk = require("chalk");
const validateProjectName = require("validate-npm-package-name");

const download = require("./download");
const replace = require("./replace");
const repo = require("../config/repo");

/**
 * @description 创建模板
 * @param appName 创建的文件夹名
 */
async function createProject(appName) {
  const cwd = process.cwd();
  const targetDir = path.resolve(cwd, appName || ".");
  const result = validateProjectName(appName);

  // 校验文件名（不允许大写）
  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${appName}"`));
    result.errors &&
      result.errors.forEach(err => {
        console.error(chalk.red.dim("Error: " + err));
      });
    result.warnings &&
      result.warnings.forEach(warn => {
        console.error(chalk.red.dim("Warning: " + warn));
      });
    process.exit(1);
  }

  // todo 校验项目是否已经存在（可以优化，比如弹出交互式是否覆盖原文件等操作）
  if (fse.existsSync(targetDir)) {
    console.log(symbols.error, chalk.red("The project already exists."));
    process.exit(1);
  }

  try {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "frame",
        message: "请选择要生成的模版项目：",
        choices: Object.keys(repo),
        default: "react-template"
      },
      {
        type: "input",
        name: "projectName",
        message: "请输入项目名字：",
        default: "my-project"
      }
    ]);

    const url = repo[answers.frame]; // 选择的模板

    // 仓库下载地址
    if (!url) {
      console.log(chalk.yellow("仓库不存在"));
      process.exit(1);
    }

    // 下载文件
    await download(url, targetDir);

    // 把要替换的模板字符准备好
    const multiMeta = {
      project_name: answers.projectName
    };

    // 替换模板字符串
    await replace(targetDir, multiMeta);

    // 文件运行提示
    console.log(`
  To get started:

  	cd ${chalk.green(appName)}
  	${chalk.green("npm install")} or ${chalk.green("yarn install")}
  	${chalk.green("npm run dev")} or ${chalk.green("yarn dev")}
  					`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

// 将上面的 createProject(projectName) 方法导出
module.exports = createProject;
