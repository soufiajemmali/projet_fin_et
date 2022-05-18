const express =require('express')
const router=express.Router()
const adressController=require('../controllers/adress.controllers')
router.post('/add/adress',adressController.post_adress)
router.get('/all/adress',adressController.get_all_adress)
router.get('/one/by_id/:id',adressController.get_adress_by_id)
router.put('/update/by_id/:id',adressController.update_adress)
router.delete('/delete/by_id/:id',adressController.delete_adress)

module.exports=router