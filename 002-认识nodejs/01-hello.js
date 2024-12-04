console.log("hello world")
//在集成终端打开，并输入node ./01-hello.js（./01+tab键）=>执行01-hello.js代码，不需要在浏览器打开
function test() {
    console.log("test")
}
test()

console.log(window)
console.log(document)
//bom结构的全局对象window和dom结构的全局对象document在node环境下不支持，因为不用浏览器也不用渲染对象