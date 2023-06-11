import {useEffect, useState} from "react";
import * as Services from "../Services/services";
import RecipeReviewCard from '../components/RecipeCard'
import {Box, Grid} from "@mui/material";
import {useGetUserID} from "../hooks/useGetUserID";
import {useCookies} from "react-cookie";
import {saveRecipe} from "../Services/services";

export const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const userID = useGetUserID()
    const [cookies, _] = useCookies("access_token")

    useEffect(() => {
        const fetchRecipes = async() => {
            try{
                const response = await Services.getAllRecipes();
                setRecipes(response.data);
            }catch(err) {
                console.log('Fetch Recipes error: ', err)
            }
        }
        const fetchSavedRecipes = async() => {
            try{
                const response = await Services.getSavedRecipes(userID, true);
                setSavedRecipes(response?.data?.savedRecipes || []);
            }catch(err) {
                console.log('Fetch Recipes error: ', err)
            }
        }
        fetchRecipes()
        fetchSavedRecipes()
    }, [])

    const handleSaveRecipe = async(Recipe) => {
        const response = await saveRecipe({recipeID: Recipe._id, userID}, {headers: {
             authorization: cookies.access_token
            }})
        console.log('---saved recipe respones---', response)
    }
    const isRecipeSaved = (id) => savedRecipes?.includes(id)
    return (
        <Box p={3}>
            <Grid sx={{ width: '100%'}} container rowSpacing={3} columnSpacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                {recipes?.map((recipe, idx)=> (
                    <Grid item key={recipe._id} xs={4} md={3}>
                        <RecipeReviewCard Recipe={recipe} isRecipeSaved={isRecipeSaved} handleSaveRecipe={handleSaveRecipe}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
