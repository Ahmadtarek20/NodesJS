const ProductModels = require('../models/products.model');
const validatorResult = require('express-validator').validationResult;
exports.getAdd = (req, res, next) => {

    res.render('add-product', {
        authError: req.flash('authError')[0],
        validatorError: req.flash('validatorError'),
        isUser: true,
        isAdmin: true,
        pageitle: 'Admin'
    });
};

exports.postAdd = (req, res, next) => {
    //console.log(req.body);
    //console.log(req.file.filename);
    if (validatorResult(req).isEmpty()) {
        ProductModels.AddProduct(
                name = req.body.name,
                price = req.body.price,
                image = req.file.filename,
                categury = req.body.categury,
                description = req.body.description,
            )
            .then(() => {
                res.redirect('/')
            })
            .catch(err => {
                console.log(err);
                next(err);
                // res.redirect('/error')
            });
    } else {
        req.flash('validatorError', validatorResult(req).array());
        res.redirect('/admin/add');
    }
};
/*
3la 4an a4fr el data 2ly mab3otalyy
fe tr2ten
applicathann/x-www/form-urlencod
multipart/form-data
 */