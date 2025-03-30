class CreateRecipes < ActiveRecord::Migration[8.0]
  def change
    create_table :recipes do |t|
      t.string :name
      t.string :description
      t.references :recipe_category, null: false, foreign_key: true
      t.references :recipe_subcategory, null: false, foreign_key: true
      t.string :ingredients
      t.string :instructions
      t.string :notes
      t.string :preparation_time
      t.string :cook_time
      t.string :servings
      t.string :added_by

      t.timestamps
    end
  end
end
