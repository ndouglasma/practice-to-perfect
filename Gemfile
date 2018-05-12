source 'https://rubygems.org'
git_source(:github) { |repo| 'https://github.com/#{repo}.git' }

ruby '2.3.3'

gem 'active_model_serializers', '~> 0.10.0'
gem 'aws-sdk-rails'
gem 'aws-sdk-s3'
gem 'aws-sdk-transcribeservice', '~> 1.1'
gem 'bootsnap', '>= 1.1.0', require: false
# gem 'carrierwave'
gem 'carrierwave-base64'
gem 'carrierwave-audio'
gem 'fog-aws'
gem 'jbuilder', '~> 2.5'
gem "omniauth-github"
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 3.11'
gem 'rails', '~> 5.2.0'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'capybara'
  gem 'database_cleaner'
  gem 'dotenv-rails'
  gem 'factory_bot'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'launchy'
  gem 'pry-rails'
  gem 'rails_real_favicon'
  gem 'rspec-rails'
  gem 'shoulda-matchers', require: false
  gem 'valid_attribute'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'coveralls', require: false
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
