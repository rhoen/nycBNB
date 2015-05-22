json.email current_user.email
json.image_url asset_path(current_user.avatar.url(:original))
json.profile_url asset_path(current_user.avatar.url(:profile))
json.thumb_url asset_path(current_user.avatar.url(:thumb))
