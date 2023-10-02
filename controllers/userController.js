const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

//display all users
exports.user_list = asyncHandler(async (req, res, next) => {
    const allUsers = await User.find({}, 'username first_name last_activity date_of_birth')
        .sort({last_activity: 1})
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
        .escape()
        .withMessage('Username must be specified.')
        .isAlphanumeric()
        .withMessage('Invalid characters.'),
    body('new-user-firstname')
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage('First name must be specified.')
        .isAlphanumeric()
        .withMessage('Invalid characters.'),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const user = new User({
            username: req.body['new-username'],
            first_name: req.body['new-user-firstname'],
            date_of_birth: req.body['new-user-date-of-birth'],
        });

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
    res.send('Not Implemented: User Delete Form GET')
});

//handle user delete on POST
exports.user_delete_post = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: User Delete POST')
});

//handle user update form on GET
exports.user_update_get = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: User Update Form GET')
});

//handle user update on POST
exports.user_update_post = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: User Update POST')
});

//display specific user on GET
exports.user_detail = asyncHandler(async (req, res, next) => {
    res.render('index', {title: 'User Profile', section: 'user_profile'})
});
