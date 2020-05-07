const Controller = require('./controller')
const roleModel = require('../models/role')
const { formatData } = require('../transformers/role')

class Role extends Controller {
    // 获取角色列表
    async getRoles(req, res, next) {
        this.init()
        try {
            const db = await roleModel.getRoles()
            const newData = formatData(db)
            this.data = newData

        } catch (error) {
            this.code = 500
            this.msg = '请求异常,请稍后重试'
        }

        res.status(this.code).json({
            data: this.data,
            msg: this.msg
        })
    }
}

module.exports = new Role()