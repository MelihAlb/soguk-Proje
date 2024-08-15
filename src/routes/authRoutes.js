const router =require("express").Router();
const {login ,register, me }= require("../controllers/authController");
const { tokenCheck } = require("../middlewares/auth");
const authVal = require("../middlewares/validation.js/authValidation");

router.post("/register",authVal.register,register);
router.post("/login",authVal.login,login);


module.exports = router;