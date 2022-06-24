
// const express = require("express");

// const { usersController } = require("../../todo/controllers");
// const { booksController } = require("../../todo/controllers");
// const { authController } = require("../../todo/controllers");
// const { authMiddleware } = require("../../middlewares/auth.middleware");

// const router = express.Router();

// /* Users routes */
// router.get("/register",usersController.getAllUsers);
// //router.get("/:authId", usersController.getUserById);
// router.post("/register", usersController.createUser);
// //router.post("/login" , usersController.createUser);
// //router.put("/:authId",usersController.updateUser);
// router.delete("/:authId", usersController.deleteUser);

// // /* Books routes */
// // router.get("/books", booksController.getAllBooks);
// // router.get("/books/:bookId", booksController.getBookById);
// // router.post("/books", booksController.createBook);
// // router.put("/books/:bookId", booksController.updateBook);
// // router.delete("/books/:bookId", booksController.deleteBook);

// router.get("/books", authMiddleware, booksController.getAllBooks);
// router.post("/books", authMiddleware, booksController.createBook);
// router.put("/:bookId", authMiddleware, booksController.updateBook);
// router.delete("/:bookId", authMiddleware, booksController.deleteBook);

// router.get("/login", authController.login);
// router.post("/login", authController.login);

// module.exports = router;


// const express = require("express");

// const router = express.Router();
// const usersRouter= require("./users.routers");
// const booksRouter = require("./books.routers");
// const authRouter = require("./auth.routers");
// const { authController } = require("../../todo/controllers");

// router.use("/register", usersRouter);
// router.use("/books", booksRouter);
// router.use("/login", authRouter);

// router.post("/login",authController.login);
// module.exports = router;


const express = require("express");
const router = express.Router();

const userRouter= require("./users.routers");
const booksRouter = require("./books.routers");
const authsRouter = require("./auth.routers");
const  registerRouter = require("./routes.register");

router.use("/books", booksRouter);
router.use("/auth", userRouter);
router.use("/auth/login", authsRouter);
router.use("/auth/register", registerRouter);

module.exports = router;