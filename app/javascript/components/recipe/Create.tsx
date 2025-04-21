import { useState, useEffect, useRef } from "react";
import CreateFormHeader from "./components/CreateFormHeader";
import CreatePageHeader from "./components/CreatePageHeader";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CheckMark from "./icons/CheckMark";

type FormData = {
  name: string
  recipe_category_id: string
  description: string
  recipe_subcategory_id: string
  ingredients: string
  instructions: string
  notes: string
  preparation_time: string
  cook_time: string
  servings: string
  photo: any
}

function Create () {
    const { register, handleSubmit, watch, formState: {errors} } = useForm<FormData>();
    const hiddenInputRef = useRef();
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([])
    const { ref: registerRef } = register("photo");

    const selectedCategory = watch("recipe_category_id");
    const navigate = useNavigate();

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

    const onUpload = (e: Event) => {
      e.preventDefault();
      hiddenInputRef.current.click();
    };

    let photo = watch("photo");

    const onSubmit = (data: FormData) => {    
      const url = "/recipes";
    
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
        method: "POST",
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
        .then((response) => navigate(`/recipe/${response.id}`))
        .catch((error) => console.log(error.message));
    };
    
    return (
        <div className="create-page-background">
          <div className="overlay"></div>
          <CreatePageHeader/>
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="create-recipe-grid col-10 container">
            <CreateFormHeader title="Add a Recipe"/>
            {/* The Form: */}
            <form onSubmit={handleSubmit(onSubmit)} className="create-recipe-form">
              {/* First row - name & category */}
              <div className="row data-row">
                <div className="col-12 col-md-6 d-flex flex-column name-col gx-0 gx-md-3">
                  <label htmlFor="name" className="col-6 form-label">
                    Name: 
                  </label>
                  <input
                    {...register("name", {required: "Name is required", maxLength: {value: 50, message: "Title cannot be longer than 50 characters"}})}
                    id="name"
                    className="name-text-background"
                  />
                  <div className="text-danger">{errors.name?.message as string}</div>
                </div>
                <div className="col-12 col-md-6 d-flex flex-column gx-0 gx-md-3">
                  <label htmlFor="category" className="category-dropdown col">
                    Category:
                  </label>
                  <select 
                    {...register("recipe_category_id", {required: "Category is required"})} 
                    className="dropdown col" 
                    id="category" 
                  >
                      <option value="">Select a category</option>
                      {categories.map((category) => {
                        return <option key={category.id} value={category.id}>{category.name}</option>
                      }) }
                  </select>
                  <div className="text-danger">{errors.recipe_category_id?.message as string}</div>
                </div>
              </div>
              {/* Second row: */}
              <div className="row data-row">
                <div className="col-12 col-md-6 d-flex flex-column description-col gx-0 gx-md-3">
                  <label htmlFor="description" className="col-6 align-items-stretch form-label">
                    Description: 
                  </label>
                  <textarea 
                    {...register("description", {maxLength: {value: 200, message: "Description cannot be longer than 200 characters"}})}
                    id="description" 
                    className="description-text-background"
                  />
                  <div className="text-danger">{errors.description?.message as string}</div>
                </div>
                <div className="col-12 col-md-6 d-flex flex-column gx-0 gx-md-3">
                  <label htmlFor="subcategory" className="category-dropdown col">
                    Subcategory:
                  </label>
                  <select 
                    {...register("recipe_subcategory_id")}
                    className="dropdown col" 
                    id="subcategory" 
                    >
                      <option value="">Select a subcategory</option>
                      {subcategories.map((subcategory) => {
                        if (subcategory.recipe_category_id == selectedCategory){
                          return <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                        }
                      })}
                  </select>
                </div>
              </div>
              {/* This is where the Upload Photo button starts */}
              <div className="row data-row justify-content-start">
                <button className="photo-button col-12 col-md-4" id="photo" onClick={onUpload}>Upload Photo</button>
                <input 
                  {...register("photo")} 
                  hidden={true}
                  id="photo" 
                  name="photo" 
                  type="file"
                  accept="image/*"
                  ref={(e) => {
                    registerRef(e);
                    hiddenInputRef.current = e;
                  }}
                >
                </input>
              </div>
              {photo && photo[0]?.name && 
                <div className="row photo-name-row">
                    <div className="col-4 d-flex flex-row gx-0">
                      <CheckMark/>
                      <p className="ms-2">{photo[0].name}</p>
                    </div>
                </div> 
              }
              {/* Beginning of ingredients section */}
              <label htmlFor="ingredients" className="row data-row">
                  Ingredients: 
                  <textarea 
                      {...register("ingredients", {required: "Ingredients are required", maxLength: {value: 1000, message: "Ingredients cannot exceed 1000 characters"}})}
                      id="ingredients" 
                      className="large-text-field"
                  />
                  <div className="text-danger">{errors.ingredients?.message as string}</div>
              </label>
              <label htmlFor="instructions" className="row data-row">
                  Instructions: 
                  <textarea 
                      {...register("instructions", {required: "Instructions are required", maxLength: {value: 1000, message: "Instructions cannot exceed 1000 characters"}})}
                      id="instructions" 
                      className="large-text-field"
                  />
                  <div className="text-danger">{errors.instructions?.message as string}</div>
              </label>
              <label htmlFor="notes" className="row data-row">
                  Notes: 
                  <textarea 
                      {...register("notes", {maxLength: {value: 1000, message: "Notes cannot exceed 1000 characters"}})}
                      id="notes" 
                      className="large-text-field"
                  />
                  <div className="text-danger">{errors.notes?.message as string}</div>
              </label>
              <div className="row">
                <div className="col-12 col-lg-4 d-flex flex-column">
                  <label htmlFor="prepTime" className="col prep-row-label">
                      Prep Time: 
                  </label>
                  <input 
                    {...register("preparation_time", {maxLength: {value: 30, message: "Prep time cannot exceed 30 characters"}})} 
                    id="prepTime" 
                    className="text-background" 
                    ></input>
                  <div className="text-danger">{errors.preparation_time?.message as string}</div>
                </div>
                <div className="col-12 col-lg-4 d-flex flex-column">
                  <label htmlFor="cookTime" className="col prep-row-label">
                      Cook Time: 
                  </label>
                  <input 
                    {...register("cook_time", {maxLength: {value: 30, message: "Cook time cannot exceed 30 characters"}})} 
                    id="cookTime" 
                    className="text-background" 
                    >
                  </input>
                  <div className="text-danger">{errors.cook_time?.message as string}</div>
                </div>
                <div className="col-12 col-lg-4 d-flex flex-column">
                  <label htmlFor="servings" className="col prep-row-label">
                      Servings: 
                  </label>
                  <input 
                    {...register("servings")} 
                    id="servings" 
                    className="text-background" 
                    type="number" 
                  ></input>
                </div>
              </div>
              <div className="row data-row justify-content-end">
                <button type="submit" className="save-button col-12 col-md-4">Save</button>
              </div>
            </form>
          </div>
        </div>
    </div>
)};

export default Create;