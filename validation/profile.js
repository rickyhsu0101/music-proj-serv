const Validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.bio) ? data.bio : "";
  if(!Validator.isLength(data.handle, {min: 2, max: 40})){
    errors.handle = 'Handle needs to be between 2 and 40 characters';
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Handle field is required';
  }
  if (!Validator.isLength(data.bio, {min:10, max:4000})) {
    errors.bio = 'Biography needs to be between 10 and 4000 characters';
  }
  if (Validator.isEmpty(data.bio)) {
    errors.bio = 'Biography field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
};