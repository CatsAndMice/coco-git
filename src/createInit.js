const getPkgPath = require('./getPkgPath')
const { PKG_NAME } = require('./const')
const fs = require('fs')
const path = require('path')

/**
 * 复制文件
 * @param {*} src 需要复制的文件的路径
 * @param {*} dist 复制的内容
 */
function copyFile(src, dist) {
    fs.writeFileSync(dist, fs.readFileSync(src));
}

module.exports = async (fileName) => {
    let packagePath = await getPkgPath()
    packagePath = packagePath.replace(PKG_NAME, '')
    const dist = packagePath + fileName
    const isExists = fs.existsSync(dist)
    if (isExists) return
    const src = path.join(__dirname, `../${fileName}`)
    copyFile(dist, src)
}