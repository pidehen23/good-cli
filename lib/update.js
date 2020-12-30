const updateNotifier = require("update-notifier"); // 用于检查更新
const chalk = require("chalk");
const pkg = require("../package.json");

const notifier = updateNotifier({
  pkg,  // 从 package.json 获取 name 和 version 进行查询
  updateCheckInterval: 1000, // 设定检查更新周期，默认为 1000 * 60 * 60 * 24（1 天） 这里设定为 1000 毫秒（1秒）
});

function updateChk() {
  // 当检测到版本时，notifier.update 会返回 Object 此时可以用 notifier.update.latest 获取最新版本号
  if (notifier.update) {
    console.log(`New version available: ${chalk.cyan(notifier.update.latest)}, it's recommended that you update before using.`);
    notifier.notify();
  } else {
    console.log("No new version is available.");
  }
}

module.exports = updateChk;
