const express = require("express")
const app = express()
const mysql2 = require("mysql2")

app.get("/", async (req, res) => {
    const config = getDBConfig()
    //创建连接池，进行操作
    const promisePool = mysql2.createPool(config).promise()
    const name = "zhuozhuo"
    // var users = await promisePool.query("select * from students order by score limit 2 offset 0")

    //查询
    // var users = await promisePool.query(`select * from students where name="${name}" order by score limit 2 offset 0`)//不推荐这种查询
    // var users = await promisePool.query(`select * from students where name=? and gender=? order by score limit 2 offset 0`, [name, 1])

    //插入
    // var users = await promisePool.query(`insert into students (name,score,gender,class_id) values (?,?,?,?)`, ["taosu", 99, 2, 3])

    //更新
    // var users = await promisePool.query(`update students set name=? where id=?`, ["fanshu", 8])//[name,8]
    // var users = await promisePool.query(`update students set name=?,score=? where id=?`, ["fanshu", 75, 8])

    //删除
    var users = await promisePool.query(`delete from students where id=?`, [5])

    console.log(users[0])
    res.send({
        ok: 1,
        data: users[0]
    })
})

function getDBConfig() {
    return {
        host: '127.0.0.1',//地址
        port: 3306,//端口号
        user: "root",
        password: "",
        database: "taosu_test",//数据库
        connectionLimit: 1//连接池，创建多个就是多进程
    }
}
app.listen(3000)