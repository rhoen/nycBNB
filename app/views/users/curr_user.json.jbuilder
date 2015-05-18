json.email current_user.email
if current_user.avatar_file_name.nil?
  json.image_url asset_path("image_missing.png")
else
  json.image_url asset_path(current_user.avatar.url)
end
