const crypto = require("crypto")

const hmac = crypto.createHmac("md5", "taosu")
//md5是算法也可以sha1、sha256等，第二个参数是密钥
hmac.update("hello world")
console.log(hmac.digest("hex"))