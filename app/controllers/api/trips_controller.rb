module Api
  class TripsController < ApiController
    before_action :is_listing_owner_or_trip_owner [:show]
    before_action :is_listing_owner, only: [:destroy, :update]
    def create
      trip = Trip.new(trip_params)
      trip.traveler = current_user
      if trip.save
        render json: trip
      else
        render json: trip.errors
      end
    end
    def update
      current_trip.update(trip_params)
    end
    def destroy
      current_trip.destroy
      render json: true
    end
    def show
      render json: current_trip
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
