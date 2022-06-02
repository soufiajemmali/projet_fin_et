const Sequelize=require('sequelize')
const sequelize=require('../config/config')
const Adress = require('./adress')

const tableName='employeur'
const Employeur=sequelize.define('employeur',{
    email:{type:Sequelize.STRING},
    password:{type:Sequelize.STRING},
    type:{type:Sequelize.STRING},
    active:{type:Sequelize.BOOLEAN},
    nom_societe:{type:Sequelize.INTEGER},
    site_officiel:{type:Sequelize.STRING}, 
    tel:{type:Sequelize.STRING},
    id_adress:{type:Sequelize.INTEGER},
    
     /*imageprofil:{type:Sequelize.STRING},*/
},{tableName})

Employeur.belongsTo(Adress,{as :"Adress", foreignKey:"id_adress"})


Employeur.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    delete values.refreshToken;
    return values;
}
module.exports=Employeur








