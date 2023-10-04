const Message = require('../models/message');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');


exports.index = asyncHandler(async (req, res, next) => {
    res.render('index', { title: 'Home', section: 'home'});
  });

//display all messages
exports.message_list = asyncHandler(async (req, res, next) => {
    const allMessages = await Message.find({}, 'message_text user added')
        .sort({added: 1})
        .populate('user')
        .exec();
    res.render('index', {title: 'Messages', section: 'message_list', message_list: allMessages});
});

//display message create form on GET
exports.message_create_get = asyncHandler(async (req, res, next) => {
    const allUsers = await User.find().sort({ username: 1 }).exec();
    
    res.render('index', {title: 'New Message', section: 'add_message', users: allUsers});
});

//handle message create on POST
exports.message_create_post = [
    body('new-msg-input')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Message content cannot be blank.'),
    body('new-msg-user')
        .trim()
        .isLength({ min: 1})
        .withMessage('Please input a username'),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const message = new Message({
            message_text: req.body['new-msg-input'],
            user: req.body['new-msg-user'],
        });

        if (!errors.isEmpty()) {
            const allUsers = await User.find().sort({ username: 1 }).exec();

            res.render('index', {
                title: 'New Message',
                section: 'add_message',
                message: message,
                message_user: req.body['new-msg-user'],
                users: allUsers,
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
    res.send('Not Implemented: Message Delete Form GET')
});

//handle message delete on POST
exports.message_delete_post = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Message Delete POST')
});

//handle message update form on GET
exports.message_update_get = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Message Update Form GET')
});

//handle message update on POST
exports.message_update_post = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Message Update POST')
});

//display specific message on GET
exports.message_detail = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Message Detail GET')
});
