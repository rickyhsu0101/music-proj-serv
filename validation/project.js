const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateProjectInput(data) {
  let errors = {};

  data.projName = !isEmpty(data.projName) ? data.projName : "";
  data.projDesc = !isEmpty(data.projDesc) ? data.projDesc : "";
  data.midiMap = !isEmpty(data.midiMap)? data.midiMap:"";

  if (!Validator.isLength(data.projName, {min: 4, max:40})) {
    errors.projName = 'Project Name must be between 4 and 40 characters';
  }
  if (Validator.isEmpty(data.projName)) {
    errors.projName = 'Project Name cannot be empty';
  }
  if (!Validator.isLength(data.projDesc, {min: 20, max:200})) {
    errors.projDesc = 'Project Description must be between 4 and 200 characters';
  }
  if (Validator.isEmpty(data.projDesc)) {
    errors.projDesc = 'Project Description cannot be empty';
  }
  if (Validator.isEmpty(data.midiMap)) {
    errors.midiMap = 'MIDI map cannot be empty';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
};