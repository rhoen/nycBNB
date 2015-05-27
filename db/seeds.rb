# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require("CSV")
home_types = ["apartment", "house", "bed-and-breakfast"]
room_types = ["entire-home", "private-room", "shared-room"]

  users = User.create([
    {email: "sam_i_am@example.com", password: "password"},
    {email: "rhoen@example.com", password: "password"},
    {email: "washington@example.com", password: "password"}
    ])


  Listing.create(
    owner_id: users[0].id,
    street_address: "598 Broadway",
    city: "New York",
    state: "NY",
    zip: "10003",
    room_type: room_types[2],
    guest_limit: 10,
    price_per_night: 1,
    description: "AppAcademy office. Free, but must be a student.",
    title: "Terrible but cheap digs!",
    active: false,
    home_type: home_types[0],
    latitude: 40.725228,
    longitude: -73.996683

  )

  Listing.create(
    owner_id: users[1].id,
    street_address: "208 Mount Hope Place",
    city: "Bronx",
    state: "NY",
    zip: "10457",
    room_type: room_types[1],
    home_type: home_types[1],
    guest_limit: 1,
    price_per_night: 35,
    description: "Beautiful but small room",
    title: "you better be clean",
    active: false,
    latitude: 40.848360,
    longitude: -73.905733
  )

  Listing.create(
    owner_id: users[2].id,
    street_address: "100 MacDougal",
    city: "New York",
    state: "NY",
    zip: "10003",
    room_type: room_types[0],
    guest_limit: 4,
    price_per_night: 600,
    description: "Gorgeous apartment with view of Washington Square Park!",
    title: "give us your money!",
    active: false,
    home_type: home_types[2],
    latitude: 40.729399,
    longitude: -74.001193
  )

##########################################

apartment_adjectives = [
  "airy",
  "carefree",
  "casual",
  "cheerful",
  "debonair",
  "effervescent",
  "informal",
  "jaunty",
  "light",
  "lively",
  "relaxed",
  "sparkling",
  "spirited",
  "sunny",
  "vivacious",
  "admirable",
  "alluring",
  "angelic",
  "appealing",
  "beauteous",
  "bewitching",
  "charming",
  "classy",
  "comely",
  "cute",
  "dazzling",
  "delicate",
  "delightful",
  "divine",
  "elegant",
  "enticing",
  "excellent",
  "exquisite",
  "fair",
  "fascinating",
  "fine",
  "gorgeous",
  "graceful",
  "grand",
  "ideal",
  "lovely",
  "magnificent",
  "marvelous",
  "nice",
  "pleasing",
  "pretty",
  "pulchritudinous",
  "radiant",
  "refined",
  "resplendent",
  "sightly",
  "splendid",
  "statuesque",
  "stunning",
  "sublime",
  "superb",
  "symmetrical",
  "taking",
  "wonderful"
]

apartment_sizes = [
  "studio",
  "1BR",
  "2BR",
  "3BR",
  "4BR",
  "5BR",
  "6BR",
  "7BR"
]

occupy_verb = [
  "abiding",
  "living",
  "residing",
  "resting",
  "settling",
  "being situated",
  "staying",
  "taking up",
  "vacationing"
]

# user_names = []
# until user_names.length == 300 do
#   name = Faker::Internet.email
#   user_names.push name unless user_names.include? name
# end
# user_names.map! do |name|
#   {email: name, password: "password"}
# end

# users = User.create(user_names)
path = Rails.root.join("db", "address_with_latlng.csv")
csv = CSV.read(path, {
    headers: true
    })

csv.each do |row|
  row['street_address'] = row['street_address'].strip
  adj = apartment_adjectives.sample
  adj2 = apartment_adjectives.sample
  size = apartment_sizes.sample
  title = "#{adj} #{size} in #{row["city"]}"
  description = "You'll love #{occupy_verb.sample} in this #{adj2} #{size}!"

  attr = {
    title: title,
    description: description,
    room_type: room_types.sample,
    home_type: home_types.sample,
    active: false,
    owner_id: row['owner_id'],
    latitude: row['latitude'],
    longitude: row['longitude'],
    street_address: row['street_address'],
    guest_limit: row['guest_limit'],
    price_per_night: row['price_per_night'],
    city: row['city'],
    state: "NY",
    zip: row['zip']
    }
  l = Listing.new(attr)
  l.save
  l.active = true
  l.save
  puts l.active
  #create listing object
end
