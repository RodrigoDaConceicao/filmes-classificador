class AddPosterPathReleaseDateOverviewRuntimeToMovie < ActiveRecord::Migration[7.1]
  def change
    add_column :movies, :poster_path, :string
    add_column :movies, :release_date, :date
    add_column :movies, :overview, :text
    add_column :movies, :runtime, :integer
  end
end
