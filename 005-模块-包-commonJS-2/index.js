//解决a，b，c的js文件中方法重名moduleA
var moduleA = require('./a')
var moduleB = require('./b')
var moduleC = require('./c')
console.log(moduleA)

// moduleA()//这里会报错要用moduleA里的test才不报错
moduleB()
moduleC()

moduleA.test()
console.log(moduleA.upper("taosu"))