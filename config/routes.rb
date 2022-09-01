Rails.application.routes.draw do
  get 'sessions/create'
  get 'sessions/destroy'
  resources :tickets, only: [:create]
  resources :users, only: [:show, :create]
  # resources :cast_members
  resources :productions, only: [ :index, :show, :create, :update, :destroy]
  # Custome Route
  post "/login", to: "sessions#create" 
  delete "/logout", to: "sessions#destroy"
  get "/me", to: "users#show"



  

end
