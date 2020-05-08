let jwt = require("jsonwebtoken")
const Controller = require('./controller')
const authModel = require('../models/auth')
const menuModel = require('../models/menu')
const { generateToken } = require('../middlewares/jwt')
const { deleteKey, setKey, getKey } = require('../db/redis')
const { addChild, formatData } = require('../transformers/menu')

class Auth extends Controller {
    //登录
    async login(req, res, next) {
        this.init()

        try {
            let { name, password } = req.body
            const db = await authModel.login(name)

            if (db.length === 1 && db[0].password === password) {
                //返回token
                let userData = { userId: db[0].id, loginName: name }
                const token = generateToken(userData)
                await setKey(token.split('.')[2], userData)

                this.data = {
                    token
                }
            }
        } catch (err) {
            this.code = 500
            this.msg = '请求异常,请联系管理员'
        }
        //返回相应
        return res.status(this.code).json({
            data: this.data,
            msg: this.msg
        })
    }

    //退出
    async logout(req, res, next) {
        this.init()

        try {
            let token = req.get("Authorization") ? req.get("Authorization").substr(7) : ""
            let { userId, loginName } = jwt.decode(token)
            req.userId = userId //登录id
            req.loginName = loginName //登录名

            await deleteKey(token.split('.')[2])
            await deleteKey(req.userId)
        } catch (err) {
            this.msg = "退出失败"
            this.code = 500
        }

        //返回响应
        return res.status(this.code).json({
            data: this.data,
            msg: this.msg
        })
    }

    //获取权限
    async getPermissions(req, res, next) {
        this.init()
        const userId = req.userId
        let cacheData = ""

        try {
            cacheData = await getKey(userId)
            if (cacheData) {
                this.data = cacheData
            } else {
                let db = await menuModel.getMenus()
                // let db = await menuModel.getMenusByUserId(userId)
                if (db.length >= 1) {
                    const permisssions = formatData(db)
                    this.data = {
                        menuPermissions: addChild(permisssions.menuData),
                        btnPermissions: permisssions.btnData,
                        pagePermissions: permisssions.pageData
                    }

                    await setKey(userId, this.data)
                }
            }

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

module.exports = new Auth()