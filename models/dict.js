const Model = require('./model')
const { pool, sqlExecute } = require('../db/mysql')

class Dict extends Model {

    //字典数据
    getDicts() {
        let sql = `SELECT id, dict_name, type, status FROM sys_dict  WHERE 1 `
        let where = ''
        let orderSql = ''
        let limitSql = ''
        let params = []

        return this.sqlExecute(sql + where + orderSql + limitSql, params)
    }

    //字典数据总数
    getDictsCount() {
        let sql = `SELECT COUNT(*) AS count FROM sys_dict WHERE 1 `
        let where = ''
        let params = []

        return this.sqlExecute(sql + where, params)
    }

    //字典条目数据
    getDictDatas(type) {
        let sql = `SELECT id, dict_label, dict_value, dict_type, list_class, dict_sort, status FROM sys_dict_data  
            WHERE dict_type = ? `

        return this.sqlExecute(sql, type)
    }

    //字典数据
    getDictTypes() {
        let sql = `SELECT dict_name, type FROM sys_dict  WHERE 1 `

        return this.sqlExecute(sql)
    }
}

module.exports = new Dict(pool, sqlExecute)