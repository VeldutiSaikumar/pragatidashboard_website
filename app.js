// In-memory data store
let organizationData = {
  name: 'Pragati Engineering College',
  slug: 'pragati',
  email: 'pragati@pragati.ac.in',
  phone: '8852252233',
  alternatePhone: '8852252234',
  website: 'pragati.ac.in',
  primaryAdminName: 'Dr. Principal Name',
  primaryAdminEmail: 'admin@pragati.ac.in',
  supportEmailId: 'support@pragati.ac.in',
  maxCoordinators: 'Upto 5 Coordinators',
  timezoneCommon: 'India Standard Time',
  timezoneRegion: 'Asia/Kolkata',
  language: 'English',
  status: 'Active',
  phoneCode: '+91',
  altPhoneCode: '+91'
};

let departments = [
  {
    id: 1,
    name: 'Computer Science and Engineering',
    code: 'CSE',
    hod: 'Dr. A. Kumar',
    contact: 'cse@pragati.ac.in',
    facultyCount: 45,
    studentCapacity: 240
  },
  {
    id: 2,
    name: 'Electronics and Communication Engineering',
    code: 'ECE',
    hod: 'Dr. S. Reddy',
    contact: 'ece@pragati.ac.in',
    facultyCount: 38,
    studentCapacity: 180
  },
  {
    id: 3,
    name: 'Mechanical Engineering',
    code: 'MECH',
    hod: 'Dr. P. Sharma',
    contact: 'mech@pragati.ac.in',
    facultyCount: 32,
    studentCapacity: 120
  },
  {
    id: 4,
    name: 'Electrical and Electronics Engineering',
    code: 'EEE',
    hod: 'Dr. R. Prasad',
    contact: 'eee@pragati.ac.in',
    facultyCount: 28,
    studentCapacity: 120
  },
  {
    id: 5,
    name: 'Civil Engineering',
    code: 'CIVIL',
    hod: 'Dr. M. Rao',
    contact: 'civil@pragati.ac.in',
    facultyCount: 25,
    studentCapacity: 60
  },
  {
    id: 6,
    name: 'Information Technology',
    code: 'IT',
    hod: 'Dr. K. Singh',
    contact: 'it@pragati.ac.in',
    facultyCount: 35,
    studentCapacity: 180
  }
];

let isEditMode = false;

// Mock API Functions
function mockAPI(endpoint, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (endpoint.startsWith('/api/organizations/')) {
        if (method === 'GET') {
          resolve({ success: true, data: organizationData });
        } else if (method === 'PUT') {
          organizationData = { ...organizationData, ...data };
          resolve({ success: true, data: organizationData, message: 'Organization updated successfully' });
        }
      } else if (endpoint === '/api/departments') {
        if (method === 'GET') {
          resolve({ success: true, data: departments });
        } else if (method === 'POST') {
          const newDept = { id: departments.length + 1, ...data };
          departments.push(newDept);
          resolve({ success: true, data: newDept, message: 'Department created successfully' });
        }
      } else {
        reject({ success: false, message: 'Endpoint not found' });
      }
    }, 500);
  });
}

// Initialize the application
function init() {
  loadOrganizationData();
  setupEventListeners();
}

// Load organization data
function loadOrganizationData() {
  mockAPI('/api/organizations/pragati', 'GET').then(response => {
    const data = response.data;
    
    // Update header
    document.getElementById('orgName').textContent = data.name;
    document.getElementById('orgEmail').textContent = data.email;
    document.getElementById('orgPhone').textContent = `${data.phoneCode} - ${data.phone}`;
    document.getElementById('orgWebsite').textContent = data.website;
    
    // Update status badge
    const statusBadge = document.getElementById('statusBadge');
    statusBadge.textContent = data.status;
    statusBadge.className = 'status-badge';
    if (data.status === 'Inactive') {
      statusBadge.classList.add('inactive');
    }
    
    // Update form fields
    document.getElementById('organizationName').value = data.name;
    document.getElementById('organizationSlug').value = data.slug;
    document.getElementById('primaryAdminName').value = data.primaryAdminName;
    document.getElementById('primaryAdminEmail').value = data.primaryAdminEmail;
    document.getElementById('phoneCode').value = data.phoneCode;
    document.getElementById('phoneNumber').value = data.phone;
    document.getElementById('supportEmail').value = data.supportEmailId;
    document.getElementById('altPhoneCode').value = data.altPhoneCode;
    document.getElementById('altPhoneNumber').value = data.alternatePhone;
    document.getElementById('maxCoordinators').value = data.maxCoordinators;
    document.getElementById('timezoneCommon').value = data.timezoneCommon;
    document.getElementById('timezoneRegion').value = data.timezoneRegion;
    document.getElementById('language').value = data.language;
    document.getElementById('websiteUrl').value = data.website;
  });
}

