# coco-git
它是一个自动创建、推送git tag脚本。

## 安装
```shell
npm i coco-git -D
```
## 使用
在`package.json`文件`scripts`添加`tag:coco tag`。
```js
//...
"scripts": {
  //...
  "tag":"coco tag"
}
//...
```
然后，执行`npm run tag`命令。
