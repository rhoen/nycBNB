# == Schema Information
#
# Table name: users
#
#  id                  :integer          not null, primary key
#  email               :string           not null
#  password_digest     :string           not null
#  created_at          :datetime
#  updated_at          :datetime
#  avatar_file_name    :string
#  avatar_content_type :string
#  avatar_file_size    :integer
#  avatar_updated_at   :datetime
#

class User < ActiveRecord::Base
  validates :email, :password_digest, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  validates :email, uniqueness: true
  has_attached_file :avatar, default_url: "image_missing.png", styles: { thumb: ["32x32#", :jpg], profile: ["151x151#", :jpg] }
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

  has_many :sessions, dependent: :destroy
  has_many(
    :trips,
    foreign_key: :traveler_id,
    dependent: :destroy,
    inverse_of: :traveler
  )
  has_many(
    :listings,
    foreign_key: :owner_id,
    dependent: :destroy,
    inverse_of: :owner
  )
    attr_reader :password

  def User.generate_token
    SecureRandom.base64
  end

  def User.find_by_credentials(email, password)
    user = User.find_by(email: email)
    if !user.nil? && user.is_password?(password)
      user
    else
      nil
    end
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end

  def self.ensure_guest_account_data
    room_types = Listing.room_types
    home_types = Listing.home_types

    washington = User.find_by(email: "washington@example.com")
    if !washington
      washington = User.create(email: "washington@example.com", password: "password")
    end
    sam = User.find_by(email: "sam_i_am@example.com")
    if !sam
      sam = User.create(email: "sam_i_am@example.com", password: "password")
    end
    u = User.find_by(email: "guest@example.com")
    if u.nil?
      User.create(email: "guest@example.com", password: "password")
    end

    sam_listing = Listing.find_by(street_address: "598 Broadway")
    if !sam_listing
      sam_listing = Listing.create(
        owner_id: sam.id,
        street_address: "598 Broadway",
        city: "New York",
        state: "NY",
        zip: "10003",
        room_type: room_types[2],
        guest_limit: 10,
        price_per_night: 1,
        description: "AppAcademy office. Free, but must be a student.",
        title: "Cheap digs!",
        active: false,
        home_type: home_types[0],
        latitude: 40.725228,
        longitude: -73.996683
      )
      p1 = File.new(Rails.root.join("app","assets","images","apartments","exteriors", "8.jpg"))
      p2 = File.new(Rails.root.join("app","assets","images","apartments","interiors", "10.jpg"))
      sam_listing.listing_photos.create(photo: p1)
      sam_listing.listing_photos.create(photo: p2)
      sam_listing.active = true
      sam_listing.listing_photos.first.set_as_primary
      sam_listing.save
    end

    washington_listing = Listing.find_by(street_address: "100 MacDougal")
    if !washington_listing
      washington_listing = Listing.create(
        owner_id: washington.id,
        street_address: "100 MacDougal",
        city: "New York",
        state: "NY",
        zip: "10003",
        room_type: room_types[0],
        guest_limit: 4,
        price_per_night: 600,
        description: "Gorgeous apartment with view of Washington Square Park!",
        title: "Nice 1BR",
        active: false,
        home_type: home_types[2],
        latitude: 40.729399,
        longitude: -74.001193
      )
      p1 = File.new(Rails.root.join("app","assets","images","apartments","exteriors", "5.jpg"))
      p2 = File.new(Rails.root.join("app","assets","images","apartments","interiors", "7.jpg"))
      washington_listing.listing_photos.create(photo: p1)
      washington_listing.listing_photos.create(photo: p2)
      washington_listing.active = true
      washington_listing.listing_photos.first.set_as_primary
      washington_listing.save
    end

    l1 = u.listings.find_by(street_address: "410 West Broadway")
    if l1.nil?
      l1 = Listing.create(
        owner_id: u.id,
        street_address: "410 West Broadway",
        city: "New York",
        state: "NY",
        zip: "10012",
        room_type: room_types[1],
        guest_limit: 2,
        price_per_night: 150,
        description: "Beautiful apartment in the village!",
        title: "Spacious 2BR",
        active: false,
        home_type: home_types[0],
        latitude: 40.724509,
        longitude: -74.001866
      )
      p1 = File.new(Rails.root.join("app","assets","images","apartments","exteriors", "1.jpg"))
      p2 = File.new(Rails.root.join("app","assets","images","apartments","interiors", "1.jpg"))
      l1.listing_photos.create(photo: p1)
      l1.listing_photos.create(photo: p2)
      l1.active = true
      l1.listing_photos.first.set_as_primary
      l1.save
      start = Date.new(2015, 7, 3)
      end_date

    end

    l2 = u.listings.find_by(street_address: "566 1st Street")
    if l2.nil?
      l2 = Listing.create(
        owner_id: u.id,
        street_address: "566 1st Street",
        city: "Brooklyn",
        state: "NY",
        zip: "11215",
        room_type: room_types[2],
        guest_limit: 4,
        price_per_night: 250,
        description: "Gorgeous spot next to prospect park!",
        title: "Wonderful 3BR",
        active: false,
        home_type: home_types[0],
        latitude: 40.669832,
        longitude: -73.973724492
      )
      p3 = File.new(Rails.root.join("app","assets","images","apartments","exteriors", "2.jpg"))
      p4 = File.new(Rails.root.join("app","assets","images","apartments","interiors", "4.jpg"))

      l2.listing_photos.create(photo: p3)
      l2.listing_photos.create(photo: p4)
      l2.listing_photos.first.set_as_primary
      l2.save

    end

    u.trips.delete_all
    sam_listing.trips.create(
      start_date: Date.new(Date.today.year, (Date.today.month + 1) % 12, 1),
      end_date: Date.new(Date.today.year, (Date.today.month + 1) % 12, 3),
      traveler_id: u.id,
      guests:1
    )
    sam_listing.trips.create(
      start_date: Date.new(Date.today.year, (Date.today.month + 2) % 12, 5),
      end_date: Date.new(Date.today.year, (Date.today.month + 2) % 12, 8),
      traveler_id: u.id,
      guests: 1
    )
    washington_listing.trips.create(
      start_date: Date.new(Date.today.year, (Date.today.month + 3) % 12, 10),
      end_date: Date.new(Date.today.year, (Date.today.month + 3) % 12, 15),
      traveler_id: u.id,
      guests:1
    )
    washington_listing.trips.create(
      start_date: Date.new(Date.today.year, (Date.today.month + 4) % 12, 23),
      end_date: Date.new(Date.today.year, (Date.today.month + 4) % 12, 24),
      traveler_id: u.id,
      guests: 1
    )

    l1.trips.delete_all
    l1.trips.create(
      start_date: Date.new(2015, 7, 3),
      end_date: Date.new(2015, 7, 6),
      traveler_id: washington.id,
      status: "APPROVED",
      guests: 1
    )
    l1.trips.create(
      start_date: Date.new(2015, 7, 20),
      end_date: Date.new(2015, 7, 22),
      traveler_id: sam.id,
      guests: 1
    )
    l2.trips.delete_all
    l2.trips.create(
      start_date: Date.new(2015, 8, 1),
      end_date: Date.new(2015, 8, 4),
      traveler_id: sam.id,
      status: "DENIED",
      guests: 1
    )
    l2.trips.create(
      start_date: Date.new(2015, 8, 5),
      end_date: Date.new(2015, 8, 9),
      traveler_id: washington.id,
      guests: 1
    )
  end


end
