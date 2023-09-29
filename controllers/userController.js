const user = require('../models/user');
const asyncHandler = require('express-async-handler');

//display all users
exports.user_list = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: User List')
});

//display user create form on GET
exports.user_create_get = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: User Create Form GET')
});

//handle user create on POST
exports.user_create_post = asyncHandler(async (req, res, next) => {
    res.send('Not Implemented: User Create POST')
});

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
    res.send('Not Implemented: User Detail GET')
});
