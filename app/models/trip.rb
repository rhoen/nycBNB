class Trip < ActiveRecord::Base
  validates :listing_id, :traveler_id, :start_date, :end_date, presence: true
  validate  :listing_is_available
  belongs_to(
    :traveler,
    class_name: "User",
    foreign_key: :traveler_id,
    inverse_of: :trips
  )

  belongs_to :listing

  def listing_is_available
    target_start = params[:trip][:start_date]
    target_end = params[:trip][:end_date]
    Listing.where.not("start_date > ? AND end_date < ?", target_end, target_start)
  end

  private
  def trip_params
    params.requirle(:trip).permit(:listing_id, :traveler_id, :start_date, :end_date)
  end

end
