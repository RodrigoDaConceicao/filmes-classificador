class SessionsController < ApplicationController
  before_action :authenticate_user!, only:[:logged_in]

  def logged_in
    @user = current_user
    render json: @user.slice(:id,:username,:email,:admin)
  end

  def create
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user.slice(:id,:username,:email,:admin), status: 201
    else
      render json: {:message=>"Invalid email or password"}.to_json, status: 422
    end
  end

  def destroy
    session[:user_id] = nil
    render json: {:message=>"Logged out successfully"}.to_json
  end
end
