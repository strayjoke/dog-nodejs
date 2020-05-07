const Model = require('./model')
const { pool, sqlExecute } = require('../db/mysql')

class SysUser extends Model {
    getSysUserById(id) {
        let sql = `SELECT id, nick_name, login_name FROM sys_user WHERE id = ? `
        return this.sqlExecute(sql, id)
    }

    getSysUsers() {
        let sql = `SELECT id, nick_name, login_name FROM sys_user  WHERE 1 `
        let where = ''
        let orderSql = ''
        let limitSql = ''
        let params = []

        return this.sqlExecute(sql + where + orderSql + limitSql, params)
    }

    getSysUsersCount() {
        let sql = `SELECT COUNT(*) AS count FROM sys_user WHERE 1 `
        let where = ''
        let params = []

        return this.sqlExecute(sql + where, params)
    }
}

module.exports = new SysUser(pool, sqlExecute)