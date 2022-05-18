const express =require('express')
const router=express.Router()
const job_offerController=require('../controllers/job_offer.controllers')
/* router.post('/add/job_offer',job_offerController.post_job_offer)
router.get('/all/job_offer',job_offerController.get_all_job_offer)
router.get('/one/by_id/:id',job_offerController.get_job_offer_by_id)
router.delete('/delete/by_id/:id',job_offerController.delete_job_offer) 
 router.put('/update/by_id/:id',job_offerController.update_job_offer)
router.put('/update',job_offerController.update_job_offer_candidats_ids) */
module.exports=router