const Controller = require('./controller')
const dictModel = require('../models/dict')
const { formatData, formatItemData } = require('../transformers/dict')

class Dict extends Controller {
    // 获取字典列表
    async getDicts(req, res, next) {
        this.init()
        let total = 0
        try {
            let [db, dbCount] = await Promise.all([
                dictModel.getDicts(req.query),
                dictModel.getDictsCount(req.query)
            ])
            if (dbCount.length > 0) {
                total = dbCount[0].count
            }
            const newData = formatData(db)
            this.data = newData
            this.meta = { total }
        } catch (error) {
            this.code = 500
            this.msg = '请求异常,请稍后重试'
        }

        return res.status(this.code).json({
            data: this.data,
            meta: this.meta,
            msg: this.msg
        })
    }

    //根据type获取字典数据
    async getDictDatas(req, res, next) {
        this.init()
        try {
            const db = await dictModel.getDictDatas(req.query.type)
            this.data = formatItemData(db)
        } catch (error) {
            this.code = 500
            this.msg = '请求异常，请稍后重试'
        }

        return res.status(this.code).json({
            data: this.data,
            msg: this.msg
        })
    }

    //获取字典类型
    async getDictTypes(req, res, next) {
        this.init()
        try {
            const db = await dictModel.getDictTypes()
            this.data = formatData(db)
        } catch (error) {
            this.code = 500
            this.msg = '请求异常，请稍后重试'
        }

        return res.status(this.code).json({
            data: this.data,
            msg: this.msg
        })
    }


}

module.exports = new Dict()