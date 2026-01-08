const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats
} = require('../controllers/taskController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { 
  validate, 
  createTaskSchema, 
  updateTaskSchema 
} = require('../validators/taskValidator');

// Apply auth middleware to all routes
router.use(authMiddleware);

// @route   GET /api/v1/tasks/stats
// @desc    Get task statistics
// @access  Private
router.get('/stats', getTaskStats);

// @route   POST /api/v1/tasks
// @desc    Create new task
// @access  Private
router.post('/', validate(createTaskSchema), createTask);

// @route   GET /api/v1/tasks
// @desc    Get all tasks (with pagination, search, filter)
// @access  Private
router.get('/', getTasks);

// @route   GET /api/v1/tasks/:id
// @desc    Get single task
// @access  Private
router.get('/:id', getTaskById);

// @route   PUT /api/v1/tasks/:id
// @desc    Update task
// @access  Private
router.put('/:id', validate(updateTaskSchema), updateTask);

// @route   DELETE /api/v1/tasks/:id
// @desc    Delete task
// @access  Private
router.delete('/:id', deleteTask);

module.exports = router;
