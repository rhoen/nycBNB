module Api
  class ListingPhotosController < ApiController
    def create
      listing = Listing.find(params[:listing_photo][:listing_id])
      if is_current_user_listing_owner?(listing)
        render json: "you did it!"
      else
        render json: "not your listing"
      end
    end

    def destroy

    end

    def listing_photo_params
      params.require(:listing_photo).permit(:listing_id, :photo)
    end
  end
end
