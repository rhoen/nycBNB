class AppController < ApplicationController
  # before_action :ensure_logged_in
  def new
    render "static_pages/app"
  end

end
