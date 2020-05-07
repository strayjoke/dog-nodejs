let formatData = (data) => {
    let newData = []
    data.forEach(item => {
        let newItem = {}
        newItem.id = item.id
        newItem.loginName = item.login_name
        newItem.name = item.nick_name

        newData.push(newItem)
    })
    return newData
}

module.exports = {
    formatData
}