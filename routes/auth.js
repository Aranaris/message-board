var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController');

router.get('/log-in', (req, res, next) => {
    res.redirect('/messageboard/');
})

router.post('/log-in', user_controller.user_authenticate_post);

router.post('/log-out', user_controller.user_logout_post);

module.exports = router;
