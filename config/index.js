const dotenv = require('dotenv')
dotenv.config()

//mysql 和 redis 配置
module.exports = {
    mysql: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD
    },
    redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },

    redisExpire: process.env.REDIS_EXPIRE,
    privateKey: process.env.PRIVATE_KEY,
    tokenExpire: process.env.TOKEN_EXPIRE
}
