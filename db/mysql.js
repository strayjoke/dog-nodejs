const mysql = require('mysql')
const dbConfig = require('../config')

//建立 mysql 连接池
const pool = mysql.createPool(dbConfig.mysql)

//封装 mysql 执行语句
const sqlExecute = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, params, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
}

//向外暴露方法
module.exports = {
    sqlExecute,
    pool
}