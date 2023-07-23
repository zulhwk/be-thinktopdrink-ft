const router = require("express").Router();
const pembelianCtrl = require("../controllers/pembelian.controller");
const authMiddleware = require("../middleware/auth.middleware");
const { validatePostPembelian } = require("../middleware/validate-form.middleware");

router.post(
  "/pembelian",
  [authMiddleware.isLoggedIn, validatePostPembelian],
  pembelianCtrl.postPembelian
);

router.get(
  "/pembelian",
  authMiddleware.isLoggedIn,
  pembelianCtrl.getPembelian
);

router.put(
  "/pembelian/:uuid_pembelian",
  [authMiddleware.isLoggedIn, validatePostPembelian],
  pembelianCtrl.putPembelian
)

router.delete(
  "/pembelian/:uuid_pembelian",
  [authMiddleware.isLoggedIn],
  pembelianCtrl.deletePembelian
)

module.exports = router;
