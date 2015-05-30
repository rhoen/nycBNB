json.email @user.email
json.image_url asset_path(@user.avatar.url(:original))
json.profile_url asset_path(@user.avatar.url(:profile))
json.thumb_url asset_path(@user.avatar.url(:thumb))
