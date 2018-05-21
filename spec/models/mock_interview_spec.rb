require 'rails_helper'

RSpec.describe MockInterview, type: :model do
  let(:mock_interview) do
    FactoryBot.build(:mock_interview)
  end

  it 'requires a user' do
    mock_interview.user_id = nil
    expect(mock_interview.save).to eq(false)
    expect(mock_interview.errors[:user_id]).to_not be_nil
  end

  it 'requires a selected number of questions' do
    mock_interview.selected_num_questions = nil
    expect(mock_interview.save).to eq(false)
    expect(mock_interview.errors[:selected_num_questions]).to_not be_nil
  end

  it "should have 1 user" do
    t = MockInterview.reflect_on_association(:user)
    expect(t.macro).to eq(:belongs_to)
  end

  it "should have many user responses" do
    t = MockInterview.reflect_on_association(:user_responses)
    expect(t.macro).to eq(:has_many)
  end

  it "should have many user selected categories" do
    t = MockInterview.reflect_on_association(:user_selected_categories)
    expect(t.macro).to eq(:has_many)
  end
end
