const express = require('express');
const { recipeController } = require('../controllers/recipe.controller');
const recipeRouter = express.Router();

recipeRouter.post('/add',recipeController.addRecipe);
recipeRouter.get('/allrecipes',recipeController.getAllRecipes); 
recipeRouter.get('/:id',recipeController.getRecipeById);
recipeRouter.put('/update/:id',recipeController.updateRecipe); 
recipeRouter.delete('/:id',recipeController.deleteRecipe);
recipeRouter.post('/match',recipeController.getMatchedRecipes);

module.exports = {recipeRouter}