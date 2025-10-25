const mongoose = require('mongoose');
const Organization = require('../models/Organization');
const Department = require('../models/Department');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

const seedData = async () => {
  try {
    // Clear existing data
    await Organization.deleteMany();
    await Department.deleteMany();
    
    // Create organization
    const org = await Organization.create({
      name: 'Pragati Engineering College',
      slug: 'pragati',
      email: 'pragati@pragati.ac.in',
      phone: '91 - 8852252233',
      alternatePhone: '91 - 8852252234',
      website: 'pragati.ac.in',
      primaryAdminName: 'Dr. Principal Name',
      primaryAdminEmail: 'admin@pragati.ac.in',
      supportEmailId: 'support@pragati.ac.in',
      maxAllowedCoordinators: 5,
      timezone: {
        common: 'India Standard Time',
        region: 'Asia/Kolkata'
      },
      language: 'English',
      status: 'Active',
      established: 2001,
      type: 'Private (Autonomous)',
      accreditation: ['NAAC A+ Grade', 'NBA']
    });
    
    // Create departments
    const departments = [
      {
        name: 'Computer Science and Engineering',
        code: 'CSE',
        hod: 'Dr. A. Kumar',
        contact: 'cse@pragati.ac.in',
        facultyCount: 45,
        studentCapacity: 240,
        labs: ['Programming Lab', 'Data Structures Lab', 'DBMS Lab'],
        organization: org._id
      },
      {
        name: 'Electronics and Communication Engineering',
        code: 'ECE',
        hod: 'Dr. S. Reddy',
        contact: 'ece@pragati.ac.in',
        facultyCount: 38,
        studentCapacity: 180,
        labs: ['Digital Lab', 'Communication Lab'],
        organization: org._id
      }
    ];
    
    await Department.insertMany(departments);
    
    console.log('Data seeded successfully');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
