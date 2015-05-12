Rails.application.routes.draw do
  root "sessions#new"
  resources :users, only: [:new]
  resource :sessions, only: [:new]
end
