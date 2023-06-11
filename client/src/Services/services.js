import axios from "axios";
const serverBaseUrl = 'http://localhost:3040'


//Users Service
const registerUser = async(payload) => {
    try {
        const {data} = await axios.post(`${serverBaseUrl}/auth/register`, payload);
        return {message: data?.message || "Registration Successful", status: 200}
    }catch (e) {
        return {error: e.message}
    }
}
const login = async(payload) => {
    try {
        const {data} = await axios.post(`${serverBaseUrl}/auth/login`, payload);
        return {data, message: data?.message || "Login Successful", status: 200}
    }catch (e) {
        return {error: e.message}
    }
}

/*End of user service*/
//Recipes Service
const getAllRecipes = async() => {
    try {
        const {data} = await axios.get(`${serverBaseUrl}/recipes`);
        return {data, status: 200}
    }catch (e) {
        return {error: e.message}
    }
}
const createRecipe = async(payload, access_token) => {
    try {
        const {data} = await axios.post(`${serverBaseUrl}/recipes`, payload, {headers: {authorization: access_token}});
        return {data, status: 200}
    }catch (e) {
        return {error: e.message}
    }
}

//Save Recipe
const saveRecipe = async(payload, headers) => {
    try {
        const {data} = await axios.put(`${serverBaseUrl}/recipes`, payload, headers);
        return {data, status: 200}
    }catch (e) {
        return {error: e.message}
    }
}

//Get Saved Recipe
const getSavedRecipes = async(userID, onlyIds) => {
    try {
        const {data} = await axios.get(`${serverBaseUrl}/recipes/savedRecipes/${onlyIds ? 'ids/' : ''}${userID}`);
        return {data, status: 200}
    }catch (e) {
        return {error: e.message}
    }
}
/*End of recipes service*/

export {registerUser, login, getAllRecipes, createRecipe, saveRecipe, getSavedRecipes}