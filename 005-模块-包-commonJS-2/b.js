//在哪用在哪引入
var moduleA = require('./a')

function test() {
    console.log("test-bbb")
}

console.log(moduleA.upper("fanshu"))
module.exports = test

