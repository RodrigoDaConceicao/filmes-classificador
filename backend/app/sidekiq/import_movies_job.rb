class ImportMoviesJob
    include Sidekiq::Job

    def perform(csv, separator)
        movies = CSV.parse(csv, headers: true, col_sep: separator).map { |val| val.to_h.transform_keys(&:to_sym) }

        begin
            movies.map { |movie| Movie.new(movie).save }
        rescue Exception => e
            puts e.message
        end
    end
end