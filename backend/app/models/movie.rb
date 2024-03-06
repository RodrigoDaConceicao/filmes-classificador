class Movie < ApplicationRecord
  has_many :user_movies
  has_many :users, through: :user_movies
  validates :title, :director, presence: true
  validates :title, uniqueness: { scope: :director }

  def average_score
    user_movies.average(:score).to_f
  end

  def vote_count
    user_movies.count(:score).to_i
  end

end
