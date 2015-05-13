module Api
  class UsersController < ApiController
    def curr_user
      render json: {email: current_user.email}
    end
  end
end
