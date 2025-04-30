import { useState, useEffect } from "react";
import CreateFormHeader from "./components/CreateFormHeader";
import { useNavigate, useParams } from "react-router-dom";
import { type RecipeFormData, type Recipe } from "./types/recipe_types";
import RecipeForm from "./components/RecipeForm";
import { deleteRecipe, getRecipe, patchRecipe } from "../api/recipes";
import { prepareFormData } from "./helpers/formHelpers";
import { useAppContext } from "../../context/AppContext";

function Edit () {
    const params = useParams();
    const recipeId = params?.id;

    const { categories, subcategories } = useAppContext();
    
    const navigate = useNavigate();

    const [initialFormValues, setInitialFormValues] = useState<Recipe>();

    useEffect(() => {

      const getData = async() => {
        try {
          let response = await getRecipe(recipeId)
          setInitialFormValues(response);
        }
        catch (error) {
          console.log(error.message)
        }
      }

      getData();

  }, [params.id, categories, subcategories])

    const handleDelete = () => {
      const destroyRecipe = async() => {
        try {
          let response = await deleteRecipe(recipeId)
          if (response){
            navigate("/")
          }
          else {
            throw new Error("Response was not ok");
          }
        }
        catch (error) {
          console.log(error.message)
        }
      }

      destroyRecipe();
    };

    const onSubmit = (data: RecipeFormData) => {    
    
      const formData = prepareFormData(data);

      const patchData = async() => {
        try {
          let response = await patchRecipe(formData, recipeId)
          navigate(`/recipes/${response.id}`)
        }
        catch (error) {
          console.log(error.message)
        }
      }

      patchData();
    };
    
    return (
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="create-recipe-grid col-10 container">
          <CreateFormHeader title="Edit Recipe"/>
          <RecipeForm initialValues={initialFormValues} showDelete={true} handleDelete={handleDelete} onSubmit={onSubmit}/>
        </div>
      </div>
)};

export default Edit;