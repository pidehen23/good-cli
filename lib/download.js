const download = require("download");
const ora = require("ora"); // 请求 ora 库，用于实现等待动画
const chalk = require("chalk");
const fse = require("fs-extra");
const path = require("path");
const defConfig = require("./config");

// 拼接 config.json 完整路径
const cfgPath = path.resolve(__dirname, "../config.json");
// 拼接 template 模板文件夹完整路径
const tplPath = path.resolve(__dirname, "../template");

async function dlTemplate() {
  const exists = await fse.pathExists(cfgPath);
  if (exists) {
    // 这里记得加 await，在 init.js 调用时使用 async/await 生效
    await dlAction();
  } else {
    await defConfig();
    // 同上
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

  // 文件后缀名（可为空 template.zip）
  const FileSuffixName = ".zip"; // template.zip
  // 开始执行等待动画
  dlSpinner.start();
  try {
    // 下载模板后解压
    await download(
      jsonConfig.mirror + (jsonConfig.mirror.includes(".zip") ? "" : FileSuffixName),
      path.resolve(__dirname, "../template/"),
      { extract: true }
    );
  } catch (err) {
    // 下载失败时提示
    dlSpinner.text = chalk.red(`Download template failed. ${err}`);
    // 终止等待动画并显示 X 标志
    dlSpinner.fail();
    process.exit();
  }
  // 下载成功时提示
  dlSpinner.text = "Download template successful.";
  // 终止等待动画并显示 ✔ 标志
  dlSpinner.succeed();
}

// 将上面的 dlTemplate() 方法导出
module.exports = dlTemplate;
