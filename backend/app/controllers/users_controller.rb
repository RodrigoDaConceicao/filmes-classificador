class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      respond_to do |format|
        format.html { redirect_to movies_path }
        format.json { render json: @user.slice(:id,:username,:email,:admin) }
      end
    else
      respond_to do |format|
        format.html { render :new }
        format.json { render json: {:message=>@user.errors.full_messages}, status: 422 }
      end
      
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end
end
