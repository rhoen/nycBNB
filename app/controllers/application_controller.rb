class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :logged_in?, :current_user

  private

  def log_in_user(user)
    new_session = Session.new(
      user_id: user.id, session_token: User.generate_token
    )
    new_session.save
    session[:session_token] = new_session.session_token
  end

  def current_user
    current_session = Session.find_by session_token: session[:session_token]
    User.find_by(id: current_session.user_id)
  end

  def log_out
  end

  def logged_in?
    !!current_user
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end

end
