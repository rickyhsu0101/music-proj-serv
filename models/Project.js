const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const ProjectSchema = new Schema({
  profile: {
    type: Schema.Types.ObjectId,
    ref: 'profiles'
  },
  projName: {
    type: String,
    required: true
  },
  projDesc: {
    type: String,
  },
  midiMap: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now()
  }
});
module.exports = Project = mongoose.model('projects', ProjectSchema);