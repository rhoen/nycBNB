json.listing @listing
json.array! @listing.listing_photos do |photo|
  json.thumb_url asset_path(photo.url(:thumb))
  json.large_url asset_path(photo.url(:large))
end
