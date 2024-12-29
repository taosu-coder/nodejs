const axios = require("axios")
const assert = require("assert")
const supertest = require("supertest")
const app = require("../app")

//测试用例
// describe("测试接口1", () => {
//     it('返回html代码片段测试1', async () => {
//         //引入axios，前后端同构
//         var res = await axios.get("http://localhost:3000/")//axios拿回来的数据存在.data里
//         assert.strictEqual(res.data, "<h1>hello</h1>")
//     })
// })

describe("测试接口2", () => {
    // let server = app.listen(3000)//只要一走这个测试用例，server就启动起来   改为钩子函数
    let server
    it('返回html代码片段测试2', async () => {
        //引入axios，前后端同构
        await supertest(server).get("/")//期望get方式
            .expect("content-type", /text\/html/)//希望返回的是html格式的
            .expect(200, '<h1>hello</h1>')//期望状态码200，并且内容是hello
    })

    //在所有测试用例前，先走一下钩子函数before，启动服务器server
    before(() => {
        server = app.listen(3000)
    })

    //测完所有的用例后，自动调用钩子函数after，关闭服务器
    after(() => {
        server.close()
    })
})

//钩子函数还有beforeEach，afterEach，在test1中展示