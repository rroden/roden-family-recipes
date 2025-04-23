class Recipe < ApplicationRecord
  belongs_to :recipe_category
  belongs_to :recipe_subcategory, optional: true
  has_one_attached :photo
  validates :name, presence: true
  validates :instructions, presence: true
  validates :ingredients, presence: true
  after_initialize :set_default_photo

  def set_default_photo
    unless self.photo.attached?
      self.photo.attach(io: File.open(Rails.root.join("app/assets/images/recipe_placeholder.jpg")), filename: "recipe_placeholder.jpg", content_type: "image/jpg")
    end
  end
end
