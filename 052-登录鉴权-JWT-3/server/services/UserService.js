// const { updateUser, deleteUser, getUser } = require("../controllers/Usercontroller")
const UserModel = require("../model/usermodel")
const UserService = {
    addUser: (username, password, age) => {
        return UserModel.create({
            // username:username,//省略写法：
            username, password, age
        })
    },

    updateUser: (_id, username, password, age) => {
        return UserModel.updateOne({ _id }, {
            username, password, age
        })
    },

    deleteUser: (_id) => {
        return UserModel.deleteOne({ _id: _id })
    },

    getUser: (page, limit) => {
        return UserModel.find({}, ["username", "age"]).sort({ age: 1 }).skip((page - 1) * limit).limit(limit)
    },

    login: (username, password) => {
        return UserModel.find({ username, password })
    }
}
module.exports = UserService