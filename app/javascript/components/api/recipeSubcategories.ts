export const getRecipeSubcategories = async () => {
    let response = await fetch("/recipe_subcategories")
    return response.json();
};