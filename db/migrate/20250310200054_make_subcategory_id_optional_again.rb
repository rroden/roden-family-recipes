class MakeSubcategoryIdOptionalAgain < ActiveRecord::Migration[8.0]
  def change
    add_reference :recipes, :recipe_subcategory, null: true, foreign_key: true
  end
end
