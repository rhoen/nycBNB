module Api
  class TripsController < ApiController
    before_action :is_listing_owner_or_trip_owner [:update]
    before_action :is_listing_owner, only: [:destroy]
    def create

    end

    def update
    end

    def destroy
    end

    def show

    end

    private
    def trip_params
      params.require(:trip).permit(
      :start_date,
      :end_date,
      :listing_id,
      :user_id
      )
    end
    def is_listing_owner_or_trip_owner
      current_user == current_trip.traveler || current_user == current_listing.owner
    end
    def current_listing
      Listing.find(current_trip.listing_id)
    end
    def current_trip
      Trip.find(params[:id])
    end
  end
end
