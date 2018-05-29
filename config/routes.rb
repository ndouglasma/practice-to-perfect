Rails.application.routes.draw do
  root 'pages#root'

  get '/auth/:provider/callback' => 'sessions#create'
  # get '/user/current_user' => 'sessions#get_current_user'
  get '/signout' => 'sessions#destroy', :as => :signout
  get '/auth/failure' => redirect('/')

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :show]
      resources :questions, only: [:index]
      resources :mock_interviews, only: [:show, :create]
      resources :user_responses, only: [:create]
      resources :question_categories, only: [:index, :show] do
        resources :questions, only: [:index]
      end
    end
  end
end
