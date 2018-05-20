require 'fog/aws'
#
class UserResponseUploader < CarrierWave::Uploader::Base
  if Rails.env.test?
    storage :file
  else
    storage :fog
  end

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def full_filename(for_file)
    super.chomp(File.extname(super)) + '.mp3'
  end

  process :generate_mp3
  process :set_mp3_content_type

  def generate_mp3
    temp_path = current_path.gsub(".weba", ".mp3")
    `ffmpeg -i "#{current_path}" -sn -y -c:a libmp3lame -aq 4 -f mp3 "#{temp_path}"`
    File.unlink(current_path)
    FileUtils.mv(temp_path, current_path)
  end

  def set_mp3_content_type
    file.content_type = 'audio/mp3'
  end
end
