
var mongodb = require('mongodb').MongoClient;

var bookContoller = function(bookService, nav,url)
{
    var getIndex = function(req,res) {
            mongodb.connect(url, function(err,db) {
                var collection = db.collection('books');
                collection.find({}).toArray(function(err,results) {
                    res.render('bookListView',{
                        nav: nav,
                        books:results
                    });
                    db.close();
                });
            });

        };

    var getById = function(req,res) {
                var id = parseInt(req.params.id) + 1 ;
                console.log(id);
                mongodb.connect(url, function(err,db) {
                    var collection = db.collection('books');
                    collection.findOne({_id: id},
                     function(err,results) {

                        if (results.bookId)
                        {

                            bookService.getBookById(results.bookId,function(err,book) {
                                                results.book = book;

                                                res.render('bookView',{
                                                        nav: nav,
                                                        book:results

                                                    });
                                            });
                        }
                        else
                        {

                            res.render('bookView',{
                                    nav: nav,
                                    book:results

                                });

                        }

                        db.close();
                    });
                });

            };

    var middleware = function(req,res,next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    };

    return {
        getIndex: getIndex,
        getById:getById,
        middleware: middleware
    };

};

module.exports = bookContoller;