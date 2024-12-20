var ologin = document.querySelector("#login")
var ologinpost = document.querySelector("#loginpost")
var username = document.querySelector("#username")
var password = document.querySelector("#password")
ologin.onclick = () => {
    // console.log(username.value, password.value)
    //get请求,前端通过？带过去后端，后端在req接收,api中获取
    fetch(`/api/login?username=${username.value}&password=${password.value}`).then(res => res.text()).then(res => {
        //因为fetch会进行json格式转换res.json()，之前api文件里传了ok：1不是json格式就会报错，要么改为“ok”：1严格json格式fetch才能解析要么res.text()不进行强行json格式转换
        console.log(res)
    })
}
ologinpost.onclick = () => {
    //post请求
    fetch(`/api/loginpost`, {
        method: "POST",
        //post方法中在body把数据传过去,network里payload有数据说明前端已经把数据发给后端了，后端再处理
        body: JSON.stringify({
            username: username.value,
            password: password.value
        }),
        headers: {
            "content-type": "application/json"
        }
    }).then(res => res.text()).then(res => {
        console.log(res)
    })
}