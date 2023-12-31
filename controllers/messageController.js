const Message = require('../models/message');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');


exports.index = asyncHandler(async (req, res, next) => {
    res.render('index', { title: 'Home', section: 'home', error_message: req.flash('error') });
  });

//display all messages
exports.message_list = asyncHandler(async (req, res, next) => {
    const allMessages = await Message.find({}, 'message_text user added edited')
        .sort({added: 1})
        .populate('user')
        .exec();
    res.render('index', {title: 'Messages', section: 'message_list', message_list: allMessages, error_message: req.flash('error') });
});

//display message create form on GET
exports.message_create_get = asyncHandler(async (req, res, next) => {
    const allUsers = await User.find().sort({ username: 1 }).exec();
    
    res.render('index', {title: 'New Message', section: 'add_message', error_message: req.flash('error') });
});

//handle message create on POST
exports.message_create_post = [
    body('new-msg-input')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Message content cannot be blank.')
        .isLength({ max: 100 })
        .withMessage('Message must be less than 100 characters.'),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const message = new Message({
            message_text: req.body['new-msg-input'],
            user: req.user,
        });

        if (!errors.isEmpty()) {

            res.render('index', {
                title: 'New Message',
                section: 'add_message',
                message: message,
                errors: errors.array(),
            });
            return;
        } else {

            await message.save();
        
            res.redirect('/messageboard/messages');
        }
    })
];

//display message delete form on GET
exports.message_delete_get = asyncHandler(async (req, res, next) => {
    const message = await Message.findById(req.params.id).populate('user').exec();
    const user = await User.findById(message.user._id).exec();
    const userMessages = await Message
                            .find({user: user._id})
                            .sort({added: 1})
                            .exec();
    res.render('index', {title: 'User Profile', section: 'user_profile', user: user, message_list: userMessages, msg_delete_id: req.params.id});
});

//handle message delete on POST
exports.message_delete_post = asyncHandler(async (req, res, next) => {
    const message = await Message.findById(req.params.id).populate('user').exec();
    const user = message.user;
    await Message.findByIdAndRemove(req.params.id);
    res.redirect(`/messageboard/user/${user._id}/`);
});

//handle message update form on GET
exports.message_update_get = asyncHandler(async (req, res, next) => {
    const message = await Message.findById(req.params.id).populate('user').exec();

    res.render('index', {title: 'Edit Message', section: 'edit_message', message: message });
});

//handle message update on POST
exports.message_update_post = [
    body('new-msg-input')
        .trim()
        .isLength({ min: 1})
        .withMessage('Message content cannot be blank')
        .isLength({ max: 100 })
        .withMessage('Message must be less than 100 characters.'),
    asyncHandler(async function(req, res, next) {
        const errors = validationResult(req);

        const message = await Message.findById(req.params.id).populate('user').exec();
        
        if (!errors.isEmpty()) {
            res.render('index', {
                title: 'Edit Message', 
                section: 'edit_message', 
                message: message,
                errors: errors.array(),
            });
            return;
        } else {
            message.message_text = req.body['new-msg-input'];
            message.edited = new Date();

            await message.save();

            res.redirect('/messageboard/messages');
        };
    }),
]

//display specific message on GET
exports.message_detail = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Message Detail GET')
});
