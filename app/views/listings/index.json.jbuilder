json.total_pages @listings.total_count / Listing.results_per_page + 1
json.total_listings @listings.total_count
json.listings_per_page Listing.results_per_page
json.listings @listings do |listing|
  json.extract! listing, :title, :city, :active, :id,
    :room_type, :home_type, :guest_limit, :state, :zip,
    :street_address, :description, :price_per_night
  json.latitude listing.latitude.to_f
  json.longitude listing.longitude.to_f
  json.room_missing do
    json.thumb_url asset_path("room_missing.png")
    json.small_url asset_path("room_missing.png")
    json.large_url asset_path("room_missing.png")
  end
  json.photos listing.listing_photos.each do |photo|
    json.id photo.id
    json.thumb_url asset_path(photo.photo.url(:thumb))
    json.small_url asset_path(photo.photo.url(:small))
    json.large_url asset_path(photo.photo.url(:large))
    json.primary_photo photo.primary_photo
  end
end
