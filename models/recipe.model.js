const mongoose = require('mongoose');
const schema = mongoose.Schema;

const recipeSchema = new schema({
    name: {
        type: String,
        required: true
    },
    ingredients: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: String,
                required: true
            }
        }
    ],
    optionalIngredients: [
        {
            name: {
                type: String,
                required: false
            },
            quantity: {
                type: String,
                required: false
            }
        }
    ],
    steps: [
        {
            stepNumber: {
                type: Number,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }
    ],
})

const Recipe = mongoose.model('Recipe',recipeSchema);

module.exports = Recipe