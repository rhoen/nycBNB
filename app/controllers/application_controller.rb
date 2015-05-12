class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_methods :logged_in?, :current_user

  private

  def log_in_user(user)

  end

  def current_user

  end

  def log_out
  end

  def logged_in?
  end

end
