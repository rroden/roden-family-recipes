class AddSubcategoryBack < ActiveRecord::Migration[8.0]
  def change
    remove_reference :recipes, :recipe_subcategories
  end
end
