Rails.application.routes.draw do
  root "sessions#new"
  resources :app, only: [:new]
  resources :users, only: [:new, :create]
  resource :sessions, only: [:new, :create, :destroy]

  get "api/users/curr_user" => "api/users#curr_user"
end
