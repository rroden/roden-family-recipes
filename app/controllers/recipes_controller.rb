class RecipesController < ApplicationController
  before_action :set_recipe, only: %i[show edit update]

  def index
    recipes = Recipe.all.order("LOWER(name)")
    render json: recipes.map {|recipe| recipe_json(recipe) }
  end

  def create
    # Exclamation point raises an error
    recipe = Recipe.create!(recipe_params)
    if recipe
      render json: recipe_json(recipe)
    else
      render json: recipe.errors
    end
  end

  def show
    render json: recipe_json(@recipe)
  end

  def destroy
  end

  def edit
  end

  def update
    if @recipe.update!(recipe_params)
      render json: recipe_json(@recipe)
    else
      render json: @recipe.errors
    end
  end

  private

  def recipe_params
    params.require(:recipe).permit(:name, :ingredients, :instructions, :description,
                                   :notes, :cook_time, :servings, :preparation_time,
                                   :recipe_category_id, :recipe_subcategory_id, :photo)
  end

  def set_recipe
    @recipe = Recipe.find(params[:id])
  end

  def recipe_json(recipe)
    recipe.as_json.merge({
      photo_url: recipe.photo.attached? ? url_for(recipe.photo) : nil
    })
  end
end
