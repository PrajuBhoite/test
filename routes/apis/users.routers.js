const express = require("express");

const { usersController } = require("../../todo/controllers");

const router = express.Router();

router.get("/", usersController.getAllUsers);
//router.get("/:authId", usersController.getUserById);
router.post("/", usersController.createUser);
 //router.post("/auth/login" , usersController.authenticateUser);
router.put("/:authId", usersController.updateUser);
 router.delete("/:authId", usersController.deleteUser);


module.exports = router;

// const express = require("express");
// const {usersController }= require("../../todo/controllers");
// // const { route } = require("./users.rout");

// const router = express.Router();

// router.get("/",usersController.getAllUsers);
// //router.get("/:authId", usersController.getUserById);
// router.put("/:authId",usersController.updateUser);
// router.delete("/:authId", usersController.deleteUser);


// module.exports = router;