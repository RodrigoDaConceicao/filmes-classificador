class MoviesController < ApplicationController
  before_action :authorize_admin!, only:[:create]

  def index
    @movies = Movie.all
    render json: @movies.to_json(methods: [:average_score, :vote_count])
  end

  def search
    @movies = Movie.where("title like ?", "%#{params[:query]}%")
    render json: @movies.to_json(methods: [:average_score, :vote_count])
  end

  def top_rated
    @movies = Movie.left_joins(:user_movies).group(:movie_id).order("avg(user_movies.score) desc").limit(10)
    render json: @movies.to_json(methods: [:average_score, :vote_count])
  end

  def popular
    @movies = Movie.left_joins(:user_movies).group(:movie_id).order("count(user_movies.score) desc").limit(10)
    render json: @movies.to_json(methods: [:average_score, :vote_count])
  end

  def most_recent
    @movies = Movie.order("release_date desc").limit(10)
    render json: @movies.to_json(methods: [:average_score, :vote_count])
  end

  def create
    @movie = Movie.new(movie_params)
    if @movie.save
      ender json: @movie.to_json, status: 201
    else
      render json: {:message=>@movie.errors.full_messages}, status: 422
    end
  end

  private

  def movie_params
    params.require(:movie).permit(:title, :director, :poster_path, :release_date, :overview, :runtime)
  end
end
