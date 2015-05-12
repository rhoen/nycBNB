class SessionsController < ApplicationController

  def new
    render "static_pages/new_session"
  end

  def create
    user = User.find_by_credentials(user_params)
    log_user_in(user)
  end

  def destroy
    session = Session.find_by(session[session_token])
    session.destroy
  end

end
