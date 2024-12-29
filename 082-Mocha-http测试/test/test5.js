const fs = require("fs")
const fsp = fs.promises
var assert = require("assert")

//测试用例
//方法一：更推荐二
describe("异步测试1", () => {
    it("异步读取文件1", (done) => {
        fs.readFile("./1.txt", "utf8", (err, data) => {
            //执行测试时在079-Mocha-编写测试里，所以路径根据079文件夹找
            if (err) {
                done(err)
            } else {
                assert.strictEqual(data, "hello")
                done()//done意思就是等待一段时间再出结果,不加done的话即使有错误文件还是会显示成功
            }
        })
    })
})

//方法二：
describe("异步测试2", () => {
    it("异步读取文件2", async () => {
        var data = await fsp.readFile("./1.txt", "utf8")
        assert.strictEqual(data, "hello")
    })
})