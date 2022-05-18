const express =require('express')
const router=express.Router()
const experienceController=require('../controllers/experience.controllers')
router.post('/add/experience',experienceController.post_experience)
router.get('/all/experience',experienceController.get_all_experience)
router.get('/one/by_id/:id',experienceController.get_experience_by_id)
router.put('/update/by_id/:id',experienceController.update_experience)
router.delete('/delete/by_id/:id',experienceController.delete_experience)

module.exports=router