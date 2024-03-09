class MoviesController < ApplicationController
  before_action :authorize_admin!, only:[:create, :import]

  def import
    separator = (params[:separator] == 'comma' ? ',' : ';')
    begin
    ImportMoviesJob.perform_async request.raw_post, separator
    rescue Exception => e
      puts e.message
      render json: {:message=>"Internal server error"}, status: 500
    else
      render json: {:message=>"Ok"}, status: 200
    end
  end

  def show
    current_user
    @user_movie = UserMovie.find_by(movie_id: params[:id], user_id: current_user.id)
    @movie = Movie.select("movies.*, avg(user_movies.score) as average_score, count(1) as vote_count",
       "#{@user_movie ? @user_movie[:score] : 0} as user_score")
    .left_joins(:user_movies)
    .where(id:params[:id])
    .group(:movie_id)
    render json: @movie.first
  end

  def index
    if !!params[:user_id] && current_user.id == params[:user_id].to_i
      @movie = Movie.select("movies.*, avg(user_movies.score) as average_score, count(1) as vote_count,"+
      '(select user_movies.score from user_movies as umo2 where movies.id = umo2.movie_id and user_id = '+current_user.id.to_s+') as user_score').joins(:user_movies)
      .where("user_movies.user_id = "+ current_user.id.to_s)
      .group(:movie_id)
      render json: @movie
    elsif !params[:user_id]
      render json: Movie.all;
    else
      render json: {:message=>"Unprocessable Entity"}, status: 422
    end
  end

  def search
    @movies = Movie.where("title like ?", "%#{params[:query]}%").limit(20)
    render json: @movies.to_json(methods: [:average_score, :vote_count])
  end

  def top_rated
    @movies = Movie.left_joins(:user_movies).group(:id).order("avg(user_movies.score) desc").limit(10)
    render json: @movies.to_json(methods: [:average_score, :vote_count])
  end

  def top_voted
    @movies = Movie.left_joins(:user_movies).group(:id).order("count(user_movies.score) desc").limit(10)
    render json: @movies.to_json(methods: [:average_score, :vote_count])
  end

  def newests
    @movies = Movie.order("release_date desc").limit(10)
    render json: @movies.to_json(methods: [:average_score, :vote_count])
  end

  def create
    @movie = Movie.new(movie_params)
    if @movie.save
      render json: @movie.to_json, status: 201
    else
      render json: {:message=>@movie.errors.full_messages}, status: 422
    end
  end

  private

  def movie_params
    params.require(:movie).permit(:title, :director, :poster_path, :release_date, :overview, :runtime)
  end
end
