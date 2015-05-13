module Api
  class Api::UsersController < ApiController
    def curr_user
      render json: {user: current_user.email}
    end
  end
end
