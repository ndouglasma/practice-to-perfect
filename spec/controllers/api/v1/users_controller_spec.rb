require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  let!(:test_user) { User.create!(provider: 'github', github_name: 'Natalie Douglas', github_id: 37456880, sign_in_count: 8, github_login: 'ndouglasma', github_avatar_url: 'https://avatars3.githubusercontent.com/u/37456880?v=4') }
  describe "GET#index" do
    it "should return a requested user" do
      get(:index, session: {'user_id' => test_user.id})

      # Goes against UserShowSerializer
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 10
      expect(returned_json['id']).to eq 1
      expect(returned_json['github_id']).to eq 37456880
      expect(returned_json['github_login']).to eq 'ndouglasma'
      expect(returned_json['github_name']).to eq 'Natalie Douglas'
      expect(returned_json['sign_in_count']).to eq 8
      expect(returned_json['total_interviews']).to eq 0
      expect(returned_json['total_categories']['specific_category']).to eq 0
      expect(returned_json['total_categories']['surprise_category']).to eq 0
      expect(returned_json['total_user_responses']).to eq 0
      expect(returned_json['first_and_last_interview_dates']['first_interview_date']).to be_nil
      expect(returned_json['first_and_last_interview_dates']['last_interview_date']).to be_nil
      expect(returned_json['user_interview_list'].length).to eq 2
      expect(returned_json['user_interview_list']['interviews'].length).to eq 0
      expect(returned_json['user_interview_list']['category_counts'][0]['name']).to eq 'Behavioral'
      expect(returned_json['user_interview_list']['category_counts'][0]['count']).to eq 0
      expect(returned_json['user_interview_list']['category_counts'][1]['name']).to eq 'Problem-solving'
      expect(returned_json['user_interview_list']['category_counts'][1]['count']).to eq 0
      expect(returned_json['user_interview_list']['category_counts'][2]['name']).to eq 'Motivational'
      expect(returned_json['user_interview_list']['category_counts'][2]['count']).to eq 0
      expect(returned_json['user_interview_list']['category_counts'][3]['name']).to eq 'Technical Skills'
      expect(returned_json['user_interview_list']['category_counts'][3]['count']).to eq 0
      expect(returned_json['user_interview_list']['category_counts'][4]['name']).to eq 'Informational'
      expect(returned_json['user_interview_list']['category_counts'][4]['count']).to eq 0
    end
  end
end
