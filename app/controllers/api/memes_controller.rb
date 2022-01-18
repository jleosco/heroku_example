class Api::MemesController < ApplicationController

  def index
    render json: Meme.all
  end

  def create
    file = params[:file]
    if(file)
      begin
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resources_type: 'auto')
      rescue =>e
        render json: {errors: e}, status: 422
        return
      end
    end

    meme = Meme.new(title: params[:title], image_url: cloud_image['secure_url'])
    if(meme.save)
      render json: meme
    else
      render json: {errors: meme.errors}, status: 422
    end
  end

end
