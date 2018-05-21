require 'rails_helper'

RSpec.describe Question, type: :model do
  let(:question) do
    FactoryBot.build(:question)
  end

  it 'requires question category' do
    question.question_category_id = nil
    expect(question.save).to eq(false)
    expect(question.errors[:question_category_id]).to_not be_nil
  end

  it "should have 1 question category" do
    t = Question.reflect_on_association(:question_category)
    expect(t.macro).to eq(:belongs_to)
  end

  it "should have many user responses" do
    t = Question.reflect_on_association(:user_responses)
    expect(t.macro).to eq(:has_many)
  end

  it "should have many users" do
    t = Question.reflect_on_association(:users)
    expect(t.macro).to eq(:has_many)
  end
end
