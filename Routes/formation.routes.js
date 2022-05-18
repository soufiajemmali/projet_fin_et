const express =require('express')
const router=express.Router()

const formationController=require('../controllers/formation.controllers')

router.post('/add/formation',formationController.post_formation)
router.get('/all/formation',formationController.get_all_formation)
router.get('/one/by_id/:id',formationController.get_formation_by_id)
router.put('/update/by_id/:id',formationController.update_formation)
router.delete('/delete/by_id/:id',formationController.delete_formation)

module.exports=router