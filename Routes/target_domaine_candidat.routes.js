const express =require('express')
const router=express.Router()
const target_domaine_candidatController=require('../controllers/target_domaine_candidat.controllers')
router.post('/add/target_domaine_candidat',target_domaine_candidatController.post_target_domaine_candidat)
router.get('/all/target_domaine_candidat',target_domaine_candidatController.get_all_target_domaine_candidat)
router.get('/one/by_id/:id',target_domaine_candidatController.get_target_domaine_candidat_by_id)
router.put('/update/by_id/:id',target_domaine_candidatController.update_target_domaine_candidat)
router.delete('/delete/by_id/:id',target_domaine_candidatController.delete_target_domaine_candidat)

module.exports=router