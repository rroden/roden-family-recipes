import CreateFormHeader from "./components/CreateFormHeader";
import { useNavigate } from "react-router-dom";
import type { RecipeFormData } from "./types/recipe_types";
import RecipeForm from "./components/RecipeForm";
import { postRecipe } from "../api/recipes";
import { prepareFormData } from "./helpers/formHelpers";

function Create () {
    const navigate = useNavigate();

    const onSubmit = (data: RecipeFormData) => {    

      const formData = prepareFormData(data);
    
      const postData = async() => {
        try {
          let response = await postRecipe(formData)
          navigate(`/recipes/${response.id}`)
        }
        catch (error) {
          console.log(error.message)
        }
      }

      postData();
    };
    
    return (
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="create-recipe-grid col-10 container">
          <CreateFormHeader title="Add a Recipe"/>
          <RecipeForm showDelete={false} onSubmit={onSubmit}/>
        </div>
      </div>
)};

export default Create;