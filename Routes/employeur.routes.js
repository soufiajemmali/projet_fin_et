const express = require("express");
const router = express.Router();
const employeurController = require("../controllers/employeur.controllers");

router.post("/register", employeurController.register);
router.post("/login", employeurController.login);
router.post("/publication", employeurController.publication);
router.delete("/delete_job_offer/:id", employeurController.delete_job_offer);
router.get("/joboffer/:id", employeurController.getjob_Offre_employeur);
router.put("/update_job_offer/:id", employeurController.update_job_offer);
router.post("/refresh", employeurController.refreshToken);
router.get("/one/by_id/:id", employeurController.get_employeur_by_id);
/*router.get('/all/employeur',employeurController.get_all_employeur)

router.put('/update/by_id/:id',employeurController.update_employeur)
router.delete('/delete/by_id/:id',employeurController.delete_employeur)*/
router.post("/logout", employeurController.logout);

module.exports = router;
