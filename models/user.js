const Model = require('./model')
const { pool, sqlExcute } = require('../db/mysql')

class User extends Model {
    getUserById(id) {
        let sql = `SELECT id, phone, nick_name FROM users WHERE id = ? `
        return this.sqlExcute(sql, id)
    }

    getUsers(query) {
        let sql = `SELECT id, phone, nick_name FROM users  WHERE 1 `
        let where = ''
        let orderSql = ''
        let limitSql = ''
        let params = []

        return this.sqlExcute(sql + where + orderSql + limitSql, params)
    }

    getUsersCount(query) {
        let sql = `SELECT COUNT(*) FROM users WHERE 1 `
        let where = ''
        let params = []

        return this.sqlExcute(sql + where, params)
    }
}

module.exports = new User(pool, sqlExcute)