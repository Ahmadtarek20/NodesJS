const router = require('express').Router()
const homecontroler = require('../controllers/home.controller')
const authgard = require('./gards/auth.gards')

//midell weers
router.get('/', homecontroler.getHome) //authgard.isAuth,


module.exports = router