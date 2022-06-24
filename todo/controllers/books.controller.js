//const { isValidObjectId } = require("mongoose")
const fs = require("fs");

const {
     DB_PATH,
     isValid,
    isValidString,
  isValidObject,
 isValidObjectId,
 } 
 = require("../../utlis");
 const BooksModel = require("../../models/books.model");
// const { response } = require("express");
// const { is } = require("express/lib/request");

 const getAllBooks = async (req, res) => {
    const response = {
      success: true,
      code: 200,
      message: "Books list",
      error: null,
      data: null,
      resource: req.originalUrl,
    };
    try {
      const books = await BooksModel.find({});
      response.data = { books };
      return res.status(200).json(response);
    } catch (error) {
      response.error = error;
      response.message = error.message;
      response.code = error.code ? error.code : 500;
      return res.status(500).json(response);
    }
  };
// const getAllBooks = async (req, res) => {
//     const response = {
//         success: true,
//         code: 200,
//         message: "books list",
//         error: null,
//         data: null,
//         resource: req.originalUrl,
//       };

//     try {
//       const books = await BooksModel.find({
//         // isDeleted: false,
//          userId: res.locals.userId,
//       }); 
//       response.data={books};
//       return res.status(200).json(response);
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         code: 500,
//         message: error.message,
//         data: null,
//         error: error,
//         resource: req.originalUrl,
//       });
//     }
//   };
  const getBookById = async (req, res) => {
    const { bookId } = req.params;
    const response = {
      success: true,
      code: 200,
      message: "Books details",
      error: null,
      data: null,
      resource: req.originalUrl,
    };
    try {
      const book = await BooksModel.findOne({ _id: bookId });
      if (!book) throw new Error("book does not exist");
      response.data = { book};
      return res.status(200).json(response);
    } catch (error) {
      response.error = error;
      response.message = error.message;
      response.code = error.code ? error.code : 500;
      return res.status(500).json(response);
    }
  };

//   const createBook = async (req, res) => {
//     // return res.send("new book created.")
//     const body1 = req.body
//     const response ={
//         success:true,
//         code:200,
//         message:"Book Created Succesfully",
//         error: null,
//         data:null,
//         resourse: req.originalUrl,
//     }};
//     const bookData = {
//         name:body1.name.trim(),
//         authorname:body1.authorname.trim(),
//         isbn:body1.isbn,
//         publisheddate:body1.publisheddate,
//         category:body1.category,
//         subcategory:body1.subcategory,
//     }
//     if (!(body1)) {
//         response.success = false;
//         response.code = 400;
//         response.message = "Invalid request data";
//         response.error = "Invalid request data";
//         return res.status(400).json(response);
//       }
//       const cleanedBookData = {
//           books:bookData.books
//       }
//       console.log(cleanedBookData);
//     try {
//        const newBook = new BooksModel(cleanedBookData);
//         await newBook.save();
//         response.data={ books: newBook};
//         return res.status(201).json(response);
//     } catch (error) {
//         response.error= error;
//         response.code = error.code ? error.code :500;
//         return res.status(500).json(response);
//     }
//};

const createBook = async (req, res) => {

    //const reqData = req.body;
  const book = req.body;
  const response ={
  success: true,
  code:201,
 message:"New book created successfully",
  data: null,
   error:null,
   resourse:req.originalUrl,
  };
  if (!isValid(book) ||
  (isValid(book) && !isValidObject(book))) {
return res.status(400).json({
  success: false,
  code: 400,
    message: "Invalid request, missing request data.",
  data: null,
  error: null,
  resource: req.originalUrl,
  });
  }
if (!isValid(book.name) ||
(isValid(book.name) && !isValidString(book.name))) {
response.success = false;
 response.code = 400;
response.message = "Invalid request data. name is required";
response.error = "Invalid request data. name is required";
return res.status(400).json(response);
}
//   if (!isValid(book.authorname) ||
// (isValid(book.authorname) && !isValidString(book.authorname))) {
// response.success = false;
//  response.code = 400;
// response.message = "Invalid request data. authorname is required";
// response.error = "Invalid request data.author name is required";
//  return res.status(400).json(response);
// }
if (!isValid(book.isbn) ||(isValid(book.isbn) && !isValidString(book.isbn))) {
response.success = false;
response.code = 400;
 response.message = "Invalid request data. isbn is required";
 response.error = "Invalid request data. isbn is required";
return res.status(400).json(response);
}
  if (!isValid(book.publisheddate) ||(isValid(book.publisheddate) && !isValidString(book.publisheddate))) {
response.success = false;
response.code = 400;
response.message = "Invalid request data. publisheddate is required";
response.error = "Invalid request data. publisheddate is required";
return res.status(400).json(response);
}
if (!isValid(book.category) ||(isValid(book.category) && !isValidString(book.category))) {
response.success = false;
 response.code = 400;
 response.message = "Invalid request data. category is required";
response.error = "Invalid request data. category is required";
 return res.status(400).json(response);
}
  const cleanedBookData = {
// id:book.id.trim(),
  name: book.name.trim(),
  userId:res.locals.userId,
 //authorname: book.authorname.trim(),
 isbn: book.isbn.trim(),
 category: book.category.trim(),
  publisheddate:book.publisheddate.trim(),
 subcategory:book.subcategory,
 };
 try {
 const newBook= new BooksModel(cleanedBookData);
 await newBook.save();
 response.data = { book : newBook };
 return  res.status(201).json(response);
 }
 catch (error) {
   response.error = error;
 response.message = error.message;
   response.code = error.code ? error.code :500;
   return res.status(500).json(response);
 }
 };

