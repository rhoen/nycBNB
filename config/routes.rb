Rails.application.routes.draw do
  root "sessions#new"
  resources :app, only: [:new]
  resources :users, only: [:new, :create]
  resource :sessions, only: [:new, :create, :destroy]

  get "api/users/curr_user" => "api/users#curr_user"

  namespace :api do
    resources :listings, only: [:create, :destroy, :index, :show, :update]
    resources :users, only: [:show, :update]
  end

end
