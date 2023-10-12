var express = require('express');
var router = express.Router();

router.post('/log-in', (req, res, next) => {
    res.send('Login POST: Not Implemented Yet');
})

module.exports = router;
