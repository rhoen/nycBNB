json.array! @listings do |listing|
  json.extract! listing, :title, :city, :active, :id,
    :room_type, :home_type, :guest_limit, :state, :zip,
    :street_address, :description, :price_per_night
  json.latitude listing.latitude.to_f
  json.longitude listing.longitude.to_f
  json.first_photo do
    next unless listing.listing_photos.first
    json.thumb_url asset_path(listing.listing_photos.first.photo.url(:thumb))
    json.small_url asset_path(listing.listing_photos.first.photo.url(:small))
    json.large_url asset_path(listing.listing_photos.first.photo.url(:large))
  end
end
