class UserSelectedCategory < ApplicationRecord
  belongs_to :mock_interview
  belongs_to :question_category

end
