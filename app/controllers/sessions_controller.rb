class SessionsController < ApplicationController

  def new
    render "static_pages/new_session"
  end

  def create
    user = User.find_by_credentials(user_params[:email], user_params[:password])
    log_in_user(user)
    redirect_to new_app_url
  end

  def destroy
    curr_session = Session.find_by(session_token: session[:session_token])
    curr_session.destroy
    redirect_to new_sessions_url
  end

end
