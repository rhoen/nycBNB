json.listing @listing
json.photos @listing.listing_photos do |listing_photo|
  json.id listing_photo.id
  json.thumb_url asset_path(listing_photo.photo.url(:thumb))
  json.small_url asset_path(listing_photo.photo.url(:small))
  json.large_url asset_path(listing_photo.photo.url(:large))
end
