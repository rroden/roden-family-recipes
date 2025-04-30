import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { Recipe, RecipeFormData } from "../types/recipe_types";
import CheckMark from "../icons/CheckMark";
import { useAppContext } from "../../../context/AppContext";

interface RecipeFormProps {
    onSubmit: (data: RecipeFormData) => void;
    showDelete: boolean;
    handleDelete?: () => void;
    initialValues?: Recipe;
}

function RecipeForm(props: RecipeFormProps){
    const { register, handleSubmit, watch, formState: {errors}, reset } = useForm<RecipeFormData>();
    const hiddenInputRef = useRef(null);
    const { ref: registerRef } = register("photo");
    const selectedCategory = watch("recipe_category_id");
    const [initialPhotoName, setInitialPhotoName] = useState<string | null>(null);
    const { categories, subcategories } = useAppContext();

    const onUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        hiddenInputRef.current.click();
    };

    let photo = watch("photo");

    const getPhotoName = (photo: any, photo_url: string | null) => {
        if (photo && photo.length > 0) {
          return photo[0]?.name;
        } else if (photo_url) {
          return photo_url;
        }
        return null;
      };
      
    const photoName = getPhotoName(photo, initialPhotoName);

    useEffect(() => {
        reset(props.initialValues)
        if (props.initialValues && props.initialValues.photo_url){
            const nameFromUrl = props.initialValues?.photo_url?.split("/").at(-1);
            setInitialPhotoName(nameFromUrl);
        }
    }, [props.initialValues])

    return (
    <form onSubmit={handleSubmit(props.onSubmit)} className="create-recipe-form">
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
                if (String(subcategory.recipe_category_id) == selectedCategory){
                    return <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>
                }
                })}
            </select>
        </div>
        </div>
        {/* This is where the Upload Photo button starts */}
        <div className="row data-row justify-content-start">
        <button className="photo-button col-12 col-md-4" id="photo" onClick={(e) => onUpload(e)}>Upload Photo</button>
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
        {photoName &&
        <div className="row photo-name-row">
            <div className="col-4 d-flex flex-row gx-0">
                <CheckMark/>
                <p className="ms-2">{photoName}</p>
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
        {/* <div className="row data-row justify-content-end">
            <button type="submit" className="save-button col-12 col-md-4">Save</button>
        </div> */}
        <div className="d-flex justify-content-between flex-column flex-md-row data-row">
            {props.showDelete && <button onClick={props.handleDelete} type="button" className="save-button mb-2 mb-md-0 col-12 col-md-4">Delete</button> }
            <button type="submit" className="save-button col-12 col-md-4">Save</button>
        </div>
  </form>);
};

export default RecipeForm;