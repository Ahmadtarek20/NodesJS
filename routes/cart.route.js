const router = require('express').Router();
const boudyparther = require('body-parser');
const check = require('express-validator').check

const authgard = require('./gards/auth.gards')

const cartController = require('../controllers/cart.controller');

router.get('/', authgard.isAuth,
    check('amount')
    .isInt({ min: 1 })
    .withMessage('Must be grater than 0'), cartController.getcart)

router.post('/',
    authgard.isAuth,
    boudyparther.urlencoded({ extended: true }),
    check('amount')
    .not()
    .isEmpty()
    .withMessage('Amount Is Requierd')
    .isInt({ min: 1 })
    .withMessage('Must be grater than 0'), cartController.postCart

);
router.post('/save',
    authgard.isAuth,
    boudyparther.urlencoded({ extended: true }),
    check('amount')
    .not()
    .isEmpty()
    .withMessage('Amount Is Requierd')
    .isInt({ min: 1 })
    .withMessage('Must be grater than 0'), cartController.postSave
);

router.post('/delete',
    authgard.isAuth,
    boudyparther.urlencoded({ extended: true }), cartController.prosDelete)




module.exports = router;