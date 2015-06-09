module Api
  class TripsController < ApiController
    before_action :is_listing_owner_or_trip_owner, only: [:show]
    before_action :is_listing_owner, only: [:destroy, :update]
    def create
      trip = Trip.new(trip_params)
      trip.traveler_id = current_user.id
      trip.start_date = Date.new(trip_params[:start_date])
      trip.end_date = Date.new(trip_params[:end_date])
      puts trip.attributes
      if trip.save!
        render json: trip
      else
        render json: trip.errors, status: :unprocessable_entity
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
    def index

    end
    private
    def trip_params
      params.require(:trip).permit(
      :start_date,
      :end_date,
      :listing_id
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
