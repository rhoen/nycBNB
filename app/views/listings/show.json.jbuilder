json.listing @listing
json.photos @listing.listing_photos do |listing_photo|
  json.thumb_url asset_path(listing_photo.photo.url(:thumb))
  json.large_url asset_path(listing_photo.photo.url(:large))
end
