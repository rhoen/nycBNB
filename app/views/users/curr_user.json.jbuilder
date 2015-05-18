json.email current_user.email
json.image_url asset_path("image_missing.png")
# unless current_user.avatar.nil?
#   json.image_url asset_path(current_user.avatar.url)
# else
#   json.image_url asset_path("app/assets/images/image_missing.png")
# end
