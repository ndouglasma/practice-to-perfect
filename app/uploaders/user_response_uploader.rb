require 'fog/aws'

class UserResponseUploader < CarrierWave::Uploader::Base
  # include CarrierWave::FFmpeg
  if Rails.env.test?
    storage :file
  else
    storage :fog
  end

  version :mp3 do
    process :generate_mp3

    def full_filename(for_file)
      super.chomp(File.extname(super)) + '.mp3'
    end
  end

  # AWS::S3::S3Object
  def download_url(filename)
    url(response_content_disposition: %Q{attachment; filename="#{filename}"})
  end

  def generate_mp3
    response = `ffmpeg -i "#{self.file.path}" "#{self.file.path.gsub(".weba", ".mp3")}"`
  end

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end
end
