import {useEffect, useState} from "react";
import * as Services from "../Services/services";
import RecipeReviewCard from '../components/RecipeCard'
import {Grid} from "@mui/material";
import {useGetUserID} from "../hooks/useGetUserID";

export const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const userID = useGetUserID()

    useEffect(() => {
        const fetchSavedRecipes = async() => {
            try{
                const response = await Services.getSavedRecipes(userID);
                setSavedRecipes(response.data.savedRecipes);
            }catch(err) {
                console.log('Fetch Recipes error: ', err)
            }
        }
        fetchSavedRecipes()
    }, [])

    return (
        <Grid sx={{ width: '97%'}} m={2} container rowSpacing={3} columnSpacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
            {savedRecipes?.map((recipe, idx)=> (
                <Grid item key={recipe._id} xs={3}>
                    <RecipeReviewCard Recipe={recipe} fromSavedRecipes/>
                </Grid>
            ))}
        </Grid>
    )
}
