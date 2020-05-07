let formatData = (data) => {
    let newData = []
    data.forEach(item => {
        let newItem = {}
        newItem.id = item.id
        newItem.name = item.dict_name
        newItem.type = item.type
        newItem.status = item.status

        newData.push(newItem)
    })
    return newData
}

let formatItemData = (data) => {
    let newData = []
    data.forEach(item => {
        let newItem = {}
        newItem.id = item.id
        newItem.value = item.dict_value
        newItem.label = item.dict_label
        newItem.listClass = item.list_class
        newItem.type = item.dict_type
        newItem.sort = item.dict_sort
        newItem.status = item.status

        newData.push(newItem)
    })
    return newData
}

module.exports = {
    formatData,
    formatItemData
}