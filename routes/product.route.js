const router = require("express").Router();
const productCtrl = require("../controllers/product.cotroller");
const authMiddleware = require("../middleware/auth.middleware");
const { validatePostProduct } = require("../middleware/validate-form.middleware");

router.post("/product", [authMiddleware.isLoggedIn, validatePostProduct], productCtrl.postProduct);

router.get("/product", authMiddleware.isLoggedIn, productCtrl.getProduct);

router.put(
  "/product/:uuid_product",
  [authMiddleware.isLoggedIn, validatePostProduct],
  productCtrl.putProduct
);
router.delete(
  "/product/:uuid_product",
  authMiddleware.isLoggedIn,
  productCtrl.deleteProduct
);

module.exports = router;
