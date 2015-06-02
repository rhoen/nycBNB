class User < ActiveRecord::Base
  validates :email, :password_digest, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  validates :email, uniqueness: true
  has_attached_file :avatar, default_url: "image_missing.png", styles: { thumb: ["32x32#", :jpg], profile: ["151x151#", :jpg] }
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/

  has_many :sessions, dependent: :destroy
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
    u = User.find_by(email: "guest@example.com")
    if u.listings.find_by(street_address: "410 West Broadway").nil?
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
    end

    if u.listings.find_by(street_address: "566 1st Street").nil?
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
  end


end
