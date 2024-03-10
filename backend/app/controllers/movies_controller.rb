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
    @movie = Movie.left_joins(:user_movies)
    .select("movies.*, avg(score) as average_score, count(user_movies.score) as vote_cout")
    .group(:id)
    .find(params[:id])
    @score = @movie.user_movies.find_by(user_id: current_user&.id)&.score
    render json: @movie.attributes().merge({"user_score"=>@score})
  end

  def index
    if !!params[:user_id] && current_user.id == params[:user_id].to_i
      @movie = Movie.select("movies.*, avg(user_movies.score) as average_score, count(user_movies.score) as vote_count,"+
      "(select user_movies.score from user_movies as umo2 where movies.id = umo2.movie_id and user_id = #{current_user.id}) as user_score").left_joins(:user_movies)
      .where("user_movies.user_id = "+ current_user.id.to_s)
      .group(:movie_id)
      render json: @movie
    elsif !params[:user_id]
      render json: Movie.all.to_json(methods: [:average_score, :vote_count]);
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
