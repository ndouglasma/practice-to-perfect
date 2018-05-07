Rails.application.routes.draw do
  root to: 'pages#root'

  # namespace :api do
  #   namespace :v1 do
  #     resources :questions, only: [:index]
  #   end
  # end

  namespace :api, defaults: {format: :json} do
    namespace :v1 do
      resources :questions, only: [:index]
      resources :question_categories, only: [:index, :show] do
        resources :questions, only: [:index]
      end
    end
  end
end
