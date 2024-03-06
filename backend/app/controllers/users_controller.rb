class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      render json: @user.slice(:id,:username,:email,:admin), status: 201
    else
      render json: {:message=>@user.errors.full_messages}, status: 422 
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end
