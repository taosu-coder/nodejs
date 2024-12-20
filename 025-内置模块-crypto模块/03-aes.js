const crypto = require("crypto")

//加密encrypt
function encrypt(key, iv, data) {
    let dep = crypto.createCipheriv("aes-128-cbc", key, iv)
    return dep.update(data, "binary", "hex") + dep.final("hex")
}

function decrypt(key, iv, crypted) {
    crypted = Buffer.from(crypted, "hex").toString("binary")
    let dep = crypto.createDecipheriv("aes-128-cbc", key, iv)
    return dep.update(crypted, "binary", "utf8") + dep.final("utf8")
}

let key = "123456qwertyuiop"
let iv = "789+45zxcvbnmasd"
let data = "taosu"
let cryted = encrypt(key, iv, data)
console.log("加密结果-", cryted)

let decrypted = decrypt(key, iv, cryted)
console.log("解密结果-", decrypted)