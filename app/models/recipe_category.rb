class RecipeCategory < ApplicationRecord
  has_many :recipe_subcategories
  has_many :recipes
  validates :name, presence: true
end
