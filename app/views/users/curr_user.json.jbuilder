json.email current_user.email
unless current_user.avatar.nil?
  json.image_url asset_path(current_user.avatar.url(:thumb))
else
  json.image_url asset_path("app/assets/images/image_missing.png")
end
