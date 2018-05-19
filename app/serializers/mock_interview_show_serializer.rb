class MockInterviewShowSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :selected_num_questions, :transcribe_results

  def count_occurrences(input_array, find_word)
    count = 0

    input_array.each do | word |
      # strip special characters from word
      sanitized_word = word.gsub(/[^0-9A-Za-z]/, '')
      if sanitized_word.downcase === find_word.downcase
        count += 1
      end
    end
    return count
  end

  def transcribe_results
    result = {}
    total_words = 0
    total_likes = 0
    total_ums = 0

    status_result = object.transcribe_status
    transcribe_data = []

    if status_result === 'COMPLETED'
      # Loop through each response and attach to json data
      object.user_responses.each do |user_response|
        custom_user_response = {}
        parser_result = AwsTranscribeJsonParser.new
        parser_result.get_json(user_response.aws_transcribe_transcript_file_uri)
        custom_user_response[:id] = user_response.id
        custom_user_response[:question_id] = user_response.question_id
        custom_user_response[:data] = parser_result.data

        count_words = parser_result.data.length
        count_like = count_occurrences(parser_result.data, 'like')
        count_um = count_occurrences(parser_result.data, 'um')
        custom_user_response[:total_words] = count_words
        custom_user_response[:total_likes] = count_like
        custom_user_response[:total_ums] = count_um

        total_words += count_words
        total_likes = count_like
        total_ums = count_um

        transcribe_data.push(custom_user_response)
      end
    end

    result[:status] = status_result
    result[:json] = transcribe_data
    result[:total_words] = total_words
    result[:total_likes] = total_likes
    result[:total_ums] = total_ums

    return result
  end
end
