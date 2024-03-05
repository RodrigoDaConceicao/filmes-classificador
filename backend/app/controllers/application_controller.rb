class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception, unless: -> {request.format.json?}
  helper_method :current_user, :logged_in?, :admin?

  private

  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def logged_in?
    !!current_user
  end

  def admin?
    !!current_user&.admin
  end

  def authenticate_user!
    unless logged_in?
      respond_to do |format|
        format.html do
          flash[:alert] = "You must be logged in to access this page"
          redirect_to login_path
        end
        format.json { render json: {:message=>"You must be logged in to access this page"}, status: 401}
      end
    else 
        yield if block_given?
    end
  end

  def authorize_admin!
    authenticate_user! do
      unless @current_user&.admin
        respond_to do |format|
          format.html do
            flash[:alert] = "You don't have permission to access this resource"
            redirect_to login_path
          end
          format.json { render json: {:message=>"You don't have permission to access this resource"}, status: 403}
        end
      end
    end
  end
end
