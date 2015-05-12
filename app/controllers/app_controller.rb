class AppController < ApplicationController
  before_action :ensure_logged_in
  def new
    render "static_pages/app"
  end

  private

  def ensure_logged_in
    unless logged_in?
      flash[:errors] = "You must be logged in to access nycBNB"
      redirect_to new_session_url
    end
  end

end
