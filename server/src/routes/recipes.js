const express = require('express');
const recipesRouter = express.Router();
const RecipeModel = require('../models/Recipes')
const UserModel = require("../models/Users");
const verifyToken = require('./common')
// Get all recipes
recipesRouter.get('/', async(req, res)=>{
    try{
        const response = await RecipeModel.find({})
        res.status(200).json(response)
    }catch(e) {
        res.json(e)
    }
})
// Create New Recipe
recipesRouter.post('/', verifyToken ,async(req, res)=>{
    const recipe = new RecipeModel(req.body)
    try{
        const response = await recipe.save()
        res.status(200).json(response)
    }catch(e) {
        res.json(e)
    }
})

// Update Recipe to User Recipes
recipesRouter.put('/', verifyToken, async(req, res)=>{
     try{
         console.log('----after verify put recipe')
         const recipe = await RecipeModel.findById(req.body.recipeID)
        console.log('---recipe after fetch', recipe)
         const user = await UserModel.findById(req.body.userID)
         user.savedRecipes.push(recipe);
         await user.save()
        res.status(200).json({savedRecipes: user.savedRecipes})
    }catch(e) {
        res.json(e)
    }
})

recipesRouter.get('/savedRecipes/ids/:userID', async(req, res)=>{
    try{
        const user = await UserModel.findById(req.params.userID);
        res.json({savedRecipes: user?.savedRecipes})
    }catch (e) {
        res.json(e)
    }
})
//Get saved recipes for given user id
recipesRouter.get('/savedRecipes/:userID', async(req, res)=>{
    try{
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipeModel.find({
            _id: {$in: user.savedRecipes}
        })
        res.json({ savedRecipes })
    }catch (e) {
        res.json(e)
    }
})
module.exports=recipesRouter;