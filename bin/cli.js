#!/usr/bin/env node
const { program } = require('commander')
const process = require('process')
const pkg = require('../package.json')
const handoffUser = require('../src/handoffUser')
const isUpdateVersion = require('../src/isUpdateVersion')
program.version(pkg.version).parse(process.argv);
program.command('tag')
  .description('自动创建git tag并推送远程')
  .action(isUpdateVersion)

program.command('user')
  .description('切换git用户')
  .action(handoffUser)


program.parse(process.argv)