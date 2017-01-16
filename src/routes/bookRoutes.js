var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;


var route = function(nav,url) {
        var bookService = require('../services/goodReadService')();
        var bookController = require('../controllers/bookController')(bookService,nav,url);
        bookRouter.use(bookController.middleware);

        bookRouter.route('/')
         .get(bookController.getIndex);

        bookRouter.route('/:id')
         .get(bookController.getById);
        return bookRouter;
    };

module.exports = route;