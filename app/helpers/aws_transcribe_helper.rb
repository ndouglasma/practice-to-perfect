require 'aws-sdk-transcribeservice'

module AwsTranscribeHelper

  # def aws_transcribe_job_exist?(input_job_name)
  #   client = Aws::TranscribeService::Client.new
  #
  #   resp = client.list_transcription_jobs({
  #     job_name_contains: input_job_name,
  #     next_token: "NextToken"
  #   })
  #
  #   if resp.transcription_job_summaries.length === 1
  #     puts "#{job.transcription_job_name} => #{job.transcription_job_status}"
  #     return true
  #   else
  #     return false
  #   end
  # end

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

  def aws_get_transcribe_results(input_job_name)
    client = Aws::TranscribeService::Client.new

    resp = client.get_transcription_job({
      transcription_job_name: input_job_name
    })

    puts resp
    resp
  end
end
