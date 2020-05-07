const Model = require('./model')
const { pool, sqlExecute } = require('../db/mysql')

class Auth extends Model {
    login(loginName) {
        let sql = `SELECT id, nick_name, password FROM sys_user WHERE login_name = ? `
        return this.sqlExecute(sql, loginName)
    }

    checkApi(httpMethod, url, userId) {
        let sql = `SELECT COUNT(*) AS count FROM sys_menu m
          LEFT JOIN sys_role_menu rm ON m.menu_id = rm.menu_id
          WHERE m.menu_type= 'I' AND m.http_method = ? AND m.url = ? AND rm.role_id IN ( 
            SELECT r.role_id FROM sys_role r INNER JOIN sys_user_role ur
            ON ur.role_id = r.role_id WHERE ur.user_id = ?) `
        return this.sqlExecute(sql, [httpMethod, url, userId])
    }
}

module.exports = new Auth(pool, sqlExecute)