const Model = require('./model')
const { pool, sqlExecute } = require('../db/mysql')

class Dict extends Model {

    getDicts() {
        let sql = `SELECT id, dict_name, type, status FROM sys_dict  WHERE 1 `
        let where = ''
        let orderSql = ''
        let limitSql = ''
        let params = []

        return this.sqlExecute(sql + where + orderSql + limitSql, params)
    }

    getDictsCount() {
        let sql = `SELECT COUNT(*) AS count FROM sys_dict WHERE 1 `
        let where = ''
        let params = []

        return this.sqlExecute(sql + where, params)
    }

    getDictDatas(type) {
        let sql = `SELECT id, dict_label, dict_value, dict_type, list_class, dict_sort, status FROM sys_dict_data  
            WHERE dict_type = ? `

        return this.sqlExecute(sql, type)
    }
}

module.exports = new Dict(pool, sqlExecute)