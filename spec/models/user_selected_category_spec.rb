require 'rails_helper'

RSpec.describe UserSelectedCategory, type: :model do
  let(:user_selected_category) do
    FactoryBot.build(:user_selected_category)
  end

  it 'requires a mock interview' do
    user_selected_category.mock_interview_id = nil
    expect(user_selected_category.save).to eq(false)
    expect(user_selected_category.errors[:mock_interview_id]).to_not be_nil
  end

  it 'requires a question category' do
    user_selected_category.question_category_id = nil
    expect(user_selected_category.save).to eq(false)
    expect(user_selected_category.errors[:question_category_id]).to_not be_nil
  end

  it "should have 1 mock interview" do
    t = UserSelectedCategory.reflect_on_association(:mock_interview)
    expect(t.macro).to eq(:belongs_to)
  end

  it "should have 1 question category" do
    t = UserSelectedCategory.reflect_on_association(:question_category)
    expect(t.macro).to eq(:belongs_to)
  end
end
