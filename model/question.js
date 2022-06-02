const Sequelize=require('sequelize')
const sequelize=require('../config/config')
const Categorie = require('./categorie')


const tableName='question'

const Question =sequelize.define('question',{
    titre:{type:Sequelize.STRING},
    sujet:{type:Sequelize.STRING},
    difficulty:{type:Sequelize.INTEGER},
    avg_cyc_complexity:{type:Sequelize.INTEGER},
    success_rate:{type:Sequelize.FLOAT},
    etat:{type:Sequelize.STRING},
    id_categorie:{type:Sequelize.INTEGER},
    id_type:{type:Sequelize.INTEGER},
    id_employeur:{type:Sequelize.INTEGER}, 
   
},{tableName})

Question.belongsTo(categorie , { as})
Question.hasMany(choice,{as :"Choice", foreignKey:"id_question"})

Question.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;

}
module.exports=Question
