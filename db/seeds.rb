# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

  users = User.create([
    {email: "ripe@gmail.com", password: "password"},
    {email: "rhoen@gmail.com", password: "password"},
    {email: "hello@gmail.com", password: "password"}
    ])


  Listing.create(
    owner_id: users[0].id,
    street_address: "598 Broadway",
    city: "New York",
    state: "NY",
    zip: "10003",
    room_type: "shared-room",
    guest_limit: 10,
    price_per_night: 1,
    description: "AppAcademy office. Free, but must be a student.",
    title: "Terrible but cheap digs!",
    active: false,
    home_type: "Apartment",
  )

  Listing.create(
    owner_id: users[1].id,
    street_address: "208 Mount Hope Place",
    city: "Bronx",
    state: "NY",
    zip: "10457",
    room_type: "private-room",
    home_type: "Apartment",
    guest_limit: 1,
    price_per_night: 35,
    description: "Beautiful but small room",
    title: "you better be clean",
    active: false
  )

  Listing.create(
    owner_id: users[2].id,
    street_address: "100 MacDougal",
    city: "New York",
    state: "NY",
    zip: "10003",
    room_type: "entire-home",
    guest_limit: 4,
    price_per_night: 600,
    description: "Gorgeous apartment with view of Washington Square Park!",
    title: "give us your money!",
    active: false,
    home_type: "Apartment",
  )
