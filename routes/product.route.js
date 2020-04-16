const router = require('express').Router()
const prouctcontroler = require('../controllers/product.controller')
const authgard = require('./gards/auth.gards')


router.get('/', prouctcontroler.getfirstproduct)
router.get('/:id', prouctcontroler.getProduct)


module.exports = router