const express =require('express')
const router=express.Router()
const domaineController=require('../controllers/domaine.controllers')
router.post('/add/domaine',domaineController.post_domaine)
router.get('/all/domaine',domaineController.get_all_domaine)
router.get('/one/by_id/:id',domaineController.get_domaine_by_id)
router.put('/update/by_id/:id',domaineController.update_domaine)
router.delete('/delete/by_id/:id',domaineController.delete_domaine)

module.exports=router