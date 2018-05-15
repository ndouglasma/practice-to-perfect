Rails.application.routes.draw do
  root to: 'pages#root'

  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :questions, only: [:index]
      resources :mock_interviews, only: [:show, :create]
      resources :user_responses, only: [:create]
      resources :question_categories, only: [:index, :show] do
        resources :questions, only: [:index]
      end
    end
  end
end
