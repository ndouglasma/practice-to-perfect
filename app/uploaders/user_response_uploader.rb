require 'fog/aws'

class UserResponseUploader < CarrierWave::Uploader::Base
  include CarrierWave::Audio

  if Rails.env.test?
    storage :file
  else
    storage :fog
  end

  # You can find full list of custom headers in AWS SDK documentation on
  # AWS::S3::S3Object
  def download_url(filename)
    url(response_content_disposition: %Q{attachment; filename="#{filename}"})
  end

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
end
