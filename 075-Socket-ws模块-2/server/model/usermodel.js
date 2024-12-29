const mongoose = require("mongoose")
const Schema = mongoose.Schema
//限制模型(自定义名字UserType),表示模型里只能存这三个类型数据
const UserType = {
    username: String,
    password: String,
    age: Number
}
//利用mongoose创建了一个user模型,将会对应users集合，即模型叫上面，自动生成对应集合+s（模型const UserModel = mongoose.model("aa")，模型叫aa，集合就叫aas
// const UserModel = mongoose.model("user", new mongoose.Schema(UserType))//const Schema=mongoose.Schema就可以改为美观一点：
const UserModel = mongoose.model("user", new Schema(UserType))

module.exports = UserModel