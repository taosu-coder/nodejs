function render(res, data, type = ""
) {
    //课件为type = "","content-type": `${type?type:"text/html"};charset=utf-8`
    res.writeHead(200, { "content-type": `${type ? type : "application/json"};charset=utf-8` })
    res.write(data, "utf-8")
    res.end()
}

const apiRouter = {
    "/api/login": (req, res) => {
        //后端对get请求的响应
        //获取前端传的参数
        const myURL = new URL(req.url, "http://127.0.0.1")
        // console.log(myURL.searchParams)//通过searchParams拿到数据searchParams.get("username")
        // console.log(myURL.searchParams.get("username"))
        if (myURL.searchParams.get("username") === "hh" && myURL.searchParams.get("password") === "123456") {
            render(res, `{"ok":1}`)
            //以后把ok：1改为登录成功，ok：0改为登录失败
        } else {
            render(res, `{"ok":0}`)
        }

    },
    "/api/loginpost": (req, res) => {
        //后端对post请求的响应
        //接收前端传的参数，可能数据太多所以不能用上面的get方法，用事件监听机制获取
        var post = ""
        req.on("data", chunk => {
            post += chunk
        })
        req.on("end", () => {
            // console.log(post)
            // console.log(post.password)
            //json字符串解析成js对象,不解析的话是不能post.password的
            post = JSON.parse(post)
            console.log(post)
            // console.log(post.password)
            if (post.username === "taosu" && post.password === "123456") {
                render(res, `{"ok":1}`)
            } else {
                render(res, `{"ok":0}`)
            }

        })


    }


}

module.exports = apiRouter