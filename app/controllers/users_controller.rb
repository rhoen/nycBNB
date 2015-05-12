class UsersController < ApplicationController
  def new
    render "static_pages/new_user"
  end

  def create
    user = User.new(user_params)
    if user.save
      log_in_user(user)
      redirect_to "static_pages/app"
    else
      render user.errors.full_messages
    end

  end

  def destroy
  end



end
