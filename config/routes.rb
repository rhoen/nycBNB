Rails.application.routes.draw do
  root "sessions#new"
  resources :app, only: [:new]
  resources :users, only: [:new, :create]
  resource :sessions, only: [:new, :create, :destroy]


  namespace :api, defaults: {format: :json} do
    get "users/curr_user" => "users#curr_user"
    resources :listings, only: [:create, :destroy, :index, :show, :update]
    resources :users, only: [:show, :update]
    resources :listing_photos, only: [:create, :destroy, :update]
    resources :trips, only: [:show, :update, :index, :create, :destroy]
    get "listings/:id/listing_photos" => "listings#listing_photos"
  end

end
