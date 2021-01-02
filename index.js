const download = require("download");
const path = require("path");
const ora = require("ora"); // 请求 ora 库，用于实现等待动画
const chalk = require("chalk");

const dlSpinner = ora(chalk.cyan("Downloading template..."));
dlSpinner.start();

try {
  download(
    "https://github.com/kevva/download/archive/master.zip",
    path.resolve(__dirname, "./test/"),
    {
      extract: true,
      filename: "template"
    }
  ).then(() => {
    dlSpinner.text = "Download template successful.";
    dlSpinner.succeed();
  });
} catch (err) {
  dlSpinner.text = chalk.red(`Download template failed. ${err}`);
  dlSpinner.fail();
  process.exit();
}
