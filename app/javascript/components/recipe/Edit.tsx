import { useState, useEffect, useRef } from "react";
import CreateFormHeader from "./components/CreateFormHeader";
import CreatePageHeader from "./components/CreatePageHeader";
import { useNavigate, useParams } from "react-router-dom";
import { Category, Subcategory, type FormData, type Recipe } from "./types/recipe_types";
import RecipeForm from "./components/RecipeForm";

function Edit () {
    const params = useParams();
    const recipeId = params?.id;

    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([])
    
    const navigate = useNavigate();

    const [initialFormValues, setInitialFormValues] = useState<Recipe>();

    useEffect(() => {
      fetch("/recipe_categories")
        .then((response) => response.json())
        .then((data) => setCategories(data))
        .catch((error) => console.error("Error fetching categories:", error));
    }, []);

    useEffect(() => {
      fetch("/recipe_subcategories")
        .then((response) => response.json())
        .then((data) => {
          setSubcategories(data)
        })
        .catch((error) => console.error("Error fetching subcategories:", error));
    }, []);

    useEffect(() => {
      const token = (document.querySelector('meta[name="csrf-token"]' ) as HTMLMetaElement)?.content;
      let url = `/recipes/${recipeId}`;
      fetch(url, {
          method: "GET",
          headers: {
            "X-CSRF-Token": token,
            "Accept": "application/json"
          }
        })
          .then((response) => {
            if (response.ok) {
              console.log("Response was OK");
              return response.json();
            }
              throw new Error("Network response was not ok.");
          })
          .then((res) => {
              console.log(res);
              setInitialFormValues(res);
          })
          .catch((error) => console.log(error.message));
  }, [params.id, categories, subcategories])

    const handleDelete = () => {
      const url = `/recipes/${recipeId}`;
      const token = (document.querySelector('meta[name="csrf-token"]' ) as HTMLMetaElement)?.content;

      fetch(url, {
        method: "DELETE",
        headers: {
          "X-CSRF-Token": token
        }
      }).then((response) => {
        if (response.ok){
          navigate("/")
        }
        else {
          throw new Error("Response was not ok");
        }
      }).catch((error) => console.log(error.message))
    };

    const onSubmit = (data: FormData) => {    
      const url = `/recipes/${recipeId}`;
    
      // TODO: see if you can get rid of this
      if (!data.name || !data.ingredients || !data.instructions || !data.recipe_category_id) {
        console.log("Required field is missing");
        return;
      }
    
      const token = (document.querySelector('meta[name="csrf-token"]' ) as HTMLMetaElement)?.content;
      const formData = new FormData();
    
      // Append all text fields
      formData.append("recipe[name]", data.name);
      formData.append("recipe[recipe_category_id]", data.recipe_category_id);
      formData.append("recipe[description]", data.description || "");
      formData.append("recipe[recipe_subcategory_id]", data.recipe_subcategory_id || "");
      formData.append("recipe[ingredients]", data.ingredients);
      formData.append("recipe[instructions]", data.instructions);
      formData.append("recipe[notes]", data.notes || "");
      formData.append("recipe[preparation_time]", data.preparation_time || "");
      formData.append("recipe[cook_time]", data.cook_time || "");
      formData.append("recipe[servings]", data.servings || "");
    
      // Append photo if selected
      if (data.photo && data.photo[0]) {
        formData.append("recipe[photo]", data.photo[0]);
      }
    
      fetch(url, {
        method: "PATCH",
        headers: {
          "X-CSRF-Token": token
        },
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            console.log("Response was OK");
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((response) => navigate(`/recipes/${response.id}`))
        .catch((error) => console.log(error.message));
    };
    
    return (
        <div className="create-page-background">
          <div className="overlay"></div>
          <CreatePageHeader/>
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="create-recipe-grid col-10 container">
            <CreateFormHeader title="Edit Recipe"/>
            <RecipeForm initialValues={initialFormValues} showDelete={true} handleDelete={handleDelete} onSubmit={onSubmit} categories={categories} subcategories={subcategories}/>
          </div>
        </div>
    </div>
)};

export default Edit;