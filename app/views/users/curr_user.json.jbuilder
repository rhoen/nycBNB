json.email current_user.email
json.id current_user.id
# if current_user.avatar_file_name.nil?
#   json.image_url asset_path("image_missing.png")
# else
  json.image_url asset_path(current_user.avatar.url(:original))
  json.thumb_url asset_path(current_user.avatar.url(:thumb))
# end
