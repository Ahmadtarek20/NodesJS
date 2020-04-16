const mongoose = require('mongoose')
const bcrybt = require('bcrypt')


const DB_URL = 'mongodb://localhost:27017/oline-shope'

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }

});

const User = mongoose.model('user', userSchema);

exports.creatNewUser = (username, email, password) => {
    //emiall is check exesting
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.findOne({ email: email })
        }).then(user => {
            if (user) {
                {
                    mongoose.disconnect();
                    reject('Email is used');
                }
            } else {
                return bcrybt.hash(password, 10) //dah bea5od el rkm el defult 10 we lazem eb2a feha string lel ta4fer
            }
        }).then(hashedpassword => {
            let user = new User({
                username: username,
                email: email,
                password: hashedpassword,
            })
            return user.save();
        }).then(() => {
            mongoose.disconnect();
            resolve();
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    });
};

exports.login = (email, password) => {
    //chek if email 
    //no--error
    //yes--chek password 
    //no--eror
    //yes--save in set setion

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.findOne({ email: email })
        }).then(user => {
            if (!user) {
                {
                    mongoose.disconnect();
                    reject('Email Not Found');
                }
            } else { //d5lnaha 3la 4an el object eb2a mota7
                bcrybt.compare(password, user.password).then(same => {
                    if (!same) {
                        mongoose.disconnect();
                        reject('Password InCorct');
                    } else { //at3aml m3 el secion b2a
                        mongoose.disconnect();
                        resolve({
                            id: user._id,
                            isAdmin: user.isAdmin
                        })
                    }
                });
            }
        }).catch(err => {
            mongoose.disconnect();
            reject(err);
        })
    })

};