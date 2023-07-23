const router = require("express").Router();
const karyawanCtrl = require("../controllers/karyawan.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { validatePostKaryawan } = require("../middleware/validate-form.middleware");

router.post(
  "/karyawan",
  [authMiddleware.isAdminLoggedIn, validatePostKaryawan],
  karyawanCtrl.postKaryawan
);

router.get("/karyawan", authMiddleware.isLoggedIn, karyawanCtrl.getKaryawan);

router.put(
  "/karyawan/:uuid_karyawan",
  [authMiddleware.isLoggedIn, validatePostKaryawan],
  karyawanCtrl.putKaryawan
);
router.delete(
  "/karyawan/:uuid_karyawan",
  authMiddleware.isLoggedIn,
  karyawanCtrl.deleteKaryawan
);

module.exports = router;
