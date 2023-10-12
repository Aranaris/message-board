const User = require('../models/user');
const Message = require('../models/message');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const passport = require('passport');

//display all users
exports.user_list = asyncHandler(async (req, res, next) => {
    const allUsers = await User.find({}, 'username first_name last_activity date_of_birth')
        .sort({username: 1})
        .exec();
    res.render('index', {title: 'Users', section: 'user_list', user_list: allUsers});
});

//display user create form on GET
exports.user_create_get = asyncHandler(async (req, res, next) => {
    res.render('index', {title: 'Add User', section: 'add_user'});
});

//handle user create on POST
exports.user_create_post = [
    body('new-username')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Username must be specified.')
        .isAlphanumeric()
        .withMessage('Invalid characters.'),
    body('new-user-firstname')
        .trim()
        .isLength({ min: 1 })
        .withMessage('First name must be specified.')
        .isAlphanumeric()
        .withMessage('Invalid characters.'),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const user = new User({
            username: req.body['new-username'],
            first_name: req.body['new-user-firstname'],
        });

        if (req.body['new-user-date-of-birth']) {
            user.dob_formatted = req.body['new-user-date-of-birth'];
        }

        if (!errors.isEmpty()) {
            res.render('index', {
                title: 'Add User',
                section: 'add_user',
                user: user,
                errors: errors.array(),
            });
            return;
        } else {
            await user.save();

            res.redirect(user.url);
        }
    }),
];

//display user delete form on GET
exports.user_delete_get = asyncHandler(async (req, res, next) => {
    const [user, userMessages] = await Promise.all([
        User.findById(req.params.id).exec(),
        Message.find({ user: req.params.id }).sort({ added: 1 }).exec(),
    ])
    res.render('index', {
        title: 'User Profile',
        section: 'user_profile',
        user: user,
        message_list: userMessages,
        delete_mode: true,
    })
});

//handle user delete on POST
exports.user_delete_post = asyncHandler(async (req, res, next) => {
    const [user, userMessages] = await Promise.all([
        User.findById(req.params.id).exec(),
        Message.find({ user: req.params.id }).sort({ added: 1 }).exec(),
    ])
    if ( user === null ) {
        res.redirect('/messageboard/users/')
    } else if ( userMessages.length > 0) {
        res.render('index', {
            title: 'User Profile',
            section: 'user_profile',
            user: user,
            message_list: userMessages,
            errors: [{ msg: 'User has messages, please delete all messages before removing this user.'}]
        })
    } else {
        await User.findByIdAndRemove(req.params.id);
        res.redirect('/messageboard/users/');
    }
});

//handle user update form on GET
exports.user_update_get = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id).exec();
    res.render('index', {title: 'Edit User', section: 'edit_user', user: user});
});

//handle user update on POST
exports.user_update_post = [
    body('new-username')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Username must be specified.')
        .isAlphanumeric()
        .withMessage('Invalid characters.'),
    body('new-user-firstname')
        .trim()
        .isLength({ min: 1 })
        .withMessage('First name must be specified.')
        .isAlphanumeric()
        .withMessage('Invalid characters.'),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const user = await User.findById(req.params.id).exec();
        user.username = req.body['new-username'];
        user.first_name = req.body['new-user-firstname'];
        user.last_activity = new Date();

        if (user.dob_formatted) {
            user.dob_formatted = req.body['new-user-date-of-birth'];
        }

        if (!errors.isEmpty()) {
            res.render('index', {
                title: 'Edit User',
                section: 'edit_user',
                user: user,
                errors: errors.array(),
            });
            return;
        } else {
            await user.save();

            res.redirect(user.url);
        }
    }),
]

//display specific user on GET
exports.user_detail = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id).exec();
    const userMessages = await Message
                            .find({user: req.params.id})
                            .sort({added: 1})
                            .exec();
    res.render('index', {title: 'User Profile', section: 'user_profile', user: user, message_list: userMessages});
});

//user auth
exports.user_authenticate_post = passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    });
