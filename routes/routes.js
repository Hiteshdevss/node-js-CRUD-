const express = require('express');
const router = express.Router();
const User = require('../models/users');
const upload = require('../middlewares/multer');
const users = require('../models/users');

// Insert an user into database route 
router.post('/add', upload, (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file.filename,
    });

    user.save()
        .then(() => {
            req.session.message = {
                type: 'success',
                message: 'User added successfully!'
            };
            res.redirect('/');
        })
        .catch((err) => {
            res.json({
                message: err.message,
                type: 'danger'
            });
        });
});

router.get('/', (req, res) => {
    users.find().exac((err, users) => {
        if (err) {
            res.json({ message: err.message });
        } else {
            res.render('index', {
                title: 'Homepage',
                users: users,
            })
        }
    })
});

router.get('/add', (req, res) => {
    res.render('add_users', { title: 'Add Users' });
});

module.exports = router;
