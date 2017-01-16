var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function(nav)
{
    var bookList = [
     {
        _id: 1,
        title: 'Adulthood Is a Myth',
        genre: 'Comics',
        authors: 'Sarah Andersen',
        bookId:25855506,
        read: false
    },
     {
        _id: 2,
        title: 'How to Cook Everything: Simple Recipes for Great Food',
        genre: 'CookBooks',
        authors: 'Meik Wiking',
        bookId:603204,
        read: false
    },
     {
        _id: 3,
        title: 'Angle and Demon',
        genre: 'Fiction',
        authors: 'Dan Brown',
        read: false
    },
     {
        _id: 4,
        title: 'The History of the Hobbit, Part One: Mr. Baggins',
        genre: 'Fantasy',
        authors: 'John D. Rateliff',
        read: false
    }
     ];

    adminRouter.route('/addBooks')
     .get(function(req,res) {
        var url = nav;

        mongodb.connect(url, function(err,db) {
            var collection = db.collection('books');
            collection.insertMany(bookList, function(err,results) {
                res.send(results);
                db.close();
            });
        });

    });
    return adminRouter;
};

module.exports = router;