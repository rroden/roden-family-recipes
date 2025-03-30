class RecipeCategoriesController < ApplicationController
  before_action :set_recipe_category, only: %i[show]
  def index
    @recipe_categories = RecipeCategory.all
    render json: @recipe_categories
  end

  def create
    recipe_category = RecipeCategory.create!(recipe_category_params)
    if recipe_category
      render json: recipe_category
    else
      render json: recipe_category.errors
    end
  end

  def show
    render json: @recipe_category
  end

  private
  def recipe_category_params
    params.permit(:name)
  end

  def set_recipe_category
    @recipe_category = RecipeCategory.find(params[:id])
  end
end
