const router = require('express').Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
// @route   GET api/posts/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({msg: "Users Works"}));


router.post('/register', (req, res) => {

  const {errors, isValid} = validateRegisterInput(req.body);

  if(!isValid){
    return res.status(400).json(errors);
  }
  User.findOne({email: req.body.email})
    .then(user => {
      if(user){
        errors.email = "Email already exists";
        return res.status(400).json(errors);
      }else{
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then(user => res.json({name: user.name, email: user.email, date: user.date}))
              .catch(err => console.log(err));
          });
        });
      }
    })
});
router.post('/login', (req, res)=>{
  const {errors, isValid} = validateLoginInput(req.body);
  if(!isValid){
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  //Find user by email
  User.findOne({email})
    .then(user=>{
      if(!user){
        errors.email = 'User not found';
        return res.status(404).json(errors);
      }
      //check password
      bcrypt.compare(password, user.password)
        .then(isMatch =>{
          if(isMatch){
            //user matched
            const payload = {id: user.id, name: user.name, avatar: user.avatar};
            //sign token
            jwt.sign(payload, process.env.SECRET, {expiresIn: 3600}, (err, token)=>{
              res.json({success: true, token: 'Bearer ' + token});
            });
          }else{
            errors.password = 'Password Incorrect';
            return res.status(400).json(errors);
          }
        });
    });
});

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
});

module.exports = router;