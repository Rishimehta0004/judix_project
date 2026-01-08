const { z } = require('zod');

// Create task validation schema
const createTaskSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title cannot exceed 100 characters')
    .trim(),
  description: z.string()
    .max(500, 'Description cannot exceed 500 characters')
    .trim()
    .optional(),
  status: z.enum(['pending', 'in-progress', 'completed'])
    .optional(),
  priority: z.enum(['low', 'medium', 'high'])
    .optional(),
  dueDate: z.string()
    .datetime()
    .or(z.date())
    .optional()
    .nullable()
});

// Update task validation schema
const updateTaskSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title cannot exceed 100 characters')
    .trim()
    .optional(),
  description: z.string()
    .max(500, 'Description cannot exceed 500 characters')
    .trim()
    .optional(),
  status: z.enum(['pending', 'in-progress', 'completed'])
    .optional(),
  priority: z.enum(['low', 'medium', 'high'])
    .optional(),
  dueDate: z.string()
    .datetime()
    .or(z.date())
    .optional()
    .nullable()
});

/**
 * Validation middleware factory
 */
const validate = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
          }))
        });
      }
      next(error);
    }
  };
};

module.exports = {
  validate,
  createTaskSchema,
  updateTaskSchema
};
