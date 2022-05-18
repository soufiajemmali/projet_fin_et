const Sequelize=require('sequelize')
const sequelize=require('../config/config')

const tableName='domaine'
const Domaine=sequelize.define('domaine',{
    nom:{type:Sequelize.STRING}
    
},{tableName})

module.exports=Domaine
