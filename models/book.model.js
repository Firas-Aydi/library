const req = require("express/lib/request");
const mongoose = require("mongoose");
require('dotenv').config();

var schemaBook = mongoose.Schema({
  userId: String,
  title: String,
  description: String,
  author: String,
  price: Number,
  image: String,
});

var Book = mongoose.model("book", schemaBook);
// var url = "mongodb://0.0.0.0:27017/library";
var url = process.env.MONGODB_URI;

exports.getThreeBooks = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('MongoDB connected successfully')
        return Book.find({}).limit(3);
      })
      .then((books) => {
        mongoose.disconnect();
        resolve(books);
      })
      .catch((err) => reject('MongoDB connection error:',err));
  });
};

exports.getAllBooks = () => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return Book.find({});
      })
      .then((books) => {
        mongoose.disconnect();
        resolve(books);
      })
      .catch((err) => reject(err));
  });
};

exports.getOneBookDetails = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return Book.findById(id);
      })
      .then((books) => {
        mongoose.disconnect();
        resolve(books);
      })
      .catch((err) => reject(err));
  });
};

exports.postDataBookModel = ( title, description, author, price, image, userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        let book = new Book({
          title: title,
          description: description,
          author: author,
          price: price,
          image: image,
          userId: userId,
        });
        return book.save();
      })
      .then(() => {
        mongoose.disconnect();
        resolve("added");
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.getMyBooks = (userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return Book.find({ userId: userId });
      })
      .then((books) => {
        mongoose.disconnect();
        resolve(books);
      })
      .catch((err) => reject(err));
  });
};

exports.deletebook = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return Book.deleteOne({ _id: id });
      })
      .then((books) => {
        mongoose.disconnect();
        resolve(true);
      })
      .catch((err) => reject(err));
  });
};

exports.getPageUpdateBookModel = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return Book.findById( id );
      })
      .then((books) => {
        mongoose.disconnect();
        resolve(books);
      })
      .catch((err) => reject(err));
  });
};

exports.postUpdateBookModel =  (bookId, title, description, author, price, image, userId) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        return Book.updateOne({_id: bookId},{
          title: title,
          description: description,
          author: author,
          price: price,
          image: image,
          userId: userId,
        });
      })
      .then(() => {
        mongoose.disconnect();
        resolve("updated");
        console.log(bookId)
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
