import Joi from 'joi';

const menuValidationSchema = Joi.object({
    title: Joi.string()
        .pattern(/^[a-zA-Z0-9\s\-',.]+$/)
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.pattern.base': 'Title should only contain letters, numbers, spaces, and basic punctuation',
            'string.empty': 'Title cannot be empty',
            'string.min': 'Title should have at least 3 characters',
            'string.max': 'Title should have at most 50 characters',
            'any.required': 'Title is required'
        }),
    description: Joi.string()
        .min(10)
        .max(500)
        .required()
        .messages({
            'string.empty': 'Description cannot be empty',
            'string.min': 'Description should have at least 10 characters',
            'string.max': 'Description should have at most 500 characters',
            'any.required': 'Description is required'
        })
});

export default menuValidationSchema;