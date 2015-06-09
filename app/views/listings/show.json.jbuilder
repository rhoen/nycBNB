json.extract! @listing, :title, :city, :active, :id,
  :room_type, :home_type, :guest_limit, :state, :zip,
  :street_address, :description, :price_per_night, :owner_id
json.latitude @listing.latitude.to_f
json.longitude @listing.longitude.to_f
json.photos @listing.listing_photos do |listing_photo|
  json.id listing_photo.id
  json.thumb_url asset_path(listing_photo.photo.url(:thumb))
  json.small_url asset_path(listing_photo.photo.url(:small))
  json.large_url asset_path(listing_photo.photo.url(:large))
  json.original_url asset_path(listing_photo.photo.url(:original))
  if listing_photo.primary_photo
    json.primary_photo true
  end
end
json.trips do
  json.array! @trip_dates
end
