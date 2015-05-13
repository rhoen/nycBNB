module Api
  class UsersController < ApiController
    def curr_user
      render json: {user: current_user.email}
    end
  end
end
