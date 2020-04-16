const authModel = require('../models/auth.model');
const validatorResult = require('express-validator').validationResult;


exports.getSiignup = (req, res, next) => {

    res.render("signup", {
        authError: req.flash('authError')[0],
        validatorError: req.flash('validatorError'),
        isUser: false,
        isAdmin: false,
        pageitle: 'SignUp'


    })
};
exports.postSignup = (req, res, next) => {
    // return console.log(validatorResult(req));
    if (validatorResult(req).isEmpty()) {
        authModel
            .creatNewUser(req.body.username, req.body.email, req.body.password)
            .then(() => res.redirect('/login'))
            .catch(err => {
                console.log(err);
                res.redirect('/signup');
            });
    } else {
        req.flash('validatorError', validatorResult(req).array())
        res.redirect('/signup');
    }
};

exports.postLogin = (req, res, next) => {
    // return console.log(validatorResult(req));
    if (validatorResult(req).isEmpty()) {
        authModel
            .login(req.body.email, req.body.password)
            .then(results => {
                req.session.userId = results.id;
                req.session.isAdmin = results.isAdmin;
                res.redirect('/');
            })
            .catch(err => {
                req.flash('authError', err);
                res.redirect('/login');
            });
    } else {
        req.flash('loginerrorvalidations', validatorResult(req).array())
        res.redirect('/login');
    }

};
exports.getlogin = (req, res, next) => {
    res.render("login", {
        authError: req.flash('authError')[0],
        loginerrorvalidations: req.flash('loginerrorvalidations'),
        isUser: false,
        isAdmin: false,
        pageitle: 'Login'


    })
};
exports.logout = (req, res, next) => {

    req.session.destroy(() => {

        res.redirect('/');
    })
};