const Sequelize=require('sequelize')
const sequelize=require('../config/config')
const Candidat = require('./candidat')

const Job_offer=require('./job_offer')

const tableName='postulation'
const Postulation=sequelize.define('postulation',
{
    etat:{type:Sequelize.STRING},
    cv:{type:Sequelize.BLOB},
    created_at:{type:Sequelize.DATE},
    updated_at:{type:Sequelize.DATE},
    id_candidat:{type:Sequelize.INTEGER},
    id_joboffer:{type:Sequelize.INTEGER},
},{tableName})

Postulation.hasOne(Job_offer,{as :"Job_offer", foreignKey:"id"});
Postulation.hasOne(Candidat,{as :"Candidat", foreignKey:"id"});



Postulation.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    return values;
}

module.exports= Postulation