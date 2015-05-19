json.email current_user.email
json.image_url asset_path(current_user.avatar.url(:original))
json.large_url asset_path(current_user.avatar.url(:large))
json.thumb_url asset_path(current_user.avatar.url(:thumb))
