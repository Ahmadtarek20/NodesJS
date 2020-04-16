const router = require('express').Router()
const bodyParser = require('body-parser');
const authgard = require('./gards/auth.gards')

const check = require('express-validator').check

const authcontroller = require('../controllers/auth.controller');


router.get('/signup', authgard.notAuth, authcontroller.getSiignup);

router.post('/signup', authgard.notAuth,
    bodyParser.urlencoded({ extended: true }), //true 3la 4an tst5dm el qs me4 el query string
    check('username').not().isEmpty().withMessage('UserName is requerd'),
    check('email').not().isEmpty().withMessage('Email is requerd').isEmail().withMessage('invaled format'),
    check('password').not().isEmpty().withMessage('Password is requierd').isLength({ min: 6 }).withMessage('Password Min 6 Character'),
    check('confirmPassword').custom((value, { req }) => {
        //{ req } de 7aga fel JS6  bt3mel aaa omken astd3y zay el midel weer fe nafs el asinment
        if (value === req.body.password) return true
        else throw 'Password Not Exest'
    }),
    /* (req, res, next) => {   // da no3 we momken ast5dem el mawgod 3andy fel validators
        let value = req.body.confirmPassword
        return check('confirmPassword').equals(value)
    },*/
    authcontroller.postSignup
);

router.get('/login', authgard.notAuth, authcontroller.getlogin);

router.post('/login', authgard.notAuth,
    bodyParser.urlencoded({ extended: true }),
    check('email').not().isEmpty().withMessage('Email is requerd').isEmail().withMessage('invaled format'),
    check('password').not().isEmpty().withMessage('Password is requierd').isLength({ min: 6 }).withMessage('Password Min 6 Character'),

    authcontroller.postLogin
);

router.all('/logout', authgard.isAuth, authcontroller.logout);


module.exports = router;