class CitiesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    @cities = City.where(user_id: current_user.id)
  end

  def create
    @city = City.new(city_params)
    @city.user = current_user
    if @city.save
      redirect_to root_path
      flash[:notice] = "#{@city.name} was added to your dashboard"
    else
     redirect_to root_path
     flash[:alert] = "You forgot to enter the city name !"
    end
    # respond_to do |format|
    #   if @city.save
    #     format.json { render json: { city_name: @city.name, city_id: @city.id } }
    #   end
    # end
  end


  private

  def city_params
    params.require(:city).permit(:name)
  end
end
