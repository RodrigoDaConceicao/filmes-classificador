class UserMovie < ApplicationRecord
  belongs_to :user
  belongs_to :movie
  validates :score, numericality: { only_integer: true, in: 1..10 }
  validates :user_id, uniqueness: { scope: :movie_id }

end
