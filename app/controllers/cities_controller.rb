class CitiesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    # @cities = City.where(user_id: current_user.id)
  end

  def create
    raise
    @city = City.new(name: params['city_name'])
    respond_to do |format|
      if @city.save
        format.json { render json: { city_name: @city.name, city_id: @city.id } }
      end
    end
  end

  private

  def city_params
    params.require(:city).permit(:name, :user_id)
  end
end