//  const updateBook = async (req, res) => {
//     const bookId = req.params.bookId;
//     const reqData = req.body;
//     if (!isValid(reqData) || (isValid(reqData) && !isValidObject(reqData))) {
//       return res.status(400).json({
//         success: false,
//         code: 400,
//         message: "Invalid request, missing request data.",
//         data: null,
//         error: null,
//         resource: req.originalUrl,
//       });
//     }
//     if (!isValid(reqData.book) ||(isValid(reqData.book) && !isValidString(reqData.book))) {
//       return res.status(400).json({
//         success: false,
//         code: 400,
//         message: "Invalid request, missing required book name.",
//         data: null,
//         error: null,
//         resource: req.originalUrl,
//       });
//     }
  
//     if (!isValidObjectId(bookId)) {
//       return res.status(400).json({
//         success: false,
//         code: 400,
//         message: "Invalid book id",
//         data: null,
//         error: null,
//         resource: req.originalUrl,
//       });
//     }
  
//     try {
//       const book = await BooksModel.findOne({ _id: userId });
//       if (!book) {
//         return res.status(404).json({
//           success: false,
//           code: 404,
//           message: "Invalid request, book item does not exist",
//           data: null,
//           error: null,
//           resource: req.originalUrl,
//         });
//       }
//       if(book.userId.toString() !== res.locals.userId) {
//         return res.status(403).json({
//           success: false,
//           code: 403,
//           message: "Invalid request, forbidden",
//           data: null,
//           error: null,
//           resource: req.originalUrl,
//         });
//       }
//       book.book = reqData.book;
//       await book.save();
//       return res.status(200).json({
//         success: true,
//         code: 200,
//         message: "Book updated successfully",
//         data: { book },
//         error: null,
//         resource: req.originalUrl,
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         code: 500,
//         message: error.message,
//         data: null,
//         error: error,
//         resource: req.originalUrl,
//       });
//     }
//   };
  
//   const deleteBook = async (req, res) => {
//     const { bookId } = req.params;
//     try {
//       const isBookExist = await BooksModel.findByIdAndDelete(bookId);
//       if (!isBookExist)
//         throw new Error("Invalid book id. book does not exist with this id.");
//       isBookExist.delete();
//       return res.status(200).json({
//         success: true,
//         code: 200,
//         message: "Book deleted successfully",
//         error: null,
//         data: { book: isBookExist },
//         resource: req.originalUrl,
//       });
//     } catch (error) {
//       return res.status(404).json({
//         success: false,
//         code: 404,
//         message: error.message,
//         error: error,
//         data: null,
//         resource: req.originalUrl,
//       });
//     }
//   };




  
//   module.exports = {
//     getAllBooks,
//     getBookById,
//     createBook,
//     updateBook,
//     deleteBook,

//   };

const updateBook = async (req, res) => {
    const { bookId } = req.params;
    const bookData = req.body;
    if (!(bookData) ) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: "Empty request body, nothing to update.",
        error: null,
        data: null,
        resource: req.originalUrl,
      });
    }
    try {
      const isBookExist = await BooksModel.findById(bookId);
      if (!isBookExist)
        throw new Error("Invalid book id. Book does not exist with this id.");
  
      const updatedBook = await BooksModel.findByIdAndUpdate(
        bookId,
        { $set: bookData },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        code: 200,
        message: "Book updated successfully",
        error: null,
        data: { book: updatedBook},
        resource: req.originalUrl,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: error.message,
        error: error,
        data: null,
        resource: req.originalUrl,
      });
    }
  };
