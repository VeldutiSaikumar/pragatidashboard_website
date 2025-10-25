const express = require('express');
const router = express.Router();
const {
  getOrganization,
  updateOrganization,
  changeStatus
} = require('../controllers/organizationController');

router.get('/:slug', getOrganization);
router.put('/:slug', updateOrganization);
router.patch('/:slug/status', changeStatus);

module.exports = router;
