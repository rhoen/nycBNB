module Api
  class ApiController < ApplicationController
    # before_action :require_logged_in

    private
    def require_logged_in
      unless logged_in?
        render json: ["You must be signed in to perform that action!"],
          status: :unauthorized
      end
    end
    def is_user_listing_owner?(user, listing)
      if listing.owner == user
        true
      else
        false
      end
    end

    def is_current_user_listing_owner?(listing)
      if listing.owner == current_user
        true
      else
        false
      end
    end
  end
end
