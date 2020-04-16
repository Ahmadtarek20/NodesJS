const router = require('express').Router()

const check = require('express-validator').check;

const multer = require('multer');

const adminController = require("../controllers/admin.controller");
const adminGard = require('./gards/admin.gards')

router.get('/add', adminGard, adminController.getAdd)

router.post('/add', adminGard, multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'images')
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + '-' + file.originalname)
            }
        })
    }).single('image'),
    check('image').custom((value, { req }) => {
        if (req.file) return true
        else throw 'image is requierd'
    }),
    adminController.postAdd);

module.exports = router;