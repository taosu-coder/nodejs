const fs = require("fs")

//追加内容
// fs.appendFile("./avatar/a.txt", "hello taosu", err => {
//     console.log(err)
// })
fs.appendFile("./avatar/a.txt", "\nhello taosu", err => {
    console.log(err)
})

//在原来基础上追加内容，不会覆盖原来的内容，加\n即换行追加