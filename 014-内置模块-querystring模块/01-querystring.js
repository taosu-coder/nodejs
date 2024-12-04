//parse 字符串解析为对象解构
var str = "name=taosu&age=100&location=zh"
var querystring = require("querystring")
var obj = querystring.parse(str)
console.log(obj)

//stringify 对象编码为字符串
var myobj = {
    a: 1,
    b: 2,
    c: 3
}
var mystr = querystring.stringify(myobj)
console.log(mystr)

//escape 将特殊字符进行转义，防止sql注入
var str1 = "id=3&city=beijing&url=https://www.baidu.com"
var escaped = querystring.escape(str1)
console.log(escaped)

//unescape 转回来
var str2 = "id%3D3%26city%3Dbeijing%26url%3Dhttps%3A%2F%2Fwww.baidu.com"
var unescaped = querystring.unescape(str2)
console.log(unescaped)
