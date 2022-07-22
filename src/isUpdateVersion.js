const inquirer = require('inquirer');
const { eq } = require('medash');
const {createAndPushTag} = require('./index')

const lists = ['是', '否']
//是否更新version
module.exports = () => {
    inquirer.prompt([{
        name: 'list',
        type: 'list',
        message: '是否需要修改package.json文件中version字段值:',
        choices: lists,
        default: [lists[0]]
    }]).then(({ list }) => {
        createAndPushTag({ isUpdateVersion: eq(list, lists[0]) })
    })
}