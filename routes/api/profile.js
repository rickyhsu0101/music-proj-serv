const router = require('express').Router();
const mongoose = require('mongoose');
const passport =  require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   GET api/posts/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({
  msg: "Profile Works"
}));

router.get("/", passport.authenticate('jwt', {session: false}), (req, res)=>{
  const errors = {};
  Profile.findOne({user: req.user.id})
    .then(profile => {
      if(!profile){
        errors.noprofile = 'There is no profile for user'
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err=>{
      res.status(404).json(err);
    });
});


//create or update
router.post("/", passport.authenticate('jwt', {session: false}), (req, res)=>{
  //get field
  const profileFields = {};
  profileFields.user = req.user.id;
  if(req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.bio) profileFields.bio = req.body.bio;
  Profile.findOne({user: req.user.id})
    .then(profile=>{
      if(profile){
        Profile.findOneAndUpdate({user: req.user.id}, {$set: profileFields}, {new:true})
        .then(profile=> res.json(profile));
      }else{
        //Check Handle
        Profile.findOne({handle: profileFields.handle})
          .then(profile=>{
            if(profile){
              errors.handle = 'That handle exists';
              res.status(400).json(errors);
            }
            new Profile(profileFields).save().then(profile=> res.json(profile));
          })
      }
    })
});
module.exports = router;
