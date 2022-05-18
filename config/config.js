const Sequelize=require('sequelize')

  const  database=new Sequelize(
 'pfe',
 'postgres',
 'IsetCom09879519',
 {
    host:'localhost',
    port:'5432',
    dialect:'postgres',
    define:{
        timestamps:false
    }
 }
  
 );
 module.exports = database