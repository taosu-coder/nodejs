//连接数据库,引入mongoose模块，使用mongoose的connect方法连接到本机ip下的27017端口号数据库，意味着可以连接别人的数据库
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/taosu_project")///taosu_project数据库名，没有就可以直接创建新数据库，但必须满足这个数据库插入集合和数据