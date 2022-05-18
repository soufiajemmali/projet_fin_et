const Sequelize=require('sequelize')
const sequelize=require('../config/config')

const tableName='token_pwd_reset'
const Token_pwd_reset=sequelize.define('token_pwd_reset',{
    token:{type:Sequelize.INTEGER},
    expires_in:{type:Sequelize.DATE},
   
},{tableName})

module.exports=Token_pwd_reset