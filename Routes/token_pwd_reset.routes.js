const express =require('express')
const router=express.Router()
const token_pwd_resetController=require('../controllers/token_pwd_reset.controllers')
router.post('/add/token_pwd_reset',token_pwd_resetController.post_token_pwd_reset)
router.get('/all/token_pwd_reset',token_pwd_resetController.get_all_token_pwd_reset)
router.get('/one/by_id/:id',token_pwd_resetController.get_token_pwd_reset_by_id)
router.put('/update/by_id/:id',token_pwd_resetController.update_token_pwd_reset)
router.delete('/delete/by_id/:id',token_pwd_resetController.delete_token_pwd_reset)

module.exports=router