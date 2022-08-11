const getPkgPath = require('./getPkgPath')
const { PKG_NAME } = require('./const')
const fs = require('fs')

/**
 * 复制文件
 * @param {*} src 需要复制的文件的路径
 * @param {*} dist 复制的内容
 */
function copyFile(src, dist) {
    fs.writeFileSync(src, fs.readFileSync(dist));
}

module.exports = async (fileName,dist) => {
    let packagePath = await getPkgPath()
    packagePath = packagePath.replace(PKG_NAME, '')
    const src = packagePath + fileName
    const isExists = fs.existsSync(src)
    if (isExists) return
    copyFile(src, dist)
}