class Controller {
    constructor(router) {
        this.router = router  //路由对象
        this.init()
    }

    init() {
        this.data = {}  //返回的数据
        this.errors = {} // 错误数据
        this.msg = 'success' //返回msg
        this.hasErrors = false //请求验证是否有错误标志位
        this.code = 200 //返回的http code
        this.meta = {}
    }
}

module.exports = Controller