const Model = require('./model')
const { pool, sqlExecute } = require('../db/mysql')

class User extends Model {
    getRoles() {
        let sql = `SELECT id, role_name, role_key, status FROM sys_role  WHERE 1 `
        let where = ''
        let orderSql = ''
        let limitSql = ''
        let params = []

        return this.sqlExecute(sql + where + orderSql + limitSql, params)
    }

    getRolesCount() {
        let sql = `SELECT COUNT(*) FROM sys_role WHERE 1 `
        let where = ''
        let params = []

        return this.sqlExecute(sql + where, params)
    }

    getRolesBySysUserId(userId) {
        let sql = `SELECT DISTINCT role_name FROM sys_role r
         INNER JOIN sys_user_role ur ON ur.role_id = r.id
         WHERE ur.user_id = ?`

        return this.sqlExecute(sql, userId)
    }

    getRelatedSysUsers() {
        let sql = `SELECT DISTINCT su.id, su.login_name, su.nick_name FROM sys_user su 
            LEFT JOIN sys_user_role ur ON su.id = ur.user_id`

        let where = ''
        let orderSql = ''
        let limitSql = ''
        let params = []

        return this.sqlExecute(sql + where + orderSql + limitSql, params)
    }

    getRelatedSysUsersCount() {
        let sql = `SELECT COUNT(DISTINCT su.id) AS count FROM sys_user su 
        LEFT JOIN sys_user_role ur ON su.id = ur.user_id`

        let where = ''
        let orderSql = ''
        let limitSql = ''
        let params = []

        return this.sqlExecute(sql + where + orderSql + limitSql, params)
    }
}

module.exports = new User(pool, sqlExecute)