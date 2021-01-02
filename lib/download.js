const download = require("download");
const ora = require("ora"); // 请求 ora 库，用于实现等待动画
const chalk = require("chalk");
const fse = require("fs-extra");
const path = require("path");
const defConfig = require("./config");

const cfgPath = path.resolve(__dirname, "../config.json");
const tplPath = path.resolve(__dirname, "../template");

async function dlTemplate() {
  const exists = await fse.pathExists(cfgPath);
  if (exists) {
    await dlAction();
  } else {
    await defConfig();
    await dlAction();
  }
}

async function dlAction() {
  // 清空模板文件夹的相关内容，用法见 fs-extra 的 README.md
  try {
    await fse.remove(tplPath);
  } catch (err) {
    console.error(err);
    process.exit();
  }

  // 读取配置，用于获取镜像链接
  const jsonConfig = await fse.readJson(cfgPath);
  // Spinner 初始设置
  const dlSpinner = ora(chalk.cyan("Downloading template..."));

  // 开始执行等待动画
  dlSpinner.start();
  try {
    // 下载模板后解压
    await download(jsonConfig.mirror, path.resolve(__dirname, "../template/"), {
      extract: true
    });
  } catch (err) {
    dlSpinner.text = chalk.red(`Download template failed. ${err}`);
    dlSpinner.fail();
    process.exit();
  }
  // 下载成功时提示
  dlSpinner.text = "Download template successful.";
  dlSpinner.succeed();
}

module.exports = dlTemplate;
