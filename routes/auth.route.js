const router = require("express").Router();
const authCtrl = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/register", authMiddleware.registerValidator, authCtrl.register);

router.post("/login", authMiddleware.loginValidator, authCtrl.login);

router.put(
  "/reset_password",

  authCtrl.reset_password
);

router.post("/refresh_token", authCtrl.generateAccessToken);

module.exports = router;
