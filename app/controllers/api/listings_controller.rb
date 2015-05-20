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
        listings = Listing.where("owner_id = ?", current_user.id)
      elsif params[:query][:listing]
        low = query[:listing][:low_price]
        high = query[:listing][:high_price]

        low_price = (low == "" ? 0 : low)
        high_price = (high == "" ? 10000 : high)

        room_types = query[:listing][:room_type] || Listing.room_types

        listings = Listing
          .where(price_per_night: (low_price)..(high_price))
          .where(room_type: room_types)
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
    def query_params
      params.require(:query).permit(
      :current_user, listing: [:low_price, :high_price, room_types: []]
      )
    end

  end
end
