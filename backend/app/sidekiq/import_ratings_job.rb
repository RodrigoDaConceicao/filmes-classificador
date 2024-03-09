class ImportRatingsJob
    include Sidekiq::Job

    require 'csv'

    def perform(csv, separator)
        user_movies = CSV.parse(csv, headers: true, col_sep: separator).map { |val| val.to_h.transform_keys(&:to_sym) }

        begin
            user_movies.map { |user_movie| UserMovie.new(user_movie).save }
        rescue Exception => e
            puts e.message
        end
    end
end