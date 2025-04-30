interface BaseRecipe {
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
}
export interface RecipeFormData extends BaseRecipe {
    photo: FileList
}

export interface Recipe extends BaseRecipe {
    photo_url: string
}

export type Category = {
    name: string
    id: number
}

export type Subcategory = {
    name: string
    id: number
    recipe_category_id: number   
}