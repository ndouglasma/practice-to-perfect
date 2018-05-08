class UserResponseUploader < CarrierWave::Uploader::Base
  if Rails.env.test?
    storage :file
  else
    storage :aws
  end

  def download_url(filename)
    url(response_content_disposition: %Q{attachment; filename="#{filename}"})
  end

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
end
