require 'aws-sdk-s3'

# Used to invoke AWS S3 service through Ruby SDK
module AwsS3Helper
  def aws_s3_bucket_exist?(input_bucket)
    bucket_exists = false
    # Get an Amazon S3 resource
    s3_client = Aws::S3::Client.new(region: ENV['AWS_REGION'])

    begin
      resp = s3_client.head_bucket({bucket: input_bucket, use_accelerate_endpoint: false})
      bucket_exists = true
      rescue
    end
    !!bucket_exists
  end
end
