Rails.application.routes.draw do
  get "homepage/index"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  get "*path", to: "homepage#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  root "homepage#index"
  get "/recipes", to: "recipes#index"
  get "recipes/new", to: "recipes#new"
  post "/recipes", to: "recipes#create"
  get "/recipes/:id", to: "recipes#show"
  get "/recipes/:id/edit", to: "recipes#edit"
  patch "/recipes/:id", to: "recipes#update"

  get "/recipe_categories", to: "recipe_categories#index"
  get "recipe_categories/new", to: "recipe_categories#new"
  post "/recipe_categories", to: "recipe_categories#create"
  get "/recipe_categories/:id", to: "recipe_categories#show"

  get "/recipe_subcategories", to: "recipe_subcategories#index"
  get "recipe_subcategories/new", to: "recipe_subcategories#new"
  post "/recipe_subcategories", to: "recipe_subcategories#create"
  get "/recipe_subcategories/:id", to: "recipe_subcategories#show"
end
