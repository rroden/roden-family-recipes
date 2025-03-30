class AddRecipeCategoryToSubcategory < ActiveRecord::Migration[8.0]
  def change
    add_reference :recipe_subcategories, :recipe_category, null: false, foreign_key: true
  end
end
