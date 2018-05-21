require 'rails_helper'

RSpec.describe PagesController, type: :controller do

  # test_user = User.create(provider: 'github', github_name: 'Natalie Douglas', github_id: 37456880, sign_in_count: 8, github_login: 'ndouglasma', github_avatar_url: 'https://avatars3.githubusercontent.com/u/37456880?v=4')

  describe "GET#root" do
    it "should get root" do
      get :root
      assert_response :success
    end
  end
end
