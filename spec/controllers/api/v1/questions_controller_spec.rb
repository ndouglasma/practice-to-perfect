require 'rails_helper'

RSpec.describe Api::V1::QuestionsController, type: :controller do
  let!(:test_question_category) { QuestionCategory.create!(name: 'Behavioral') }
  let!(:test_question1) { Question.create!(body: "Queston 1?", question_category: test_question_category) }
  let!(:test_question2) { Question.create!(body: "Queston 2?", question_category: test_question_category) }
  let!(:test_question3) { Question.create!(body: "Queston 3?", question_category: test_question_category) }

  describe "GET#index" do
    it "should return a list of all questions" do
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")

      expect(returned_json.length).to eq 3
      expect(returned_json[0]["body"]).to eq "Queston 1?"
      expect(returned_json[1]["body"]).to eq "Queston 2?"
      expect(returned_json[2]["body"]).to eq "Queston 3?"

      expect(returned_json[0]["question_category"]["id"]).to eq(test_question_category.id)
      expect(returned_json[1]["question_category"]["id"]).to eq(test_question_category.id)
      expect(returned_json[2]["question_category"]["id"]).to eq(test_question_category.id)
    end
  end
end
