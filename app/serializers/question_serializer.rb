class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :body

  belongs_to :question_category
end
