const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path:'../config/config.env'})
const secret_access ='2a$12$.qoazGhq8ApheZFX.hO9XOS6N7ASItvCWmzvg.ZOfiG4IcL5hPoTO'
const secret_refresh ='$2a$12$/8EzGDLZe8xJGCEgJ6RTnORT.X8qXTJC/MK/Thd6nq959v8x/Viiq'
console.log('keyss',secret_access)
const accessToken = (user) => {
    if (user.id)
        return jwt.sign({ id: user.id }, secret_access, { expiresIn: '2h' })
    else return jwt.sign({ id: user }, secret_access, { expiresIn: '2h' })
}
const refreshToken = (user) => {
    if (user.id)
        return jwt.sign({ id: user.id }, secret_refresh, { expiresIn: '2h' })
    else return jwt.sign({ id: user }, secret_refresh, { expiresIn: '2h' })
}
module.exports = {
    refreshToken,
    accessToken,
} 