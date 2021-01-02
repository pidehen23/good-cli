const fse = require("fs-extra");
const path = require("path");

// 声明配置文件内容
const jsonConfig = {
  name: "good-cli",
  mirror: "https://github.com/chenjiajing23/react-template-pc/archive/master.zip"
};

// 拼接 config.json 完整路径
const configPath = path.resolve(__dirname, "../config.json");

async function defConfig() {
  try {
    // 利用 fs-extra 封装的方法，将 jsonConfig 内容保存成 json 文件
    await fse.outputJson(configPath, jsonConfig);
  } catch (err) {
    console.error(err);
    process.exit();
  }
}

module.exports = defConfig;
