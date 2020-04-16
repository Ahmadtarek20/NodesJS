const productmodel = require('../models/products.model')

exports.getHome = (req, res, next) => {
    //get products
    //render index.ejs

    //get categury
    let categury = req.query.categury
    let validcategury = ['camira', 'mobile']

    let productPromess;
    if (categury && validcategury.includes(categury))
        productPromess = productmodel.getCateguryByProduct(categury);
    else productPromess = productmodel.getAllProducts()
    productPromess.then(products => {
        res.render('index', {
            products: products,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            validationErorr: req.flash('validationErorrs')[0],
            pageitle: 'Home'
        });
    });
};