// Setup event listeners
function setupEventListeners() {
  // Tab switching
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.dataset.tab;
      switchTab(tabName);
    });
  });
  
  // Edit button
  const editBtn = document.getElementById('editBtn');
  editBtn.addEventListener('click', () => {
    toggleEditMode();
  });
  
  // Form submission
  const form = document.getElementById('orgForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    saveChanges();
  });
  
  // Change status button
  const changeStatusBtn = document.getElementById('changeStatusBtn');
  changeStatusBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleStatus();
  });
}

// Switch tabs
function switchTab(tabName) {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    if (tab.dataset.tab === tabName) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });
  
  if (tabName === 'basic') {
    document.getElementById('basicDetailsContent').style.display = 'block';
    document.getElementById('usersContent').classList.remove('active');
  } else if (tabName === 'users') {
    document.getElementById('basicDetailsContent').style.display = 'none';
    document.getElementById('usersContent').classList.add('active');
  }
}

// Toggle edit mode
function toggleEditMode() {
  isEditMode = !isEditMode;
  
  const formInputs = document.querySelectorAll('.form-input, .form-select');
  const saveBtn = document.getElementById('saveBtn');
  const editBtn = document.getElementById('editBtn');
  
  if (isEditMode) {
    formInputs.forEach(input => {
      // Don't enable slug field
      if (input.id !== 'organizationSlug') {
        input.disabled = false;
      }
    });
    saveBtn.style.display = 'inline-block';
    editBtn.textContent = '✖️';
    editBtn.title = 'Cancel';
  } else {
    formInputs.forEach(input => {
      input.disabled = true;
    });
    saveBtn.style.display = 'none';
    editBtn.textContent = '✏️';
    editBtn.title = 'Edit';
    // Reload data to cancel changes
    loadOrganizationData();
  }
}

// Save changes
function saveChanges() {
  const saveBtn = document.getElementById('saveBtn');
  saveBtn.disabled = true;
  saveBtn.textContent = 'Saving...';
  
  const updatedData = {
    name: document.getElementById('organizationName').value,
    slug: document.getElementById('organizationSlug').value,
    primaryAdminName: document.getElementById('primaryAdminName').value,
    primaryAdminEmail: document.getElementById('primaryAdminEmail').value,
    phoneCode: document.getElementById('phoneCode').value,
    phone: document.getElementById('phoneNumber').value,
    supportEmailId: document.getElementById('supportEmail').value,
    altPhoneCode: document.getElementById('altPhoneCode').value,
    alternatePhone: document.getElementById('altPhoneNumber').value,
    maxCoordinators: document.getElementById('maxCoordinators').value,
    timezoneCommon: document.getElementById('timezoneCommon').value,
    timezoneRegion: document.getElementById('timezoneRegion').value,
    language: document.getElementById('language').value,
    website: document.getElementById('websiteUrl').value
  };
  
  // Validate email fields
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(updatedData.primaryAdminEmail)) {
    showMessage('Please enter a valid Primary Admin email address', 'error');
    saveBtn.disabled = false;
    saveBtn.textContent = 'Save Changes';
    return;
  }
  
  if (!emailRegex.test(updatedData.supportEmailId)) {
    showMessage('Please enter a valid Support email address', 'error');
    saveBtn.disabled = false;
    saveBtn.textContent = 'Save Changes';
    return;
  }
  
  // Validate phone numbers
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(updatedData.phone)) {
    showMessage('Please enter a valid 10-digit phone number', 'error');
    saveBtn.disabled = false;
    saveBtn.textContent = 'Save Changes';
    return;
  }
  
  if (!phoneRegex.test(updatedData.alternatePhone)) {
    showMessage('Please enter a valid 10-digit alternative phone number', 'error');
    saveBtn.disabled = false;
    saveBtn.textContent = 'Save Changes';
    return;
  }
  
  mockAPI('/api/organizations/pragati', 'PUT', updatedData)
    .then(response => {
      if (response.success) {
        showMessage(response.message, 'success');
        loadOrganizationData();
        toggleEditMode();
      }
    })
    .catch(error => {
      showMessage('Failed to save changes. Please try again.', 'error');
    })
    .finally(() => {
      saveBtn.disabled = false;
      saveBtn.textContent = 'Save Changes';
    });
}

// Toggle status
function toggleStatus() {
  const currentStatus = organizationData.status;
  const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
  
  mockAPI('/api/organizations/pragati', 'PUT', { status: newStatus })
    .then(response => {
      if (response.success) {
        showMessage(`Organization status changed to ${newStatus}`, 'success');
        loadOrganizationData();
      }
    })
    .catch(error => {
      showMessage('Failed to change status. Please try again.', 'error');
    });
}

// Show message
function showMessage(message, type) {
  const messageContainer = document.getElementById('messageContainer');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.textContent = message;
  
  messageContainer.innerHTML = '';
  messageContainer.appendChild(messageDiv);
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    messageDiv.style.display = 'none';
  }, 5000);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}