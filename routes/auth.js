var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController');

router.get('/log-in', (req, res, next) => {
    res.redirect('/messageboard/');
})

router.post('/log-in', user_controller.user_authenticate_post);

router.get("/log-out", (req, res, next) => {
    req.logout((err) => {
        if (err) {
        return next(err);
        }
        res.redirect("/");
    });
});

module.exports = router;
