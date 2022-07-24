const process = require('process')
const fs = require('fs/promises')
const path = require('path')
const { isEmpty } = require('medash')
const {PKG_NAME} = require('./const')

module.exports = async function getPkgPath(cwd = process.cwd()) {
    const readdir = await fs.readdir(cwd)
    if (readdir.includes(PKG_NAME)) {
        return cwd + path.sep + PKG_NAME;
    }
    const cwds = cwd.split(path.sep)
    cwds.splice(cwds.length - 1, 1)
    cwd = cwds.join(path.sep)
    if (isEmpty(cwd)) {
        throw new Error(`没有找到${PKG_NAME}文件！`)
    }
    getPkgPath(cwd)
}
