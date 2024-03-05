class UserMoviesController < ApplicationController
  before_action :authenticate_user!

  def create
    @user_movie = UserMovie.new(score: params[:user_movie][:score])
    @user_movie.user = current_user
    @user_movie.movie = Movie.find_by(id: params[:user_movie][:movie_id])
    if @user_movie.save
      respond_to do |format|
        format.html { redirect_to movies_path }
        format.json { render json: @user_movie, status: 201}
      end
    else
      respond_to do |format|
        format.html { redirect_to movies_path }
        format.json { render json: {:message=>@user_movie.errors.full_messages}, status: 422 }
      end
    end
  end

  def update
    @user_movie = current_user.user_movies.find_by(movie_id: params[:user_movie][:movie_id])
    if @user_movie.update(score: params[:user_movie][:score])
      respond_to do |format|
        format.html { redirect_to movies_path }
        format.json { render json: @user_movie}
      end
    else
      respond_to do |format|
        format.html { redirect_to movies_path }
        format.json { render json: {:message=>@user_movie.errors.full_messages}, status: 422 }
    end
  end
  end
end
