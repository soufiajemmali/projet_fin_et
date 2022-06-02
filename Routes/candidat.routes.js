const express =require('express')
const router=express.Router()
const candidatController=require('../controllers/candidat.controllers')
router.post('/register',candidatController.register)
router.post('/login',candidatController.login)
router.get('/job_offer/candidate/:id',candidatController.getPostulation_by_candidate)
router.post('/refresh',candidatController.refreshToken)
/* router.get('/all/candidat',candidatController.get_all_candidat)
router.get('/one/by_id/:id',candidatController.get_candidat_by_id)
router.put('/update/by_id/:id',candidatController.update_candidat)
router.delete('/delete/by_id/:id',candidatController.delete_candidat) */
router.post("/logout", candidatController.logout);

module.exports=router