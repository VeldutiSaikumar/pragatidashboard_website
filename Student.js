const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  rollNumber: {
    type: String,
    required: [true, 'Roll number is required'],
    unique: true,
    uppercase: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide valid email']
  },
  phone: String,
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: 1,
    max: 4
  },
  semester: {
    type: Number,
    min: 1,
    max: 8
  },
  cgpa: {
    type: Number,
    min: 0,
    max: 10
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);
