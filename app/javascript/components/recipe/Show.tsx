import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Clock from "./icons/Clock";
import Utensils from "./icons/Utensils";
import { getRecipe } from "../api/recipes";
import { Recipe } from "./types/recipe_types";

function Show() {
    const params = useParams();
    const recipeId = params?.id;

    let [recipe, setRecipe] = useState<Recipe>();
    let navigate = useNavigate();

    const handleEditRecipe = () => {
        navigate(`/recipes/${recipeId}/edit`)
    }

    useEffect(() => {

        const getData = async() => {
            try {
                let response = await getRecipe(recipeId)
                setRecipe(response);
            }
            catch (error) {
                console.log(error.message)
            }
        }

        getData();

    }, [params.id])

    return(
        <div className="jumbotron jumbotron-fluid bg-transparent">
            <div className="create-recipe-grid col-10 container">
                {recipe && 
                <div className="show-recipe-form">
                    <div className="row mobile-row">
                        {/* col-auto takes only the space it needs */}
                        <div className="col-auto img-div"> 
                            <img
                                width={200}
                                height={200}
                                src={recipe.photo_url}
                                className="recipe-photo"
                            />
                        </div>
                        <div className="col-12 col-md-5 col-xl-6 d-flex flex-column mobile-row">
                            <h1>{recipe.name}</h1>
                            <p className="description">{recipe.description}</p>
                        </div>
                        <div className="col-12 col-lg d-flex flex-column">
                            <div className="row prep-time-rows">
                                <div className="col-auto">
                                    <Clock/>
                                </div>
                                <label htmlFor="preparation_time" className="col-auto gx-0">Prep Time:</label>
                                <p className="col data-fields" id="preparation_time">{recipe.preparation_time}</p>
                            </div>
                            {/* ToDo: Make the rows the same height -- and make sure the padding looks good */}
                            <div className="row prep-time-rows">
                                <div className="col-auto">
                                    <Clock/>
                                </div>
                                {/* gx-0 removes the gutter horizontally */}
                                <label htmlFor="cook_time" className="col-auto gx-0">Cook Time:</label>
                                <p id="cook_time" className="col data-fields">{recipe.cook_time}</p>
                            </div>
                            <div className="row prep-time-rows">
                                <div className="col-auto">
                                    <Utensils/>
                                </div>
                                <label htmlFor="servings" className="col-auto gx-0">Servings:</label>
                                <p id="servings" className="col data-fields">{recipe.servings}</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <label htmlFor="ingredients" className="ingredients-label">Ingredients:</label>
                        <div id="ingredients" className="ingredients">{recipe.ingredients}</div>
                    </div>
                    <div className="row">
                        <label htmlFor="instructions" className="ingredients-label">Instructions:</label>
                        <div id="instructions" className="instructions">{recipe.instructions}</div>
                    </div>
                    <div className="row">
                        <label htmlFor="notes" className="ingredients-label">Notes:</label>
                        <p id="notes">{recipe.notes}</p>
                    </div>
                    <div className="row data-row justify-content-end">
                        <button className="save-button col-12 col-md-4" onClick={handleEditRecipe}>Edit Recipe</button>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Show;