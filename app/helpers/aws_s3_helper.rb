require 'aws-sdk-s3'

module AwsS3Helper
  NO_SUCH_BUCKET = "The bucket '%s' does not exist!"

  # Get an Amazon S3 resource
  s3_client = Aws::S3::Resource.new(region: 'us-east-1')
  ptp_bucket = ENV["S3_BUCKET"]

  def s3_bucket_exist?(input_bucket)
    bucket_exists = false
    begin
      s3_client_response = s3_client.head_bucket({bucket: ptp_bucket, use_accelerate_endpoint: false})
      bucket_exists = true
      rescue
    end
    !!bucket_exists
  end

  def s3_media_file_upload(input_file_name)
    # Make sure S3 bucket exists before proceeding
    if s3_bucket_exist?(ptp_bucket)
      name = File.basename(input_file_name)
      # Create the object to upload
      obj = s3_client.bucket(ptp_bucket).object(name)
      # Upload it
      obj.upload_file(name, { acl: 'bucket-owner-full-control' })

      # Return public URI to the media file
      return obj.public_url
    else
      return "ERROR: The bucket '%ptp_bucket' does not exist."
    end
  end
end
