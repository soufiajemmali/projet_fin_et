const Formation=require('../model/formation')
const Experience=require('../model/experience')



const CandidatService=()=>{
 

    const GetFormationByIDC=async(id)=>{
        
        let arr=null
      await Formation.findOne({where:{id_candidat:id}})
       .then((res)=>{
          arr=res?.dataValues
          return arr
       })
       .catch((err)=>{
           console.log(err)
       })
       return arr
        }
        const GetExperienceByIDC= async (id)=>{
            let arr=null
            await  Experience.findOne({where:{id_candidat:id}})
           .then((res)=>{
              arr=res?.dataValues
           })
           .catch((err)=>{
               console.log(err)
           })
           return arr
         }
   
return {
    GetFormationByIDC,
    GetExperienceByIDC
}
}
module.exports=CandidatService

