var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const auth = require('../tools/authentication.js');
const ac = require('../tools/ac.js');
const User = require('../models/user');
const Article = require('../models/article');
const Comment = require('../models/comment');
const admin = require('./api/admin');
const user = require('./api/user');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/Final_Project_1', function (err, res) {
  if (err) { console.log('Failed to connect to ' + db); }
  else { console.log('Connected to ' + db); }
});

// const upload = multer({
//   dest: process.cwd() + "/public/images"
// });

/* GET home page. */
router.get('/', function (req, res, next) {

  Article.find({}, function (err, contents) {
    if (err)
        res.send(err)
    res.render('index', {
        contents
    })
  });
});

router.get('/panel*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../panel/build/') });
});


router.post('/signup', (req, res) => {
  console.log(req.body)
  if (!req.body.username || !req.body.password) {
    return res.json({
      success: false,
      msg: "empty filed"
    })
  }
  let user = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password,
    sex: req.body.sex,
    phone: req.body.phone,
    role: "user"
  })

  // fs.rename(req.file.path, req.file.destination + "/" + req.file.originalname, function (err) {
  //   if (err)
  //     res.send(err)
  //   console.log(req.file.path + req.file.destination + req.file.originalname)
  // })   upload.single("file"),

  user.save((err, user) => {
    if (err) {
      console.log(err.message)
      return res.json({
        success: false,
        msg: "something wrong in user sign up\n" + err.message
      })
    }
    res.json({
      success: true,
      user
    })
  })
})


router.post('/signin', passport.authenticate('local-login'), (req, res) => {
  // console.log("222222"+req.body.username);

  User.find({username: req.body.username}, (err, user)=>{
    console.log("##############"+user)
    console.log("$$$$$$$"+user[0].role)
    if (err)
      console.log(err)
    res.json({
      role: user[0].role,
      success: true,
      msg: "you are logged in"
    })
  })

  // res.json({
  //   success: true,
  //   msg: "you are logged in"
  // });
});


//#########################################
router.post('/addarticle', (req, res) => {
  console.log(req.body)
  // if (!req.body.username || !req.body.password) {
  //   return res.json({
  //     success: false,
  //     msg: "empty filed"
  //   })
  // }
  let article = new Article({
    title: req.body.title,
    text: req.body.text,
    createDate: new Date(),
    author: req.user.firstname + " " + req.user.lastname,
    username: req.user.username
  })

  article.save((err, article) => {
    if (err) {
      console.log(err.message)
      return res.json({
        success: false,
        msg: "something wrong in user sign up\n" + err.message
      })
    }
    res.json({
      success: true,
      article
    })
  })
})



router.get('/myarticle', function (req, res, next) {

  Article.find({username: req.user.username}, function (err, contents) {
    if (err) {
      console.log(err.message)
      return res.json({
        success: false,
        msg: "something wrong in display articles\n" + err.message
      })
    }
    res.json(contents)
  });
});

router.get('/myprofile', function (req, res, next) {

  User.find({username: req.user.username}, function (err, contents) {
    if (err) {
      console.log(err.message)
      return res.json({
        success: false,
        msg: "something wrong in display profile\n" + err.message
      })
    }
    res.json(contents)
  });
});

router.get('/allarticle', function (req, res, next) {

  Article.find({}, function (err, contents) {
    if (err) {
      console.log(err.message)
      return res.json({
        success: false,
        msg: "something wrong in display articles\n" + err.message
      })
    }
    res.json(contents)
  });
});

router.post('/addcomment', (req, res) => {
  // console.log(req.body)
  // if (!req.body.username || !req.body.password) {
  //   return res.json({
  //     success: false,
  //     msg: "empty filed"
  //   })
  // }
  let comment = new Comment({
    text: req.body.text,
    createDate: new Date(),
    username: req.user.username,
    // articleID: req.article._id
  })

  console.log(comment)

  comment.save((err, comment) => {
    if (err) {
      console.log(err.message)
      return res.json({
        success: false,
        msg: "something wrong in add comment\n" + err.message
      })
    }
    res.json({
      success: true,
      comment
    })
  })
})


router.get('/comment', function (req, res, next) {
  Comment.find({}, function (err, comment) {
    if (err) {
      console.log(err.message)
      return res.json({
        success: false,
        msg: "something wrong in display comments\n" + err.message
      })
    }
    res.json(comment)
  });
});





router.post('/editprofile', (req, res) => {
  
  User.update({username: req.user.username},
    {$set: { 
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
      sex: req.body.sex,
      phone: req.body.phone,
      role: "user"
     }},
     function (err, content){
      if (err) {
        console.log(err.message)
        return res.json({
          success: false,
          msg: "something wrong in display comments\n" + err.message
        })
      }
      res.json({success: true,content})
     })
})


router.post('/editarticle', (req, res) => {
  console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxx")

  Article.update({title: req.article.title},
    {$set: { 
      title: req.body.title,
      text: req.body.text
     }},
     function (err, content){
      if (err) {
        console.log(err.message)
        return res.json({
          success: false,
          msg: "something wrong in display comments\n" + err.message
        })
      }
      res.json({success: true,content})
     })
})


module.exports = router;
