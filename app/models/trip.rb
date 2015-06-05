class Trip < ActiveRecord::Base
  belongs_to(
    :traveler,
    class_name: "User",
    foreign_key: :traveler_id,
    inverse_of: :trips
  )
  belongs_to :listing

  validates :listing_id, :traveler_id, :start_date, :end_date, presence: true
  validate  :listing_is_available
  validate :start_before_end
  # validate :does_not_overlap_approved_request
  after_initialize :assign_pending_status

  def listing_is_available

    query = <<-SQL
      SELECT
        DISTINCT l.*
      FROM
        listings l
      INNER JOIN
        trips t ON t.listing_id = l.id
      WHERE
         (t.start_date > ? AND t.end_date < ?)
    SQL

    Listing.find_by_sql [query, t.start_date, t.end_date]
    Trip
      .where("(:id IS NULL) OR (id != :id)", id: self.id)
      .where(id: id)
      .where(<<-SQL, start_date: start_date, end_date: end_date)
       NOT( (start_date > :end_date) OR (end_date < :start_date) )
SQL

  end

  private
  # def trip_params
  #   params.require(:trip).permit(:listing_id, :traveler_id, :start_date, :end_date)
  # end
   def assign_pending_status
     self.status ||= "PENDING"
   end
   def start_before_end
    return unless start_date && end_date
    errors[:start_date] << "must come before end date" if start_date >= end_date
  end
end
