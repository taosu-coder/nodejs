var sum = require("../sum")
// var assert = require("assert")

//chai的assert风格
var chai = require("chai")
var assert = chai.assert
//chai的should风格
chai.should()
////chai的expect风格
var expect = chai.expect

//测试用例
describe("大的组测试1", () => {
    before(function () {
        console.log('before:');
    });

    after(function () {
        console.log('after.');
    });

    beforeEach(function () {
        console.log('  beforeEach:');
    });

    afterEach(function () {
        console.log('  afterEach.');
    });
    describe('小的组测试1', () => {
        it("sum() 结果应该返回 0", () => {
            // assert.strictEqual(sum(), 0)
            assert.equal(sum(), 0)
        })
        it("sum(1) 结果应该返回 1", () => {
            // assert.strictEqual(sum(1), 1)
            // assert.equal(sum(1), 1)
            sum(1).should.exist.and.equal(1)
        })
        it("sum(1,2) 结果应该返回 3", () => {
            // assert.strictEqual(sum(1, 2), 3)
            // assert.equal(sum(1, 2), 3)
            expect(sum(1, 2)).to.equal(3)
        })
        it("sum(1,2,3) 结果应该返回 6", () => {
            // assert.strictEqual(sum(1, 2, 3), 6)
            assert.equal(sum(1, 2, 3), 6)
        })
        // before(function () {
        //     console.log('before:');
        // });

        // after(function () {
        //     console.log('after.');
        // });

        // beforeEach(function () {
        //     console.log('  beforeEach:');
        // });

        // afterEach(function () {
        //     console.log('  afterEach.');
        // });
    })
    describe("小的组测试2", () => {

    })
})
