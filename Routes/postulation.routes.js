const express =require('express')
const router=express.Router()
const postulationController=require('../controllers/postulation.controllers')

router.post('/add/postulation',postulationController.postuler)
router.delete('/annuler/postulation/:id',postulationController.annuler_postulation)
/* router.get('/all/postulation',postulationController.get_all_postulation)
router.get('/one/by_id/:id',postulationController.get_postulation_by_id)
router.put('/update/by_id/:id',postulationController.update_postulation)
router.delete('/delete/by_id/:id',postulationController.delete_postulation)
 */
module.exports=router