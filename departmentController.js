const Department = require('../models/Department');

// @desc    Get all departments
// @route   GET /api/v1/departments
// @access  Public
exports.getAllDepartments = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, isActive } = req.query;
    
    const query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }
    
    const departments = await Department.find(query)
      .populate('organization', 'name slug')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const count = await Department.countDocuments(query);
    
    res.status(200).json({
      success: true,
      data: departments,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(count / limit),
        totalItems: count,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get department by ID
// @route   GET /api/v1/departments/:id
// @access  Public
exports.getDepartmentById = async (req, res, next) => {
  try {
    const department = await Department.findById(req.params.id)
      .populate('organization');
    
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: department
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create department
// @route   POST /api/v1/departments
// @access  Private
exports.createDepartment = async (req, res, next) => {
  try {
    const department = await Department.create(req.body);
    
    res.status(201).json({
      success: true,
      data: department
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update department
// @route   PUT /api/v1/departments/:id
// @access  Private
exports.updateDepartment = async (req, res, next) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: department
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete department
// @route   DELETE /api/v1/departments/:id
// @access  Private
exports.deleteDepartment = async (req, res, next) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);
    
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Department deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
