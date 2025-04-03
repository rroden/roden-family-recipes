class RecipesController < ApplicationController
  def index
  end
  def create
    # Exclamation point raises an error
    recipe = Recipe.create!(recipe_params)
    if recipe
      render json: recipe
    else
      render json: recipe.errors
    end
  end

  def show
  end

  def destroy
  end

  private

  def recipe_params
    params.require(:recipe).permit(:name, :ingredients, :instructions, :description, 
                                   :notes, :cook_time, :servings, :preparation_time, 
                                   :recipe_category_id, :recipe_subcategory_id, :photo)
  end
end
