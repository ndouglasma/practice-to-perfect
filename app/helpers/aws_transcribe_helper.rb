require 'aws-sdk-transcribeservice'

module AwsTranscribeHelper

  def aws_transcribe_job_exist?(input_job)
    client = Aws::TranscribeService::Client.new

    resp = client.list_transcription_jobs({
      job_name_contains: input_job,
      next_token: "NextToken"
    })

    if resp.transcription_job_summaries.length === 1
      puts "#{job.transcription_job_name} => #{job.transcription_job_status}"
      return true
    else
      return false
    end
  end

  def aws_start_transription_job(input_job_name, input_audio_url)
    client = Aws::TranscribeService::Client.new

    resp = client.start_transcription_job({
      transcription_job_name: input_job_name,
      language_code: "en-US",
      media_format: "mp4",
      media: {
        media_file_uri: input_audio_url
      }
    })

    resp
  end
end
