module Api
  class UsersController < ApiController
    def curr_user
      render json: {email: current_user.email}
    end

    def show
      user = User.find(params[:id])
      render json: {email: user.email}
    end

    def update
      user = User.find(params[:id])
      if user.id == current_user.id
        user.update(user_params)
        render json: user
      else
        render json: "You may not upload to that user", status: :unprocessable_entity
    end

    def user_params
      params.require(:user).permit(:avatar)
    end
  end
end
