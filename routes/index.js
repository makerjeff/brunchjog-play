var express = require('express');

/*added from mHerman tutorial*/
var passport = require('passport');
var mongoose = require('mongoose');
var Account = require('../models/account');
/*added from mHerman tutorial - END*/

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', message: new Date().toLocaleString()});
});

// added from mHerman tutorial
router.get('/register', function(req, res){
  res.render('register', { });
});

router.post('/register', function(req, res) {
  Account.register(new Account({username: req.body.username}),req.body.password, function(err, account){
    if(err){
      return res.render('register', {account:account});
    } else {
      passport.authenticate('local')(req, res, function(){
        res.redirect('/');
      });
    }
  });
});

// GET login
router.get('/login', function(req, res){
  res.render('login', {user: req.user});
});

// POST login
// route, optional middleware, callback
router.post('/login', passport.authenticate('local'), function(req, res){
  res.redirect('/');
});

//logout
router.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
});

//debug PING/PONG
router.get('/ping', function(req, res){
  //res.status(200).send("pong!");
  res.status(200);
  res.send('pong!');
});


//export module
module.exports = router;
