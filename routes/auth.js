var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController');

router.get('/', (req, res, next) => {
    res.redirect('/messageboard');
});

router.get('/log-in', (req, res, next) => {
    res.redirect(req.session.returnTo);
});

router.post('/log-in', user_controller.get_referrer, user_controller.user_authenticate_post);

router.post('/log-out', user_controller.user_logout_post);

module.exports = router;
