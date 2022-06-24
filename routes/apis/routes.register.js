const express = require("express");
const { usersController } = require("../../todo/controllers");

const router = express.Router();

router.post("/", usersController.createUser);

module.exports = router;