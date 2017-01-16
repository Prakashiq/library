var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');
var route = function(url) {

    authRouter.route('/signUp')
       .post(function(req,res) {

       	console.log(req.body);

       	mongodb.connect(url, function(err,db) {

            var collection = db.collection('user');
            var user = {
                username: req.body.userName,
                password: req.body.password
            };

            collection.insert(user, function(err,results) {

                req.login(results.ops[0],function() {
                    res.redirect('/auth/profile');
                });

                db.close();
            });
        });

    });

    authRouter.route('/profile')
        .all(function(req,res,next){
            if(!req.user){
                res.redirect('/');
            }
            next();
        })
       	.get(function(req,res) {
            res.json(req.user);
       	});

    authRouter.route('/signIn')
    	.post(passport.authenticate('local',{
    		failureRedirect: '/'
    	}), function(req, res){
    		res.redirect('/auth/profile');
    	});
    return authRouter;
};

module.exports = route;