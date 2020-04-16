const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/oline-shope'

const productscema = mongoose.Schema({
    name: String,
    price: Number,
    categury: String,
    description: String,
    image: String,

})

const product = mongoose.model('peoduct', productscema)

exports.getAllProducts = () => {
    //connect to db
    //get products
    //disconnect
    //custom promess
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return product.find({})
        }).then(products => {
            mongoose.disconnect()
            resolve(products)
        }).catch(err => {
            mongoose.disconnect();
            reject(err)
        })
    });
};

exports.getCateguryByProduct = (categury) => {

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return product.find({ categury: categury })
        }).then(products => {
            mongoose.disconnect()
            resolve(products)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    });
};

exports.getProductById = (id) => {

    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL).then(() => {
                return product.findById(id);
            }).then(product => {
                mongoose.disconnect();
                resolve(product);
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
    });
};
exports.getfirstproduct = () => {

    return new Promise((resolve, reject) => {
        mongoose
            .connect(DB_URL).then(() => {
                return product.findOne({});
            }).then(product => {
                mongoose.disconnect();
                resolve(product);
            }).catch(err => {
                mongoose.disconnect()
                reject(err)
            })
    });
};

exports.AddProduct = (name, price, image, categury, description) => {

    return new Promise((resolve, reject) => {
        //return reject('error');
        mongoose
            .connect(DB_URL).then(() => {
                let pro = new product({
                    name: name,
                    price: price,
                    image: image,
                    categury: categury,
                    description: description,
                })
                return pro.save();
            }).then(() => {
                mongoose.disconnect();
                resolve();
            }).catch(err => {
                mongoose.disconnect();
                reject(err);
            })
    });
};