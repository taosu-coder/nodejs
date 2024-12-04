function test() {
    console.log("test-aaa")
}

function upper(str) {
    return str.substring(0, 1).toUpperCase() + str.substring(1)
}

function _init() {
    console.log("init")
}

//导出（暴露）一个
// module.exports = test

//导出（暴露）多个
//方法一：
// module.exports = {
//     // test:test,
//     // upper:upper
//     //对象简写
//     test,
//     upper
// }

//方法二：
exports.test = test
exports.upper = upper