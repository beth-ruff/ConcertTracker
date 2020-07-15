class ConcertsController < ApplicationController
  before_action :set_concert, only: [:show, :update, :destroy]

  # GET /concerts
  def index
    @concerts = Concert.all

    render json: @concerts
  end

  # GET /concerts/1
  def show
    render json: @concert
  end

  # POST /concerts
  def create
    @concert = Concert.new(concert_params)

    if @concert.save
      render json: @concert, status: :created, location: @concert
    else
      render json: @concert.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /concerts/1
  def update
    if @concert.update(concert_params)
      render json: @concert
    else
      render json: @concert.errors, status: :unprocessable_entity
    end
  end

  # DELETE /concerts/1
  def destroy
    @concert.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_concert
      @concert = Concert.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def concert_params
      params.require(:concert).permit(:venue_id, :artist, :date, :time, :attended)
    end
end
