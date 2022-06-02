
const Sequelize=require('sequelize')
const sequelize=require('../config/config')
const Question = require('./question')


const tableName='choice'

const Choice =sequelize.define('choice',{
    choice:{type:Sequelize.STRING},
    correct:{type:Sequelize.BOOLEAN},
    id_question:{type:Sequelize.INTEGER}

},{tableName})

Question.hasMany(choice,{as :"Choice", foreignKey:"id_question"})

Choice.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
}

module.exports=Choice