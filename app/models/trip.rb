class Trip < ActiveRecord::Base
  validates :listing_id, :traveler_id, :start_date, :end_date, presence: true

  belongs_to(
    :traveler,
    class_name: "User",
    foreign_key: :traveler_id,
    inverse_of: :trips
  )

end
