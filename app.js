const express = require('express')
const path = require('path')

var session = require('express-session')
var Sessionstore = require('connect-mongodb-session')(session)

var flash = require('connect-flash')


const homeroute = require('./routes/home.route');
const productroute = require('./routes/product.route');
const authRouter = require('./routes/auth.route');
const cartRoute = require('./routes/cart.route');
const adminRouter = require('./routes/admin.route')

const app = express();

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));

app.use(flash())

const STORE = new Sessionstore({
    uri: 'mongodb://localhost:27017/oline-shope',
    collection: 'sessions'
})

app.use(session({
    secret: 'this is my secret code of our opcions brahtnaaa...', //da bn3mlo br7tna be5do we hoa be save
    saveUninitialized: false, //de lma 22fl el prawther bems7o
    store: STORE
        /* cookie: {   // hena l2 de b7dd  ea be tare5 ea bwa2t
            maxAge: 1 * 60 * 60 * 100,
            expires: new Date
        }*/
}))

app.use('/', homeroute);
app.use('/', authRouter);
app.use('/product', productroute);
app.use('/cart', cartRoute);
app.use('/admin', adminRouter);


app.set('view engine', 'ejs');
app.set('views', 'views'); //defult

app.use((error, req, res, next) => { // app.get  ('/error',
    res.status(500)
    res.render('error', {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        pageitle: 'error'
    });
});
app.get('/notAdmin', (req, res, next) => { // app.get  (' / error ',
    res.status(403)
    res.render('notAdmin', {
        isUser: req.session.userId,
        isAdmin: false,
        pageitle: 'Not-Allowed'
    });
});
app.use('/not-found', (req, res, next) => { // app.get  (' / error ',
    res.status(404)
    res.render('not-found', {
        isUser: req.session.userId,
        isAdmin: false,
        pageitle: 'not-found'

    });
});


/*app.get('/', (req, res, next) => {
res.render('index')
})*/

app.listen(3000, () => {
    console.log("server is listen on port 3000");
});