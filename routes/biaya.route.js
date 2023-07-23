const router = require("express").Router();
const biayaCtrl = require("../controllers/biaya.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { validatePostBiaya } = require("../middleware/validate-form.middleware");

router.post("/biaya", [authMiddleware.isLoggedIn, validatePostBiaya], biayaCtrl.postBiaya);
router.get("/biaya", authMiddleware.isLoggedIn, biayaCtrl.getBiaya);
router.put("/biaya/:uuid_biaya", authMiddleware.isLoggedIn, biayaCtrl.putBiaya);
router.delete("/biaya/:uuid_biaya", authMiddleware.isLoggedIn, biayaCtrl.deleteBiaya);

module.exports = router;
