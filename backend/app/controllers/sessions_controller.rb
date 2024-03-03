class SessionsController < ApplicationController
  def new
    respond_to do |format|
      format.html
      format.json { render json: {:authenticity_token => form_authenticity_token}.to_json }
    end
  end

  def create
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      respond_to do |format|
        format.html { redirect_to movies_path }
        format.json { render json: user.slice(:id,:username,:email,:admin).to_json}
      end
    else
      respond_to do |format|
        format.html {
          flash.now[:alert] = "Invalid email or password"
          render :new
        }
        format.json { render json: {:message=>"Invalid email or password"}.to_json, status: 401}
      end
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end
end
