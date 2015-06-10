module Api
  class TripsController < ApiController
    before_action :is_listing_owner_or_trip_owner, only: [:show, :destroy]
    before_action :is_listing_owner, only: [:update]
    def create
      trip = Trip.new(trip_params)
      trip.traveler_id = current_user.id
      trip.start_date = Date.strptime(trip_params[:start_date], "%m/%d/%Y")
      trip.end_date = Date.strptime(trip_params[:end_date], "%m/%d/%Y")
      puts trip.attributes
      if trip.save!
        render json: trip
      else
        render json: trip.errors, status: :unprocessable_entity
      end
    end
    def update
      if params[:trip][:status] == "APPROVED"
        current_trip.approve!
      end

      render json: current_trip
    end
    def destroy
      current_trip.destroy
      render json: true
    end
    def show
      render json: current_trip
    end
    def index
      @trips = Trip.where(traveler_id: current_user.id)
      render json: @trips
    end
    private
    def trip_params
      params.require(:trip).permit(
      :start_date,
      :end_date,
      :listing_id,
      :guests
      )
    end
    def is_listing_owner_or_trip_owner
      current_user == current_trip.traveler || current_user == current_listing.owner
    end
    def is_listing_owner
      current_user == current_listing.owner
    end
    def current_listing
      Listing.find(current_trip.listing_id)
    end
    def current_trip
      Trip.find(params[:id])
    end
  end
end
