require 'sidekiq/web'

Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  # get "up" => "rails/health#show", as: :rails_health_check
  resources :users, only: [:create] do 
    resources :movies, only: [:index]
  end
  resources :sessions, only: [:create, :destroy] do
    collection do
      get :logged_in
    end  
  end
  resources :movies, only: [:index, :create, :show] do
    collection do 
      get :search 
      get :top_rated
      get :top_voted
      get :newests
      post :import
    end
  end
  resources :user_movies, only: [:create, :update] do
    collection do
      post :import
    end
  end

  mount Sidekiq::Web => '/sidekiq'

  delete '/logout', to: 'sessions#destroy'
end
