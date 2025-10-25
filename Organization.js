const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Organization name is required'],
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  alternatePhone: String,
  website: String,
  primaryAdminName: String,
  primaryAdminEmail: {
    type: String,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide valid email']
  },
  supportEmailId: String,
  maxAllowedCoordinators: {
    type: Number,
    default: 5
  },
  timezone: {
    common: String,
    region: String
  },
  language: {
    type: String,
    default: 'English'
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  established: Number,
  type: String,
  accreditation: [String],
  address: {
    line1: String,
    line2: String,
    district: String,
    state: String,
    pincode: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Organization', organizationSchema);
