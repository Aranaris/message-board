const message = require('../models/message');
const asyncHandler = require('express-async-handler');


exports.index = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Site Home Page");
  });
  
//display all messages
exports.message_list = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Message List')
});

//display message create form on GET
exports.message_create_get = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Message Create Form GET')
});

//handle message create on POST
exports.message_create_post = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: Message Create POST')
});

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
