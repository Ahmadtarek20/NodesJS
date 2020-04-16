const cartModel = require('../models/cart.model')
const validationResult = require('express-validator').validationResult;


exports.getcart = (req, res, next) => {
    cartModel.getItemByUser(req.session.userId).then(items => {
        res.render('cart', {
            items: items,
            isAdmin: req.session.isAdmin,
            isUser: true,
            validationErorr: req.flash('validationErorrs')[0],
            pageitle: 'Cart'


        })
    }).catch(err => next(err))

};

exports.postCart = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        cartModel.addNewItem({
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            userId: req.session.userId,
            productId: req.body.productId,
            timestamp: Date.now()
        }).then(() => {
            res.redirect('/cart')
        }).catch(err => {
            next(err);
        })
    } else {
        req.flash('validationErorrs', validationResult(req).array())
        res.redirect(req.body.reirectioTo)
    }
};


exports.postSave = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        cartModel.editItem(req.body.cartId, {
                amount: req.body.amount,
                timestamp: Date.now()
            })
            .then(() => res.redirect('/cart'))
            .catch(err => next(err))
    } else {
        req.flash('validationErorrs', validationResult(req).array());
        res.redirect('/cart')
    }
};
exports.prosDelete = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        cartModel.deleteItem(req.body.cartId)
            .then(() => res.redirect('/cart'))
            .catch(err => next(err))
    } else {
        req.flash('validationErorrs', validationResult(req).array());
        res.redirect('/cart')
    }
};