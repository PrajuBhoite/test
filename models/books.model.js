const mongoose = require("mongoose");
const booksSchema = new mongoose.Schema({

    name:{type:String, require: true},
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User"},
    //authorname:{type:String, require: true}, //userid 
    isbn:{type:String, require: true},
    publisheddate:{type:Date, reauire:true},
    category: {type:String, require: true},
    subcategory : [String], //array
    //createdAt:{type: Date,defalut:new Date()},
    //modifiedAt:{type: Date,defalut:new Date()},
    isDeleted: {type: Boolean,defalut:false},
     deletedAt:{type: Date,defalut:null},
   
},
{timestamps : true}
);



module.exports = mongoose.model("Books", booksSchema);