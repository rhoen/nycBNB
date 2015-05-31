json.total_pages @listings.total_count / Listing.results_per_page + 1
json.listings @listings do |listing|
    json.extract! listing, :title, :city, :active, :id,
      :room_type, :home_type, :guest_limit, :state, :zip,
      :street_address, :description, :price_per_night
    json.latitude listing.latitude.to_f
    json.longitude listing.longitude.to_f
    json.primary_photo do
      photo = listing.listing_photos.select{|p| p.primary_photo}.first
      if photo
        json.thumb_url asset_path(photo.photo.url(:thumb))
        json.small_url asset_path(photo.photo.url(:small))
        json.large_url asset_path(photo.photo.url(:large))
      else
        json.thumb_url asset_path("room_missing.png")
        json.small_url asset_path("room_missing.png")
        json.large_url asset_path("room_missing.png")
      end
    end
  end
