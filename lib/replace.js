const ora = require("ora");
const chalk = require("chalk");
const fse = require("fs-extra");
const handlebars = require("handlebars");

/**
 * @description 文件字符串模板替换、
 * @param targetPath 文件路径
 * @param multiMeta 需要替换的配置，列如：{ name:'project-name' }
 */
async function replace(targetPath, multiMeta) {
  const spinner = ora(chalk.cyan("Initializing Project..."));
  spinner.start();
  // 把要替换的文件准备好
  const multiFiles = [`${targetPath}/package.json`];

  // 用条件循环把模板字符替换到文件去
  for (let i = 0; i < multiFiles.length; i++) {
    try {
      const multiFilesContent = await fse.readFile(multiFiles[i], "utf8");
      const multiFilesResult = await handlebars.compile(multiFilesContent)(multiMeta); // 替换文件，handlebars.compile(原文件内容)(模板字符)
      await fse.outputFile(multiFiles[i], multiFilesResult);
    } catch (err) {
      spinner.text = chalk.red(`Initialize project failed. ${err}`);
      spinner.fail();
      process.exit();
    }
  }
  spinner.stop();
}

module.exports = replace;
