Rails.application.routes.draw do
  root "sessions#new"
  resources :users, only: [:new, :create]
  resource :sessions, only: [:new, :create]
end
