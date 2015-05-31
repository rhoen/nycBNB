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
      if params[:query] == "current_user"
        @listings = Listing.where("owner_id = ?", current_user.id)
      elsif params[:query][:listing]
        query = params[:query][:listing]
        boundaries = query[:boundaries]
        low = query[:low_price]
        high = query[:high_price]
        page = query[:page]

        low_price = (low == "" ? 0 : low)
        high_price = (high == "" ? 10000 : high)
        room_types = query[:room_type] || Listing.room_types

        binds = {
          :lat_min => boundaries['lat'][0],
          :lat_max => boundaries['lat'][1],
          :lng_min => boundaries['lng'][0],
          :lng_max => boundaries['lng'][1]
        }

        if binds[:lng_min].to_f > binds[:lng_max].to_f
          # Wrap around the International Date Line
          @listings = Listing.where(<<-SQL, binds)
            listings.longitude BETWEEN :lng_min AND 180
              OR listings.longitude BETWEEN -180 AND :lng_max
          SQL
          .where(price_per_night: (low_price)..(high_price))
          .where(room_type: room_types)
          .where(active: true)
          .includes(:listing_photos)
          .page(page)
        else
          @listings = Listing.where(<<-SQL, binds)
            listings.latitude BETWEEN :lat_min AND :lat_max
              AND listings.longitude BETWEEN :lng_min AND :lng_max
          SQL
          .where(price_per_night: (low_price)..(high_price))
          .where(room_type: room_types)
          .where(active: true)
          .includes(:listing_photos)
          .page(page)
        end

        # @listings
        #   .where(price_per_night: (low_price)..(high_price))
        #   .where(room_type: room_types)
        #   .where(active: true)
        #   .includes(:listing_photos)
      end
      render "listings/index"
    end

    def show
      @listing = Listing.find(params[:id])
      render "listings/show"
    end

    private
    def listing_params
      params.require(:listing).permit(
        :street_address, :city, :state, :zip,
        :room_type, :home_type, :guest_limit,
        :price_per_night, :title, :description, :active,
        :latitude, :longitude)
    end
    def query_params
      params.require(:query).permit(
        :current_user, listing: [:low_price, :high_price,
        room_types: [], boundaries: [:lat, :lng] ]
      )
    end

  end
end
