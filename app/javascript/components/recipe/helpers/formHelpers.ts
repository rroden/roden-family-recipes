import { RecipeFormData } from "../types/recipe_types";

export const prepareFormData = (data: RecipeFormData): FormData => {
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

    return formData;
}