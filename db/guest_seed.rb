def ensure_guest_account_data
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

    l2.listing_photos.create(photo: p1)
    l2.listing_photos.create(photo: p2)

    l2.save
    l1.listing_photos.first.set_as_primary
    l2.listing_photos.first.set_as_primary
  end
end
