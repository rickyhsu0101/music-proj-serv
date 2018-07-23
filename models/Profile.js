const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  projects: {
    type: [Schema.Types.ObjectId],
    ref: 'projects'
  },
  bio: {
    type: String,
    required: true
  },
  musicExperience: [
    {
      title:{
        type: String,
        required: true
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);