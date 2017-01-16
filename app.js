var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();
var port = process.env.PORT || 5000;
//app.use(express.static('src/views'));  // define a static file structure

var nav = [{
    Link:'/Books',
    Text:'Book'
},{
    Link:'/Authors',
    Text:'Author'
}];

var url = 'mongodb://localhost:30000/libaryApp'; 
var bookRouter = require('./src/routes/bookRoutes')(nav,url);
var adminRouter = require('./src/routes/adminRoutes')(url);
var authRouter = require('./src/routes/authRoutes')(url);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));

require('./src/config/passport')(app,url);

app.set('views','./src/views');

app.set('view engine','ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);
//var handlebars = require('express-handlebars');
//app.engine('.hbs',handlebars({extname:'.hbs'}));
//app.set('view engine','.hbs');
//app.set('view engine','jade');

app.get('/', function(req,res) {
    // res.render('index', {title:'Hello from Render',passlist:['A','B','C']});
    res.render('index', {title:'BookMain',
        nav: [{Link:'/Books',
            Text:'Books'
        },
              {Link:'/Authors',
            Text:'Authors'
        }]});
});

// app.get('/books', function(req,res) {
//     res.send('Hello Books');
// });

app.listen(5000,function(err) {
    console.log('running server on port' + port);
});
