require("dotenv").config()
const express = require('express');
const path = require("path");
const cors = require('cors');
const mongoose = require('mongoose');

const userRouter= require('./routes/users')
const recipesRouter= require('./routes/recipes')

const app = express();
const port=process.env.SERVER_PORT || 3040

app.use('/bundle', express.static(path.join(__dirname, '../client/dist')))
app.use(express.json());
app.use(cors());
app.use('/auth', userRouter);
app.use('/recipes', recipesRouter);

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@recipes.cbjcm98.mongodb.net/recipes?retryWrites=true&w=majority`)

app.listen(port, () => console.log('Server has started on port:', port))