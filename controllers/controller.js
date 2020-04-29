class Controller {
    constructor() {
        this.init()
    }

    init() {
        this.data = {}  //返回的数据
        this.errors = {} // 错误数据
        this.msg = 'success' //返回msg
        this.hasErrors = false //请求验证是否有错误标志位
        this.code = 200 //返回的http code
    }
}

module.exports = Controller