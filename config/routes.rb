Rails.application.routes.draw do
  root "sessions#new"
  resources :app, only: [:new]
  resources :users, only: [:new, :create]
  resource :sessions, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :users do
      member do
        get :curr_user
      end
    end
  end


end
