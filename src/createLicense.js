const getPkgPath = require('./getPkgPath')
const { PKG_NAME, GITIGNORE } = require('./const')
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

module.exports = async () => {
    let packagePath = await getPkgPath()
    packagePath = packagePath.replace(PKG_NAME, '')
    const gitignoreFile = packagePath + GITIGNORE
    const isExists = fs.existsSync(gitignoreFile)
    if (isExists) return
    const src = path.join(__dirname, `../src/${GITIGNORE}`)
    copyFile(src,gitignoreFile)
}