require 'aws-sdk-transcribeservice'

# Used to invoke AWS TranscribeService through Ruby SDK
module AwsTranscribeHelper
  def aws_get_transcribe_job_status(input_job_name)
    client = Aws::TranscribeService::Client.new

    resp = client.get_transcription_job({
      transcription_job_name: input_job_name
    })

    return resp
  end

  def aws_start_transcribe_job(input_job_name, input_audio_url)
    client = Aws::TranscribeService::Client.new

    resp = client.start_transcription_job({
      transcription_job_name: input_job_name,
      language_code: "en-US",
      media_format: "mp3",
      media: {
        media_file_uri: input_audio_url
      }
    })

    resp
  end
end
