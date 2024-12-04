function test() {
    console.log("test-aaa")
}

function upper(str) {
    _init()
    return str.substring(0, 1).toUpperCase() + str.substring(1)
}

function _init() {
    console.log("init")
}

//str.substring(1)从索引1开始的所有
//传统开发中命名加_表示是内部私人引用的，不希望被外部引用，不成文规定,所以还是可能被用，后来才有闭包等方法保护它，不给外面暴露