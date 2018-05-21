require 'rails_helper'

RSpec.describe QuestionCategory, type: :model do
  let(:question_category) do
    FactoryBot.build(:question_category)
  end

  it 'requires a name' do
    question_category.name = nil
    expect(question_category.save).to eq(false)
    expect(question_category.errors[:name]).to_not be_nil
  end

  it "should have many questions" do
    t = QuestionCategory.reflect_on_association(:questions)
    expect(t.macro).to eq(:has_many)
  end

  it "should have many user selected categories" do
    t = QuestionCategory.reflect_on_association(:user_selected_categories)
    expect(t.macro).to eq(:has_many)
  end
end
