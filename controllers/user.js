const Controller = require('./controller')
const userModel = require('./models/user')

class User extends Controller {
    async getUserById() {
        await userModel.getUserById(id)
    }
    async getUsers() {
        await userModel.getUsers()
    }
}

module.exports = new User()