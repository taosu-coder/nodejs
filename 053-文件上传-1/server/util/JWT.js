//测试token加密与验证过程

const jwt = require('jsonwebtoken');
const secret = "taosu-anydata"
const JWT = {
    //加密
    generate(value, expires) {//数据，过期时间
        return jwt.sign(value, secret, { expiresIn: expires });

    },
    //解密
    verify(token) {
        //会在控制台报错，用try和catch捕获错误
        try {
            return jwt.verify(token, secret);
        } catch (error) {
            return false
        }

    }
}




module.exports = JWT