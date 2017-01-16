var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;

module.exports = function(url)
{
    passport.use(new LocalStrategy({
        userNameField: 'userName',
        passwordField: 'password'
    },
    function(username,password,done) {
        mongodb.connect(url, function(err,db) {
            var collection = db.collection('user');
            collection.findOne({username: username, password:password},
                function(err,results) {
                    
                    console.log(results);
                    var user = results;
                    done(null,user);
                });
        });
    }));
};