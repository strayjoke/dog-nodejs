const Controller = require('./controller')
const roleModel = require('../models/role')
const { formatData } = require('../transformers/role')
const { formatData: formatSysUserData } = require('../transformers/sys_user')

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

    async getRelatedSysUsers(req, res, next) {
        this.init()
        let total = 0
        try {
            let [db, dbCount] = await Promise.all([
                roleModel.getRelatedSysUsers(req.query),
                roleModel.getRelatedSysUsersCount(req.query)
            ])
            if (dbCount.length > 0) {
                total = dbCount[0].count
            }
            const newData = formatSysUserData(db)
            this.data = newData
            this.meta = { total }
        } catch (error) {
            this.code = 500
            this.msg = '请求异常,请稍后重试'
        }

        res.status(this.code).json({
            data: this.data,
            meta: this.meta,
            msg: this.msg
        })
    }
}

module.exports = new Role()