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

  # process :generate_mp3
  #

  # storage :file

  process :generate_mp3
  process :set_mp3_content_type

  # UPLOAD_EXTENSION = ".webm"
  # def generate_mp3
  #   temp_path = current_path.gsub(UPLOAD_EXTENSION, ".copy#{UPLOAD_EXTENSION}")
  #   self.file.copy!(temp_path)
  #   self.file.move_to(current_path.gsub(UPLOAD_EXTENSION, ".mp3"))
  #   binding.pry
  #   File.unlink(current_path)
  #   # ffmpeg -i inputfile.wav -acodec libmp3lame -f mp3 watermarked.mp3
  #   `ffmpeg -i "#{temp_path}" -sn -y -acodec libmp3lame -aq 4 -f mp3 "#{current_path}"`
  #   self.file.content_type = ::MIME::Types.type_for(current_path).first.to_s
  # end

  def generate_mp3
    temp_path = current_path.gsub(".weba", ".mp3")
    # ffmpeg -i inputfile.wav -acodec libmp3lame -f mp3 watermarked.mp3
    puts current_path
    puts temp_path
    # `ffmpeg -i "#{current_path}" -sn -y -acodec libmp3lame -aq 4 -f mp3 "#{temp_path}"`
    `ffmpeg -i "#{current_path}" -sn -y -c:a libmp3lame -aq 4 -f mp3 "#{temp_path}"`
    File.unlink(current_path)
    # FileUtils.cp(temp_path,"uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}")
    FileUtils.mv(temp_path, current_path)
    # binding.pry
  end

  def set_mp3_content_type
    file.content_type = 'audio/mp3'
  end
end
