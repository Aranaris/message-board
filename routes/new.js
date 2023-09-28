const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
  ];
  
var express = require('express');
var router = express.Router();

/* Handle new messages */
router.get('/', function(req, res, next) {
    res.render('form', { text: 'this is a form' });
  });
  
router.post('/add', function(req, res, next) {
const messageText = req.body['new-msg-input'];
const user = req.body['new-msg-user'];
messages.push({
    text: messageText,
    user: user,
    added: new Date()
});
res.redirect('/');
});
  
module.exports = router;
