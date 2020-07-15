class VenueSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :phone_number
  has_many :concerts
end
