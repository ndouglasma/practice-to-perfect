require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) do
    FactoryBot.build(:user)
  end

  it 'requires a provider to equal GitHub' do
    user.provider = nil
    expect(user.save).to eq(false)
    expect(user.errors[:provider]).to_not be_nil
  end

  it 'requires a GitHub ID' do
    user.github_id = nil
    expect(user.save).to eq(false)
    expect(user.errors[:github_id]).to_not be_nil
  end

  it 'requires a GitHub Login' do
    user.github_login = nil
    expect(user.save).to eq(false)
    expect(user.errors[:github_login]).to_not be_nil
  end

  it 'requires a GitHub Avatar URL to start with http or https' do
    user.github_avatar_url = 'avatars3.githubusercontent.com/u/37456880?v=4'
    expect(user.save).to eq(false)
    expect(user.errors[:github_avatar_url]).to eq ['is invalid']
  end

  it 'requires a GitHub Name' do
    user.github_name = nil
    expect(user.save).to eq(false)
    expect(user.errors[:github_name]).to_not be_nil
  end

  it "should have many user responses" do
    t = User.reflect_on_association(:user_responses)
    expect(t.macro).to eq(:has_many)
  end

  it "should have many mock interviews" do
    t = User.reflect_on_association(:mock_interviews)
    expect(t.macro).to eq(:has_many)
  end

  it "should have many questions" do
    t = User.reflect_on_association(:questions)
    expect(t.macro).to eq(:has_many)
  end

end
