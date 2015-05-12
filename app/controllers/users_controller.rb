class UsersController < ApplicationController
  def new
    render "static_pages/new_user"
  end

  def create
    user = User.new(user_params)
    if user.save
      log_in_user(user)
      redirect_to new_app_url
    else
      flash.now[:errors] = user.errors.full_messages
      render "static_pages/new_user"
    end

  end

  def destroy
  end



end
