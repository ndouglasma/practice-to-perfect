require 'httparty'

class AwsTranscribeJsonParser
  attr_reader :data

  def initialize
    @data = ''
  end

  def get_json(input_transcript_file_uri)
    response = HTTParty.get(input_transcript_file_uri)
    # binding.pry
    # grab the transcriped text from the response.  At this time not processing jobName, accountId, results.items (opportunity for more granular investigation of text i.e. start/end times and confidence levels of transcribed words), or status
    json_data = JSON.parse(response)
    transcribe_data_string = json_data["results"]["transcripts"][0]["transcript"]

    #split string into array for future parsing
    transcribe_data_array = transcribe_data_string.split(' ')
    @data = transcribe_data_array
  end
end
