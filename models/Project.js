const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const Project = new Schema({
  projName: {
    type: String,
    required: true
  },
  projDesc: {
    type: String,
  },
  profile: {
    type: Schema.Types.ObjectId,
    required: true
  },
  midiMap: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now()
  }
});