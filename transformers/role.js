let formatData = (data) => {
    let newData = []
    data.forEach(item => {
        let newItem = {}
        newItem.id = item.id
        newItem.name = item.role_name
        newItem.status = item.status
        newItem.roleKey = item.role_key

        newData.push(newItem)
    })
    return newData
}

module.exports = {
    formatData
}