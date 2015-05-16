module Api
  class UsersController < ApiController
    def curr_user
      render json: {email: current_user.email}
    end

    def show
      user = User.find(params[:id])
      render json: {email: user.email}
    end
  end
end
