import Joi from 'joi';

const itemValidationSchema = Joi.object({
    name: Joi.string()  // Changed from 'item' to 'name' to match your model
        .pattern(/^[a-zA-Z0-9\s\-',.]+$/) // Added common punctuation
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.pattern.base': 'Name should only contain letters, numbers, spaces, and basic punctuation',
            'string.empty': 'Name cannot be empty',
            'string.min': 'Name should have at least 3 characters',
            'string.max': 'Name should have at most 50 characters',
            'any.required': 'Name is required'
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
        }),
    price: Joi.number()
        .positive()
        .precision(2)
        .required()
        .messages({
            'number.base': 'Price must be a number',
            'number.positive': 'Price must be positive',
            'any.required': 'Price is required'
        }),
    category: Joi.string()
        .valid('Drinks', 'Foods', 'Brunch', 'Snacks', 'Dessert')
        .required(),
    menu: Joi.string()  // This should be ObjectId in actual implementation
        .required()
});

export default itemValidationSchema;