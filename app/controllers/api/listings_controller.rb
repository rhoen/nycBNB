module Api
  class ListingsController < ApiController
    def create
      listing = Listing.new listing_params
      listing.owner = current_user
      if listing.save
        render json: listing
      else
        render json: listing.errors.full_messages,
          status: :unproccessable_entity
      end

    end

    def update
      listing = Listing.find(params[:id])
      if is_current_user_listing_owner?(listing)
        if listing.update(listing_params)
          render json: listing
        else
          render json: listing.errors.full_messages, status: :unprocessable_entity
        end
      else
        render json: "that is not your listing",
          status: :unprocessable_entity
      end
    end

    def destroy
      listing = Listing.find(params[:id])
      if is_current_user_listing_owner?(listing)
        listing.destroy
        render json: true
      else
        render json: "that is not your listing"
      end
    end

    def index
      if params[:query] && params[:query] == "current_user"
        listings = Listing.where("owner_id = ?", current_user.id)
      else
        listings = Listing.all
      end
      render json: listings
    end

    def show
      @listing = Listing.find(params[:id])
      render "listings/show"
    end

    private
    def listing_params
      params.require(:listing).permit(
        :street_address, :city, :state, :zip,
        :room_type, :guest_limit, :price_per_night,
        :title, :home_type, :description, :active)
    end

  end
end
