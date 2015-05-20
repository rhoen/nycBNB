module Api
  class ListingPhotosController < ApiController
    def create
      listing = Listing.find(params[:listing_photo][:listing_id])
      if is_current_user_listing_owner?(listing)
        photo = ListingPhoto.new(listing_photo_params)
        if photo.save
          render json: photo
        else
          #500?
          render json: "uh oh, went wrong!", status: 500
        end
      else
        render json: "not your listing", status: :unprocessable_entity
      end
    end

    def destroy
      listing_photo = ListingPhoto.find(params[:id])
      if is_current_user_listing_owner?(listing)
        listing_photo.destroy
        render json: success!
      else
        render json: "not your photo", status: :unprocessable_entity
      end
    end

    def listing_photo_params
      params.require(:listing_photo).permit(:listing_id, :photo)
    end
  end
end
