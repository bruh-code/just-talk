var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
   var db = require("../persistence/db");
   var Users = db.Mongoose.model('messagescollection', db.MessageSchema, 'messagescollection');
   Users.find({}).lean().exec(
      function (e, docs) {
         res.render('chat', { "msglist": docs });
   });
});

module.exports = router;
