//应该should
var chai = require("chai")
chai.should()

//测试用例
describe("shoule Demo", function () {
    it('use should lib', function () {
        var value = "hello"
        value.should.exist.and.equal('hello').and.have.length(5).and.be.a('string')
        //value.should.be.a('string')
        // value.should.equal('hello')
        // value.should.not.equal('hello2')
        // value.should.have.length(5)
    })
})