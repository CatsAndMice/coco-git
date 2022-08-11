# coco-git
它是一个创建、推送git tag自动化脚本。

## 安装
```shell
npm i coco-git -D
```
## 使用
功能1:
在`package.json`文件`scripts`添加`tag:coco tag`。
```js
//...
"scripts": {
  //...
  "tag":"coco tag"
}
//...
```
然后，执行`npm run tag`命令。自动创建git tag   
功能2:
```shell
npx coco init 
```
自动创建开源协议文件`LICENSE`与忽略文件`.gitignore`
