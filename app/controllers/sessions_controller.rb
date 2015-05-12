class SessionsController < ApplicationController

  def new
    render "static_pages/new_session"
  end

  def create
    user = User.find_by_credentials(user_params)
  end

end
