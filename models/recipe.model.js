const mongoose = require('mongoose');
const schema = mongoose.Schema;

const recipeSchema = new schema({
    name: {
        type: String,
        required: true
    },
    vegies: [
        {
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: false
            },
            isVeg: {
                type: Boolean,
                required: true
            }
        }
    ],
    mainingredients: [
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
    regularingredients: [
        {
            name: {
                type: String,
                required: false
            },
            quantity: {
                type: String,
                required: false
            }
        },
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
}, {
    timestamps: { createdAt: true, updatedAt: false }
})

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe