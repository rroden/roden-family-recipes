class Recipe < ApplicationRecord
  belongs_to :recipe_category
  belongs_to :recipe_subcategory, optional: true
  has_one_attached :photo
  validates :name, presence: true
  validates :instructions, presence: true
  validates :ingredients, presence: true
end
