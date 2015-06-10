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

    def listing_photos
      listing = Listing.find(params[:id])
      @photos = listing.listing_photos
      render "listings/listing_photos"
    end

    def index
      if params[:query] == "current_user"
        @listings = Listing.where("owner_id = ?", current_user.id)
          .includes(:trips)
          .page(1).per(100)
      render "listings/index_with_trips"
      elsif params[:query][:listing]
        query = params[:query][:listing]
        boundaries = query[:boundaries]
        low = query[:low_price]
        high = query[:high_price]
        page = params[:query][:page]

        if (query[:start_date])
          start_date = Date.strptime(query[:start_date], "%Y-%m-%d")
        else
          start_date = Date.today + 7
        end

        if (query[:end_date])
          end_date = Date.strptime(query[:end_date], "%Y-%m-%d")
        else
          end_date = Date.today + 10
        end

        low_price = (low == "" ? 0 : low)
        high_price = (high == "" ? 10000 : high)
        room_types = query[:room_types] || Listing.room_types

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
          .includes(:trips)
          .where(<<-SQL, start_date: start_date, end_date: end_date)
            (trips.start_date > :end_date OR trips.end_date < :start_date) OR trips.id IS NULL
            SQL
          .includes(:listing_photos)
          .page(page).per(Listing.results_per_page)
        else
          @listings = Listing.where(<<-SQL, binds)
            listings.latitude BETWEEN :lat_min AND :lat_max
              AND listings.longitude BETWEEN :lng_min AND :lng_max
          SQL
          .where(price_per_night: (low_price)..(high_price))
          .where(room_type: room_types)
          .where(active: true)
          .joins("LEFT OUTER JOIN trips ON trips.listing_id = listings.id")
          .where(<<-SQL, start_date: start_date, end_date: end_date)
            (trips.start_date > :end_date OR trips.end_date < :start_date) OR trips.id IS NULL
            SQL
          .includes(:listing_photos)
          .page(page).per(Listing.results_per_page)
        end
        render "listings/index"
      end
    end

    def show
      @listing = Listing.find(params[:id])
      @trip_dates = @listing.trips.where(status: "APPROVED").map do |trip|
        trip.start_date.upto(trip.end_date).map {|date| date}
      end.flatten
      render "listings/show"
    end

    private
    def listing_params
      params.require(:listing).permit(
        :street_address, :city, :state, :zip,
        :room_type, :home_type, :guest_limit,
        :price_per_night, :title, :description, :active,
        :latitude, :longitude, :start_date, :end_date)
    end
    def query_params
      params.require(:query).permit(
        :current_user, listing: [:low_price, :high_price,
        room_types: [], boundaries: [:lat, :lng] ]
      )
    end

  end
end
