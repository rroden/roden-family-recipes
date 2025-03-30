class MakeSubcategoryIdOptional < ActiveRecord::Migration[8.0]
  def change
    remove_column :recipes, :recipe_subcategory_id
  end
end
