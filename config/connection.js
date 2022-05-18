const database =require('./config')

const connect=()=>{
    const authDb=()=>database.authenticate().then((res)=>{
   console.log('connect to database ')
    })
    .catch((err)=>{
    console.log('error')
    })
    return{
        authDb
    }
}

module.exports=connect