module Api
  class ListingPhotosController < ApiController
    def create
      listing = Listing.find(params[:listing_photo][:listing_id])
      if is_current_user_listing_owner?(listing)
        @photo = ListingPhoto.new(listing_photo_params)
        if @photo.save
          render "photos/photo"
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
      if is_current_user_listing_owner?(listing_photo.listing)
        listing_photo.destroy
        render json: listing_photo
      else
        render json: "not your photo", status: :unprocessable_entity
      end
    end

    def update
      listing_photo = ListingPhoto.find(params[:id])
      if listing_photo_params[:primary_photo]
        listing_photo.set_as_primary
      end
      render json: "primary photo updated"
    end

    private
    def listing_photo_params
      params.require(:listing_photo).permit(:listing_id, :photo, :primary_photo)
    end

  end
end
