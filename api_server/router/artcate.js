// 导入 express
const express = require('express')
// 创建路由对象
const router = express.Router()

const artcate_handler = require('../router_handler/artcate')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入文章分类的验证模块
const { add_cate_schema } = require('../schema/artcate')

// 获取文章分类的列表数据
router.get('/cates',artcate_handler.getArticleCates)

// 新增文章分类的路由
router.post('/addcates',expressJoi(add_cate_schema),artcate_handler.addArticleCates)

// 向外共享路由对象
module.exports = router