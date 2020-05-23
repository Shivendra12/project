var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/password', function(req, res, next) {
  res.render('password');
});

module.exports = router;
