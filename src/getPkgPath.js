const process = require('process')
const fs = require('fs/promises')
const path = require('path')
const { isEmpty } = require('medash')
const { PKG_NAME } = require('./const')

module.exports = async function getPkgPath(cwd = process.cwd()) {
    return new Promise((resolve) => {
        const fn = async () => {
            const readdir = await fs.readdir(cwd)
            if (readdir.includes(PKG_NAME)) {
                return resolve(cwd + path.sep + PKG_NAME)
            }
            const cwdPath = cwd.split(path.sep)
            cwdPath.splice(cwdPath.length - 1, 1)
            cwd = cwdPath.join(path.sep)
            if (isEmpty(cwd)) {
                throw new Error(`没有找到${PKG_NAME}文件！`)
            }
            fn()
        }
        fn()
    })
}
