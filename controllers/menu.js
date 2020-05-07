const Controller = require('./controller')
const menuModel = require('../models/menu')
const { addChild, formatMenus } = require('../transformers/menu')

class Menu extends Controller {
    // 获取菜单列表
    async getMenus(req, res, next) {
        this.init()
        try {
            const db = await menuModel.getMenus(req.query)
            const newData = addChild(formatMenus(db))
            this.data = newData
        } catch (error) {
            this.code = 500
            this.msg = '请求异常,请稍后重试'
        }
        //返回响应
        return res.status(this.code).json({
            data: this.data,
            msg: this.msg
        })
    }
}

module.exports = new Menu()