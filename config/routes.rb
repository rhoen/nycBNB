Rails.application.routes.draw do
  resources :users, only: [:new]
  resource :sessions, only: [:new]
end
