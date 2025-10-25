const Organization = require('../models/Organization');

// @desc    Get organization by slug
// @route   GET /api/v1/organization/:slug
// @access  Public
exports.getOrganization = async (req, res, next) => {
  try {
    const organization = await Organization.findOne({ 
      slug: req.params.slug 
    });
    
    if (!organization) {
      return res.status(404).json({
        success: false,
        message: 'Organization not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: organization
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update organization
// @route   PUT /api/v1/organization/:slug
// @access  Private
exports.updateOrganization = async (req, res, next) => {
  try {
    const organization = await Organization.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!organization) {
      return res.status(404).json({
        success: false,
        message: 'Organization not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: organization
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Change organization status
// @route   PATCH /api/v1/organization/:slug/status
// @access  Private
exports.changeStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    const organization = await Organization.findOneAndUpdate(
      { slug: req.params.slug },
      { status },
      { new: true }
    );
    
    if (!organization) {
      return res.status(404).json({
        success: false,
        message: 'Organization not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: organization
    });
  } catch (error) {
    next(error);
  }
};
