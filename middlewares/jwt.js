let jwt = require("jsonwebtoken")
const { privateKey, tokenExpire } = require("../config")
const { HTTP_METHOD_CONFIG } = require("../config/http")
const { getAndExpireKey } = require("../db/redis.js")

//生成token
let generateToken = (data, options = { expiresIn: tokenExpire }) => {
    let payload = Object.assign(
        { iat: Math.floor(Date.now() / 1000) - 30 },
        data
    )
    token = jwt.sign(payload, privateKey, options)
    return token
}

//认证和授权
let verifyPermission = async (req, res, next) => {
    let token = req.get("Authorization") ? req.get("Authorization").substr(7) : ""
    //不需要认证
    if (checkWhiteApi(req)) {
        next()
    } else { //需要认证
        if (!token) {
            res.status(401).json({
                msg: "认证失败，请重新登录"
            })
        } else {
            try {
                let { userId, loginName } = jwt.decode(token)
                req.userId = userId //登录id
                req.loginName = loginName //登录名

                await getAndExpireKey(token.split(".")[2], tokenExpire)

                //设置浏览器不缓存
                res.append("Cache-Control", "no-store")

                // 格式化
                let api = formatApi(req)

                next()
                // //检查权限
                // const db = await authModel.checkApi(
                //     api.httpMethod,
                //     api.url,
                //     userId
                // )
                // if (db[0].count >= 1) {
                //     next()
                // } else {
                //     res.status(403).json({
                //         msg: "没有权限执行该操作",
                //         data: {}
                //     })
                // }
            } catch (err) {
                res.status(401).json({
                    msg: "认证失败，请重新登录"
                })
            }
        }
    }
}

//格式化api数据
let formatApi = req => {
    let httpMethod = HTTP_METHOD_CONFIG.GET
    switch (req.method) {
        case "GET":
            break
        case "POST":
            httpMethod = HTTP_METHOD_CONFIG.POST
            break
        case "PUT":
            httpMethod = HTTP_METHOD_CONFIG.PUT
            break
        case "DELETE":
            httpMethod = HTTP_METHOD_CONFIG.DELETE
            break
        default:
            break
    }
    return {
        httpMethod,
        url: req.path.slice(1)
    }
}

//不需要认证的 api
let checkWhiteApi = req => {
    // 格式化
    let api = formatApi(req)

    if ((api.url === 'login' && api.httpMethod === HTTP_METHOD_CONFIG.POST)
        || (api.url === 'logout' && api.httpMethod === HTTP_METHOD_CONFIG.POST)) {
        return true
    }

    return false
}

module.exports = {
    generateToken,
    verifyPermission
}
