const crypto = require("crypto")

//引入md5的哈希算法,转换不可逆
const hash = crypto.createHash("md5")
//要用sha1算法就将md5改为sha1

//可以多次执行
hash.update("hello world")
hash.update("taosu")
console.log(hash.digest("hex"))//以16进制方式展示，还可以"base64"方式