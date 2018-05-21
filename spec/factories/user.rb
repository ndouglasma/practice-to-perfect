require 'factory_bot'

FactoryBot.define do
  factory :user do
    provider 'github'
    sequence(:github_id) { |n| }
    sequence(:github_login) { |n| "github_login#{n}"}
    github_avatar_url 'https://avatars3.githubusercontent.com/u/37456880?v=4'
    sequence(:github_name) { |n| "GitHub Name #{n}"}
  end
end
