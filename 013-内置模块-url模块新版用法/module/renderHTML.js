const exp = require("constants")

function renderHTML(url) {
    switch (url) {
        //渲染页面，/home 返回html字符串
        //渲染接口，/api/home 返回json字符串
        case "/home":
            return `
        <html>
        <div>home页面</div> 
        </html>
        `
        case "/list":
            return `
        <html>
        <div>list页面</div> 
        </html>
        `
        case "/api/home":
            return `
        {name:"taosu"}
        `
        case "/api/list":
            return `
        ["list1","list2","list3"]
        `
        default: return `
        <html>
        <div>404页面不存在</div> 
        </html>
        `
    }
}

module.exports = {
    renderHTML
}