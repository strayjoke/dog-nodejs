const Controller = require('./controller')
const sysUserModel = require('../models/sys_user')
const roleModel = require('../models/role')
const { formatData } = require('../transformers/sys_user')

class SysUser extends Controller {
    //获取系统用户
    async getSysUsers(req, res, next) {
        this.init()
        let total = 0
        try {
            const db = await sysUserModel.getSysUsers(req.query)
            const dbCount = await sysUserModel.getSysUsersCount(req.query)
            if (dbCount.length > 0) {
                total = dbCount[0].count
            }
            const newData = formatData(db)
            this.data = newData
            this.meta = { total }
        } catch (error) {
            this.code = 500
            this.msg = '请求异常,请稍后重试'
        }

        return res.status(this.code).json({
            data: this.data,
            meta: this.meta,
            msg: this.msg
        })
    }

    async getAuthInfo(req, res, next) {
        this.init()
        const userId = req.userId
        let roles = []

        try {
            let db = await sysUserModel.getSysUserById(userId)

            let rolesDb = await roleModel.getRolesBySysUserId(userId)
            if (rolesDb && rolesDb.length > 1) {
                rolesDb.forEach(item => {
                    roles.push(item.role_name)
                })
            }
            const sysUserData = formatData(db)[0]
            this.data = { roles, ...sysUserData }
        } catch (err) {
            this.code = 500
            this.msg = '请求异常,请联系管理员'
        }

        //返回响应
        return res.status(this.code).json({
            data: this.data,
            msg: this.msg
        })
    }
}

module.exports = new SysUser()