module Api
  class ApiController < ApplicationController
    before_action :require_logged_in

    private
    def require_logged_in
      unless logged_in?
        render json: ["You must be signed in to perform that action!"],
          status: :unauthorized
      end
    end
    def require_listing_owner(listing_id)
      unless Listing.find(listing_id).owner == current_user
        render json: "You are not the listing owner"
      end
    end
  end
end
