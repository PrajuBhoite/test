const express = require("express");
const {authController}= require("../../todo/controllers");
const router = express.Router();

router.post("/", authController.login);

module.exports = router;


// const express = require("express");
// const router = express.Router();
// router.post("/login", () => {});
// module.exports = router;