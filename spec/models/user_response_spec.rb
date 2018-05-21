require 'rails_helper'

RSpec.describe UserResponse, type: :model do
  let(:user_response) do
    FactoryBot.build(:user_response)
  end

  it 'requires a user' do
    user_response.user_id = nil
    expect(user_response.save).to eq(false)
    expect(user_response.errors[:user_id]).to_not be_nil
  end

  it 'requires a mock interview' do
    user_response.mock_interview_id = nil
    expect(user_response.save).to eq(false)
    expect(user_response.errors[:mock_interview_id]).to_not be_nil
  end

  it 'requires a question' do
    user_response.question_id = nil
    expect(user_response.save).to eq(false)
    expect(user_response.errors[:question_id]).to_not be_nil
  end

  it 'requires audio' do
    user_response.audio = nil
    expect(user_response.save).to eq(false)
    expect(user_response.errors[:audio]).to_not be_nil
  end

  it "should have 1 user" do
    t = UserResponse.reflect_on_association(:user)
    expect(t.macro).to eq(:belongs_to)
  end

  it "should have 1 mock interview" do
    t = UserResponse.reflect_on_association(:mock_interview)
    expect(t.macro).to eq(:belongs_to)
  end

  it "should have 1 question" do
    t = UserResponse.reflect_on_association(:question)
    expect(t.macro).to eq(:belongs_to)
  end
end
