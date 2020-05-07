const Model = require('./model')
const { pool, sqlExecute } = require('../db/mysql')

class User extends Model {
    getMenus() {
        let sql = `SELECT m1.id, m1.menu_name, m1.parent_id, m1.menu_order, m1.menu_type, m1.menu_key, m1.menu_url, m1.is_hidden, m1.http_method, m1.menu_icon FROM sys_menu m1
            LEFT JOIN sys_menu m2 ON m1.parent_id = m2.id  
            WHERE 1 `
        let where = ''
        let orderSql = ''
        let limitSql = ''
        let params = []

        return this.sqlExecute(sql + where + orderSql + limitSql, params)
    }

    getMenusByUserId(userId) {
        let sql = `SELECT DISTINCT m.id, m.parent_id, m.menu_name, m.menu_url, m.menu_key, 
         m.menu_type, m.menu_icon, m.menu_order,  m.http_method, m.is_hidden FROM sys_menu m 
         LEFT JOIN sys_role_menu rm ON m.id = rm.menu_id
         LEFT JOIN sys_user_role ur ON rm.role_id = ur.role_id
         LEFT JOIN sys_role r ON ur.role_id = r.id
         WHERE ur.user_id = ?
         ORDER BY m.menu_order`

        return this.sqlExecute(sql, userId)
    }
}

module.exports = new User(pool, sqlExecute)