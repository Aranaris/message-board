const express = require('express');
const router = express.Router();

const message_controller = require('../controllers/messageController');
const user_controller = require('../controllers/userController');

// authentication and authorization logic. TODO: find a better way to organize this code
const isLoggedIn = function (req, res, next){
    if (req.user) {
        next();
    } else {
        res.render('index', { title:'Access Denied', section: 'access_denied', error_message: req.flash('error') });
    }
}

const checkAuthz = function (req, res, next){
    if (req.user) {
        next();
    } else {

    }
}

// GET catalog home page.
router.get('/', message_controller.index);

//User routes
router.get('/user/create', user_controller.user_create_get);
router.post('/user/create', user_controller.user_create_post);

router.get('/user/:id/delete', isLoggedIn, user_controller.user_delete_get);
router.post('/user/:id/delete', isLoggedIn, user_controller.user_delete_post);

router.get('/user/:id/update', isLoggedIn,  user_controller.user_update_get);
router.post('/user/:id/update', isLoggedIn, user_controller.user_update_post);

router.get('/users', isLoggedIn, user_controller.user_list);
router.get('/user/:id', isLoggedIn, user_controller.user_detail);

//message routes
router.get('/message/create', isLoggedIn, message_controller.message_create_get);
router.post('/message/create', isLoggedIn, message_controller.message_create_post);

router.get('/message/:id/delete', isLoggedIn, message_controller.message_delete_get);
router.post('/message/:id/delete', isLoggedIn,  message_controller.message_delete_post);

router.get('/message/:id/update', isLoggedIn, message_controller.message_update_get);
router.post('/message/:id/update', isLoggedIn, message_controller.message_update_post);

router.get('/messages', message_controller.message_list);
router.get('/message/:id', message_controller.message_detail);



module.exports = router;


