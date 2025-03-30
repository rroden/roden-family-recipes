class CreateRecipeSubcategories < ActiveRecord::Migration[8.0]
  def change
    create_table :recipe_subcategories do |t|
      t.string :name
      t.references :record_category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
