#!/usr/bin/env zx
const user = require('./user')
const inquirer = require('inquirer')
const { $ } = require('zx')
const { eq, isObject, or, isEmptyObj } = require('medash')
const process = require('process')

const findUserFn = (value) => user.find(({ name }) => eq(name, value))
const names = user.map(({ name }) => name)
module.exports = async () => {
    const curName = await $`git config user.name`
    const defaultUser = findUserFn(curName.stdout.replace('\n', ''))
    inquirer.prompt([
        {
            name: 'list',
            type: 'list',
            message: '请选择用户:',
            choices: names,
            default: defaultUser.name || names[0]
        }
    ]).then(({ list }) => {
        const findUser = findUserFn(list)
        if (or(!isObject(findUser), isEmptyObj(findUser))) {
            console.log('用户配置有误！');
            return process.exit(0)
        }
        const { name, email, password } = findUser
        $`git config user.name ${name}`
        $`git config user.email ${email}`
        $`git config user.password ${password}`
    })
}