//     const deleteBook = async (req, res) => {
//     const { bookId } = req.params;
//     try {
//       const isBookExist = await BooksModel.findById(bookId);
//       if (!isBookExist)
//         throw new Error("Invalid book id. Book does not exist with this id.");
//         isBookExist.delete();
//       return res.status(200).json({
//         success: true,
//         code: 200,
//         message: "Book deleted successfully",
//         error: null,
//         data: { book: isBookExist },
//         resource: req.originalUrl,
//       });
//     } catch (error) {
//       return res.status(404).json({
//         success: false,
//         code: 404,
//         message: error.message,
//         error: error,
//         data: null,
//         resource: req.originalUrl,
//       });
//     }
//   };

//   module.exports = {
//     getAllBooks,
//     getBookById,
//     createBook,
//     updateBook,
//     deleteBook
//   }
//};


// const updateBook = async (req, res) => {
//   const bookId = req.params.bookId;
//   const reqData = req.body;
//   if (!isValid(reqData) || (isValid(reqData) && !isValidObject(reqData))) {
//     return res.status(400).json({
//       success: false,
//       code: 400,
//       message: "Invalid request, missing request data.",
//       data: null,
//       error: null,
//       resource: req.originalUrl,
//     });
//   }
//   if (
//     !isValid(reqData.book) ||
//     (isValid(reqData.book) && !isValidString(reqData.book))
//   ) {
//     return res.status(400).json({
//       success: false,
//       code: 400,
//       message: "Invalid request, missing required book name.",
//       data: null,
//       error: null,
//       resource: req.originalUrl,
//     });
//   }
//   if (!isValidObjectId(bookId)) {
//     return res.status(400).json({
//       success: false,
//       code: 400,
//       message: "Invalid book id",
//       data: null,
//       error: null,
//       resource: req.originalUrl,
//     });
//   }
//   try {
//     const book = await BooksModel.findOne({ _id: bookId, isDeleted: false });
//     if (!book) {
//       return res.status(404).json({
//         success: false,
//         code: 404,
//         message: "Invalid request, book item does not exist",
//         data: null,
//         error: null,
//         resource: req.originalUrl,
//       });
//     }
//     if(book.userId.toString() !== res.locals.userId) {
//       return res.status(403).json({
//         success: false,
//         code: 403,
//         message: "Invalid request, forbidden",
//         data: null,
//         error: null,
//         resource: req.originalUrl,
//       });
//     }
//     book.book = reqData.book;
//     await book.save();
//     return res.status(200).json({
//       success: true,
//       code: 200,
//       message: "Book updated successfully",
//       data: { book },
//       error: null,
//       resource: req.originalUrl,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       code: 500,
//       message: error.message,
//       data: null,
//       error: error,
//       resource: req.originalUrl,
//     });
//   }
// };
const deleteBook = async (req, res) => {
  const bookId = req.params.bookId;
  if (!isValidObjectId(bookId)) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: "Invalid book id",
      data: null,
      error: null,
      resource: req.originalUrl,
    });
  }
  try {
    const book = await BooksModel.findOne({ _id: bookId,isDeleted:true});
    if (!book) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: "Invalid request, book item does not exist",
        data: null,
        error: null,
        resource: req.originalUrl,
      });
    }
    if (book.userId.toString() !== res.locals.userId) {
      return res.status(403).json({
        success: false,
        code: 403,
        message: "Invalid request, forbidden",
        data: null,
        error: null,
        resource: req.originalUrl,
      });
    }
    book.isDeleted = true;
    book.deletedAt = new Date().toString();
    await book.save();
    return res.status(200).json({
      success: true,
      code: 200,
      message: "Book deleted successfully",
      data: { book },
      error: null,
      resource: req.originalUrl,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: error.message,
      data: null,
      error: error,
      resource: req.originalUrl,
    });
  }
};

const updateBookStatus = async (req, res) => {
  const bookId = req.params.bookId;
  if (!isValidObjectId(bookId)) {
    return res.status(400).json({
      success: false,
      code: 400,
      message: "Invalid book id",
      data: null,
      error: null,
      resource: req.originalUrl,
    });
  }
  try {
    const book = await BooksModel.findOne({ _id: bookId, isDeleted: false });
    if (!book) {
      return res.status(404).json({
        success: false,
        code: 404,
        message: "Invalid request, book item does not exist",
        data: null,
        error: null,
        resource: req.originalUrl,
      });
    }
    if (book.userId.toString() !== res.locals.userId) {
      return res.status(403).json({
        success: false,
        code: 403,
        message: "Invalid request, forbidden",
        data: null,
        error: null,
        resource: req.originalUrl,
      });
    }
    book.isCompleted = Boolean(req.body.isCompleted);
    await book.save();
    return res.status(200).json({
      success: true,
      code: 200,
      message: "Book status updated successfully",
      data: { book },
      error: null,
      resource: req.originalUrl,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      code: 500,
      message: error.message,
      data: null,
      error: error,
      resource: req.originalUrl,
    });
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  updateBookStatus,
};
  