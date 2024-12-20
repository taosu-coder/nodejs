function render(res, data, type = ""
) {
    //课件为type = "","content-type": `${type?type:"text/html"};charset=utf-8`
    res.writeHead(200, { "content-type": `${type ? type : "application/json"};charset=utf-8` })
    res.write(data, "utf-8")
    res.end()
}

const apiRouter = {
    "/api/login": (res) => {
        render(res, `{ok:1}`)
    }
}

module.exports = apiRouter