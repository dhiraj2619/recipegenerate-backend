const Recipe = require("../models/recipe.model")

const recipeController = {
    addRecipe: async (req, res) => {
        try {
            const recipe = new Recipe(req.body);
            await recipe.save();
            res.status(201).json({ message: "recipe added successfully", recipe })
        } catch (error) {
            res.status(400).json({ message: 'Error adding recipe', error });
        }
    },
    getRecipeById: async (req, res) => {
        try {
            const { id } = req.params;
            const recipe = await Recipe.findById(id);

            if (!recipe) {
                res.status(404).json({ message: "Recipe not Found" });
            }
            res.json(recipe);
        } catch (error) {
            res.status(400).json({ message: 'Error fetching recipe', error });
        }
    },
    updateRecipe:async(req,res)=>{
        try {
             const {id} = req.params;

             const updatedRecipe = await Recipe.findByIdAndUpdate(id,req.body,{new:true});

             if(!updatedRecipe){
                return res.status(404).json({ message: 'Recipe not found' });
             }
             res.json(updatedRecipe);
        } catch (error) {
            res.status(400).json({ message: 'Error updating recipe', error });
        }
    },
    deleteRecipe:async(req,res)=>{
        try {
            const { id } = req.params;
            const deletedRecipe = await Recipe.findByIdAndDelete(id);
            if (!deletedRecipe) {
              return res.status(404).json({ message: 'Recipe not found' });
            }
            res.json({ message: 'Recipe deleted successfully' });
          } catch (error) {
            res.status(400).json({ message: 'Error deleting recipe', error });
          }
    },
    getAllRecipes:async(req,res)=>{
        try {
            const recipes = await Recipe.find();
            res.status(200).json({message:"recipe fetched successfully",status:200,recipes});
          } catch (error) {
            console.error("Error fetching recipies:", error);
          }
    }
}

module.exports = { recipeController }