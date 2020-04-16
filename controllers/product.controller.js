const productmodel = require('../models/products.model')

exports.getProduct = (req, res, next) => {

    let id = req.params.id
    productmodel.getProductById(id).then((product) => {
        res.render('product', {
            product: product,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            pageitle: 'Product'

        })
    })
}
exports.getfirstproduct = (req, res, next) => {

    productmodel.getfirstproduct().then((product) => {
        res.render('product', {
            product: product,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            pageitle: 'Product'
        })
    })
}