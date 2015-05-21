json.array! @listings do |listing|
  json.extract! listing, :title
  json.first_photo do
    next unless listing.listing_photos.first
    json.thumb_url asset_path(listing.listing_photos.first.photo.url(:thumb))
    json.small_url asset_path(listing.listing_photos.first.photo.url(:small))
    json.large_url asset_path(listing.listing_photos.first.photo.url(:large))
  end
end
