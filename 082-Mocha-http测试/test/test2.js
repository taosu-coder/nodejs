//断言assert

var chai = require("chai")
var assert = chai.assert

//测试用例
describe("assert Demo", function () {
    it('use assert lib', function () {
        var value = "hello"
        assert.typeOf(value, 'string')
        assert.equal(value, "hello")
        assert.lengthOf(value, 5)
    })
})