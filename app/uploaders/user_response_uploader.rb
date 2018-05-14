# require 'fog/aws'
#
# class UserResponseUploader < CarrierWave::Uploader::Base
#   include CarrierWave::FFmpeg
#
#   if Rails.env.test?
#     storage :file
#   else
#     storage :fog
#   end
#
#   version :mp3 do
#     puts `which ffmpeg`
#     process encode: [:mp3, audio_codec: "a libmp3lame -qscale:a 2"]
#     # process :encode_audio=> [:mp4, audio_codec: "aac",:custom => "-strict experimental -qscale:a 2"]
#
#     # binding.pry
#     def full_filename(for_file)
#       super.chomp(File.extname(super)) + '.mp3'
#     end
#     puts 'MADE IT HERE'
#   end
#
#
#   # You can find full list of custom headers in AWS SDK documentation on
#   # AWS::S3::S3Object
#   def download_url(filename)
#     puts 'INSIDE download_url'
#     url(response_content_disposition: %Q{attachment; filename="#{filename}"})
#   end
#
#   # Directory where uploaded files will be stored on file system or AWS
#   def store_dir
#     puts 'MADE IT IN STORE_+DIR'
#     "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
#   end
# end

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
