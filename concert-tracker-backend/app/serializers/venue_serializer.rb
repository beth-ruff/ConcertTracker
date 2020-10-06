class VenueSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :address2, :city, :state, :zip, :phone_number
  has_many :concerts
end
