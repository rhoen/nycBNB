module Api
  class ListingsController < ApiController
    def create
      listing = Listing.new listing_params
      listing.owner = current_user
      if listing.save
        render json: listing
      else
        render json: listing.errors.full_messages
      end

    end

    def update
      listing = Listing.find(params[:id])
      if listing.owner == current_user
        listing.update(listing_params)
        render json: listing
      else
        render json: "that is not your listing", status: :unprocessable_entity
      end
    end

    def destroy
      listing = Listing.find(params[:id])
      listing.destroy
      render json: true
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
      listing = Listing.find(params[:id])
      render json: listing
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
