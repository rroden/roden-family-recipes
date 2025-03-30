class RecipeSubcategoriesController < ApplicationController
  def index
    @recipe_subcategories = RecipeSubcategory.all
    render json: @recipe_subcategories
  end
  def create
    recipe_subcategory = RecipeSubcategory.create!(recipe_subcategory_params)
    if recipe_subcategory
      render json: recipe_subcategory
    else
      render json: recipe_subcategory.errors
    end
  end

  def show
  end

  private
  def recipe_subcategory_params
    params.permit(:name, :recipe_category_id)
  end
end
