class RenameRecordCategoryIdToRecipeCategoryIdInRecipeSubcategories < ActiveRecord::Migration[8.0]
  def change
    remove_column :recipe_subcategories, :record_category_id
  end
end
