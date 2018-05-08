CarrierWave.configure do |config|
  if !Rails.env.test?
    config.storage    = :aws
    if Rails.env.production?
      config.aws_bucket = ENV['S3_BUCKET_LAUNCH_ACADEMY']
    else
      config.aws_bucket = ENV['S3_BUCKET_LAUNCH_ACADEMY']
    end
    config.aws_acl    = 'bucket-owner-full-control'

    # The maximum period for authenticated_urls is only 7 days.
    # config.aws_authenticated_url_expiration = 60 * 60 * 24 * 7

    # Set custom options such as cache control to leverage browser caching
    config.aws_attributes = {
      expires: 1.week.from_now.httpdate,
      cache_control: 'max-age=604800'
    }

    config.aws_credentials = {
      access_key_id:     ENV['AWS_ACCESS_KEY_ID'],
      secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region:            ENV['AWS_REGION']
    }

    # Optional: Signing of download urls, e.g. for serving private
    # content through CloudFront.
    config.aws_signer = -> (unsigned_url, options) { Aws::CF::Signer.sign_url unsigned_url, options }
  end
end
