require 'aws-sdk-transcribeservice'

module AwsTranscribeHelper

  def transcribe_job_exist?(input_job)
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

  def start_transription(input_job_name, input_media_file_uri)
    client = Aws::TranscribeService::Client.new

    resp = client.start_transcription_job({
      transcription_job_name: input_job_name,
      language_code: "en-US",
      media_format: "mp4",
      media: {
        media_file_uri: input_media_file_uri
      }
    })


    # resp.transcription_job.transcription_job_status #=> String, one of "IN_PROGRESS", "FAILED", "COMPLETED"
    # resp.transcription_job.transcript.transcript_file_uri #=> String
    # resp.transcription_job.creation_time #=> Time
    # resp.transcription_job.completion_time #=> Time
    # resp.transcription_job.failure_reason #=> String
  end
end
