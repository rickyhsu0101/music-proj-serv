const router = require('express').Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../../models/profile');
const Project = require('../../models/project');
const validateProjectInput = require('../../validation/project');
const isEmpty  = require("../../validation/is-empty");
// @route   GET api/posts/test
// @desc    Tests profile route
// @access  Public

router.get("/test", (req, res) => res.json({
  msg: "Posts Works"
}));
// @route   GET api/project/all
// @desc    Get all existing projects
// @access  Private
router.get("/all", passport.authenticate('jwt', {session: false}), (req,res)=>{
  const errors= {};
  Project.find({})
    .then(data => res.json({projects: data}))
    .catch(err=> {
      errors.projects = err;
      res.status(404).json(errors);
    });
});
// @route   GET api/project/:id
// @desc    Get project by id
// @access  Private
router.get("/:id", passport.authenticate('jwt', {session: false}), (req, res)=>{
  const errors = {};
  Project.findById(req.params.id).populate('profiles')
    .then(data=>{
      if(!data){
        errors.project= 'Project Not Found with ID';
        return res.status(404).json(errors);
      }
      res.json({project: proj})
    })
    .catch(err=>{
      errors.project = err;
      res.status(404).json(errors);
    });
});
// @route   POST api/project/
// @desc    Create or update project
// @access  Private
router.post('/', passport.authenticate('jwt', {session:false}), (req, res)=>{
  const {errors, isValid} = validateProjectInput(req.body);
  if(!isValid){
    res.status(400).json(errors);
  }
  Profile.findOne({user: req.user.id})
    .then(profile=> {
      if(!profile){
        errors.noprofile =true;
        return res.status(400).json(errors);
      }else{
        if(!isEmpty(req.body.projectId)){
          Project.findOneAndUpdate(
            {id: req.body.projectId}, 
            {$set: {
              midiMap: req.body.midiMap,
              projName: req.body.projName,
              projDesc: req.body.projDesc,
              profile: req.body.profileId
            }}, {new: true})
            .then(proj=>{
              if(!proj){
                errors.project = 'Project not found by id'
                return res.status(404).json(errors);
              }
              return res.json({project: proj})})
            .catch(err=>{
              errors.project = err;
              return res.status(404).json(errors);
            });
        }else{
          const newProj = new Project({
            midiMap: req.body.midiMap,
            projName: req.body.projName,
            projDesc: req.body.projDesc,
            profile: req.body.profileId
          });
          return res.json({project: newProject});
        }
      }
    })
    .catch(err=>{
      errors.project = err;
      res.status(404).json(errors);
    });
});
module.exports = router;
