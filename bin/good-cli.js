#!/usr/bin/env node

const program = require("commander");

// const mirror=require("../lib/mirror");
const update = require("../lib/update");
const createProject = require("../lib/create");

// -v和--version是参数
program.version(require("../package.json").version, "-V, --version");

// create 创建化项目
program
  .name("good")
  .usage("<commands> [options]")
  .command("create <app-name>")
  .description("Please pick a preset：")
  .action(appName => {
    createProject(appName);
  });

// upgrade 检测更新
program
  .command("upgrade")
  .description("Check the good-cli version.")
  .action(() => {
    update();
  });

// todo mirror 切换镜像链接
// program
//   .command("mirror <template_mirror>")
//   .description("Set the template mirror.")
//   .action((tplMirror) => {
//     mirror(tplMirror);
//   });

// 解析命令行参数
program.parse(process.argv);
