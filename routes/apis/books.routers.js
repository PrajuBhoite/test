const express = require("express");

const { booksController } = require("../../todo/controllers");

const router = express.Router();

router.get("/books", booksController.getAllBooks);
router.get("/:bookId",  booksController.getBookById);
 router.post("/books",  booksController.createBook);
router.put("/:bookId",  booksController.updateBook);
router.delete("/:bookId",  booksController.deleteBook);
module.exports = router;

// const express = require("express");

// const { booksController } = require("../../todo/controllers");
// const { authMiddleware } =require("../../middlewares/auth.middleware");
// const router = express.Router();

// router.get("/", authMiddleware, booksController.getAllBooks); 
// router.get("/:bookId", authMiddleware, booksController.getBookById);
// router.post("/", authMiddleware, booksController.createBook);
// router.put("/:bookId", authMiddleware, booksController.updateBook);
// router.delete("/:bookId", authMiddleware, booksController.deleteBook);

// module.exports = router;