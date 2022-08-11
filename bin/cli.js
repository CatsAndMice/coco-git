#!/usr/bin/env node
const { program } = require('commander')
const process = require('process')
const pkg = require('../package.json')
const handoffUser = require('../src/handoffUser')
const isUpdateVersion = require('../src/isUpdateVersion')
const createInit = require('../src/createInit')
const { LICENSE, GITIGNORE } = require('../src/const')
const path = require('path')

program.version(pkg.version).parse(process.argv);
program.command('tag')
  .description('自动创建git tag并推送远程')
  .action(isUpdateVersion)

program.command('user')
  .description('切换git用户')
  .action(handoffUser)

program.command('init')
  .description('创建忽略文件与开源协议文件')
  .action(() => {
    const licenseDist = path.join(__dirname, `../${LICENSE}`)
    const gitignoreDist = path.join(__dirname, `../src/${GITIGNORE + 'Template'}.md`)
    createInit(LICENSE, licenseDist)
    createInit(GITIGNORE, gitignoreDist)
  })

program.parse(process.argv)