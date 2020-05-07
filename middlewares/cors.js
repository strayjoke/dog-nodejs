let handleCors = (req, res, next) => {
    res.append("Access-Control-Allow-Origin", "*")
    res.append("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH")
    res.append("Access-Control-Allow-Headers", "content-type, Authorization")
    res.append("Access-Control-Allow-Credentials", false)
    res.append("Access-Control-Expose-Headers", "Authorization")
    if (req.method === 'OPTIONS') {
        res.send('OK')
    } else {
        next()
    }
}

module.exports = {
    handleCors
}