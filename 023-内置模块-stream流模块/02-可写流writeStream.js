const fs = require("fs")

const ws = fs.createWriteStream("./2.txt", "utf-8")
ws.write("adwfasfs")
ws.write("dklqjfrowej")
ws.write("\nhello taosu")

ws.end()
