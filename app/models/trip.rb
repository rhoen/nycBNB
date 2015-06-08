class Trip < ActiveRecord::Base
  belongs_to(
    :traveler,
    class_name: "User",
    foreign_key: :traveler_id,
    inverse_of: :trips
  )
  belongs_to :listing

  validates :listing_id, :traveler_id, :start_date, :end_date, presence: true
  validate :start_before_end
  validate :does_not_overlap_approved_trip
  after_initialize :assign_pending_status

  def overlapping_trips
    Trip
      .where("(:id IS NULL) OR (id != :id)", id: self.id)
      .where(listing_id: self.listing_id)
      .where(<<-SQL, start_date: self.start_date, end_date: self.end_date)
       NOT( (start_date > :end_date) OR (end_date < :start_date) )
      SQL
  end

  def approve!
    raise "not pending" unless self.status == "PENDING"
    transaction do
      self.status = "APPROVED"
      self.save!

      # reject all other overlapping pending trips
      self.overlapping_pending_trips.update_all(status: 'DENIED')
    end
  end
  def approved?
    self.status == "APPROVED"
  end
  def denied?
    self.status == "DENIED"
  end
  def deny!
    self.status = "DENIED"
    self.save!
  end
  def pending?
    self.status == "PENDING"
  end

  private
  def overlapping_pending_trips
    overlapping_trips.where("status = 'PENDING'")
  end
   def assign_pending_status
     self.status ||= "PENDING"
   end
   def start_before_end
    return unless start_date && end_date
    if start_date >= end_date
      errors.add(:start_date, "must come before end date")
    end
  end
  def does_not_overlap_approved_trip
    unless self.overlapping_trips.where(status: "APPROVED").empty?
      errors.add(:base, "Trip conflicts with existing approved trip")
    end
  end
end
