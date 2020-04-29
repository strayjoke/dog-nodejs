const redis = require('redis')
const dbConfig = require('../config')

//建立连接
const redisClient = redis.createClient(dbConfig.redis)

//密码验证
if (dbConfig.redis.password) {
    redisClient.auth(dbConfig.redis.password, () => {
        console.log('redis auth success')
    })
}

/**
 * 存储字符串值
 * @param {string} key 
 * @param {mixin} value 
 * @param {int} expire 
 * 
 * return new Promise
 */
const setKey = (key, value, expire = dbConfig.redisExpire) => {
    return new Promise((resolve, reject) => {
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        redisClient.set(key, value, 'EX', expire, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

/**
 * 获取字符串类型值
 * @param {string} key 
 * 
 * return new Promise
 */
const getByKey = key => {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, res) => {
            if (err) {
                reject(err)
            } else {
                if (typeof res === 'string') {
                    res = JSON.parse(res)
                }
                resolve(res)
            }
        })
    })
}

/**
 * 删除字符串类型
 * @param {string} key 
 * 
 * return new Promise
 */
const deleteByKey = key => {
    return new Promise((resolve, reject) => {
        redisClient.del(key, (err, res) => {
            if (err) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

/**
 * 更新过期时间
 * @param {string} key 
 * @param {int} expire 
 * 
 *  return new Promise
 */
const expireByKey = (key, expire = dbConfig.redisExpire) => {
    return new Promise((resolve, reject) => {
        redisClient.expire(key, expire, (err, res) => {
            if (err || res === null) {
                reject(err)
            } else {
                resolve(res)
            }
        })
    })
}

/**
 * 获取字符串类型的值，并更新过期时间
 * @param {string} key 
 * @param {int} expire
 * 
 *  return new Promise 
 */
const getAndExpireByKey = (key, expire = dbConfig.redisExpire) => {
    const p1 = getByKey(key)
    const p2 = expireByKey(key, expire)
    return Promise.all([p1, p2]).then(res => res[0])
}

module.exports = {
    getByKey,
    getAndExpireByKey,
    setKey,
    deleteByKey,
    expireByKey
}