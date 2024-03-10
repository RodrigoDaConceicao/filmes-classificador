class UserMoviesController < ApplicationController
  before_action :authorize_admin!, only: [:import]
  before_action :authenticate_user!, only:[:create, :update]

  def import
    separator = (params[:separator] == 'comma' ? ',' : ';')
    begin
    ImportRatingsJob.perform_async request.raw_post, separator
    rescue Exception => e
      puts e.message
      render json: {:message=>"Internal server error"}, status: 500
    else
      render json: {:message=>"Ok"}, status: 200
    end
  end

  def create
    @user_movie = UserMovie.new(score: params[:user_movie][:score])
    @user_movie.user = current_user
    @user_movie.movie = Movie.find_by(id: params[:user_movie][:movie_id])
    if @user_movie.save
      render json: @user_movie, status: 201
    else
      render json: {:message=>@user_movie.errors.full_messages}, status: 422
    end
  end

  def update
    @user_movie = current_user.user_movies.find_by(movie_id: params[:id])
    if @user_movie.update(score: params[:user_movie][:score])
      render json: @user_movie
    else
      render json: {:message=>@user_movie.errors.full_messages}, status: 422
    end
  end
end
