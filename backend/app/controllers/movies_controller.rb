class MoviesController < ApplicationController
  before_action :authorize_admin!, only:[:new, :create]

  def index
    @movies = Movie.all
    respond_to do |format|
      format.html
      format.json { render json: @movies.to_json(methods: :average_score) }
    end
  end

  def new
    @movie = Movie.new
  end

  def create
    @movie = Movie.new(movie_params)
    if @movie.save
      respond_to do |format|
        format.html { redirect_to movies_path, notice: "Movie was successfully created." }
        format.json { render json: @movie.to_json }
      end
    else
      respond_to do |format|
        format.html { render :new }
        format.json { render json: {:message=>@movie.errors.full_messages}, status: 422 }
      end
      
    end
  end

  private

  def movie_params
    params.require(:movie).permit(:title, :director)
  end
end
