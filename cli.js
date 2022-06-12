#!/usr/bin/env node
const { program } = require('commander')
const process = require('process')
const pkg = require('./package.json')
const createAndPushTag = require('./index') 

program.version(pkg.version).parse(process.argv);
program.command('tag')
  .description('创建一个文件')
  .action(() => {
    createAndPushTag()
  })


program.parse(process.argv)