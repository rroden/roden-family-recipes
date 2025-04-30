export const getRecipeCategories = async () => {
    let response = await fetch("/recipe_categories")
    return response.json();
};