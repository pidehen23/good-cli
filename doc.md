# 前端 CLI 脚手架思路解析-从 0 到 1 搭建 和 npm 包的发布流程

## 什么时候需要脚手架

其实很多时候从 0 开始搭建的项目都可以做成模板，而脚手架的主要核心功能就是利用模板来快速搭建一个完整的项目结构，后续我们只需在这上面进行开发就可以了。

## 常用的 npm 包

[chalk](https://www.npmjs.com/package/chalk) （控制台字符样式）
[commander](commander) （实现 NodeJS 命令行，控制台的交互式命令）
[download](https://www.npmjs.com/package/download)、[download-git-repo](https://www.npmjs.com/package/download-git-repo) （二选一，实现文件远程下载）
[fs-extra](https://www.npmjs.com/package/fs-extra) （增强的基础文件操作库）
[handlebars](https://www.npmjs.com/package/handlebars) （实现模板字符替换）
[inquirer](https://www.npmjs.com/package/inquirer) （实现命令行之间的交互）
[log-symbols](https://www.npmjs.com/package/log-symbols) （为各种日志级别提供着色符号）
[ora](https://www.npmjs.com/package/ora) （优雅终端 Spinner 等待动画）
[update-notifier](update-notifier) （npm 在线检查更新）

## 参考

[Yarn vs npm：你需要知道的一切 npm](https://weekly.zoo.team/detail/npm)
