const Sequelize=require('sequelize')
const sequelize=require('../config/config');
const Candidat = require('./candidat');    

const tableName='formation'
const Formation=sequelize.define('formation',{
    diplome:{type:Sequelize.INTEGER},
    university:{type:Sequelize.STRING},
    date_debut:{type:Sequelize.DATE},
    date_fin:{type:Sequelize.DATE},
    id_candidat:{type:Sequelize.INTEGER}
},{tableName})

 Formation.hasOne(Candidat,{as: "candidat" ,foreignKey:"id"});
 

Formation.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    delete values.refresh_token;
    return values;
}

module.exports=Formation