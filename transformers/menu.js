//递归添加子节点
let addChild = function (ary, data) {
    var data = data ? data : (function (ary) {
        var tempAry = [];
        var idList = [];
        ary.forEach(function (item) { idList.push(item.id) });
        function deb(id, idList) {
            var flag = true;
            for (var ida in idList) {
                if (id == idList[ida]) {
                    flag = false;
                }
            }
            return flag;
        }

        for (var i = 0, len = ary.length; i < len; i++) {
            if (ary[i].pid == undefined || (ary[i].pid != undefined && deb(ary[i].pid, idList))) {
                var obj = ary[i];
                tempAry.push(obj);
            }
        }
        return tempAry;
    }(ary));

    var temp = 0;
    if (data.constructor == Array) {
        for (var i = 0, len = data.length; i < len; i++) {
            for (var j = 0, lenA = ary.length; j < lenA; j++) {
                if (ary[j].pid == data[i].id) {
                    var obj = ary[j];
                    data[i].children = data[i].children || [];
                    data[i].children.push(obj);
                    //r
                    if (data[i].children.length === 0) {
                        delete data[i].children
                    }
                    temp++;
                }
            }
        }
    }

    if (temp > 0) {
        if (data.constructor == Array) {
            for (var n = 0, lenB = data.length; n < lenB; n++) {
                data[n].children = addChild(ary, data[n].children ? data[n].children : []);

                if (data[n].children.length === 0) {
                    delete data[n].children
                }
            }
        }
    }
    return data;
}

let formatData = (data) => {
    let pageData = []
    let btnData = []
    let menuData = []
    data.forEach(item => {
        if (item.menu_type === 3) {
            btnData.push(item.menu_key)
        } else {
            if (item.menu_type === 2) {
                pageData.push(item.menu_url.split(':')[0])
            }

            let newData = {}

            newData.type = item.menu_type
            newData.icon = item.menu_icon
            newData.id = item.id
            newData.path = item.menu_url
            newData.pid = item.parent_id
            newData.filePath = item.menu_key
            newData.orderNum = item.menu_order
            newData.name = item.menu_name
            newData.httpMethod = item.method
            newData.type = item.menu_type
            newData.hidden = item.is_hidden
            newData.children = []

            menuData.push(newData)
        }
    })

    return {
        menuData,
        pageData,
        btnData
    }
}

let formatMenus = (data) => {
    let newData = []
    data.forEach(item => {
        let newItem = {}
        newItem.id = item.id
        newItem.pid = item.parent_id
        newItem.name = item.menu_name
        newItem.orderNum = item.menu_order
        newItem.type = item.menu_type
        newItem.filePath = item.menu_key
        newItem.path = item.menu_url
        newItem.method = item.http_method
        newItem.icon = item.http_icon
        newItem.hidden = item.is_hidden

        newData.push(newItem)
    })
    return newData
}

module.exports = {
    addChild,
    formatData,
    formatMenus
}