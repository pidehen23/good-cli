const ora = require("ora");
const chalk = require("chalk");
const downloadRepo = require("download-git-repo");

async function download(url, folder) {
  await new Promise(function (resolve, reject) {
    const spinner = ora("downloading...");
    spinner.start();

    downloadRepo(`direct:${url}`, folder, { clone: true }, err => {
      spinner.stop();
      if (err) {
        spinner.text = chalk.red(`Download template failed. ${err}`);
        spinner.fail();

        reject(err);
        process.exit();
      } else {
        spinner.text = "Download template successful.";
        spinner.succeed();
        resolve();
      }
    });
  }).catch(function (e) {
    throw new Error(e);
  });
}

module.exports = download;
