class SessionsController < ApplicationController
  before_action :ensure_not_logged_in, only: [:new]
  def new
    render "static_pages/new_session"
  end

  def create
    user = User.find_by_credentials(user_params[:email], user_params[:password])
    if user
      log_in_user(user)
      redirect_to new_app_url
    else
      flash.now[:errors] = ["incorrect email/password combination"]
      render "static_pages/new_session"
    end
  end

  def destroy
    curr_session = Session.find_by(session_token: session[:session_token])
    curr_session.destroy
    redirect_to new_sessions_url
  end

end
