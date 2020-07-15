class ConcertSerializer < ActiveModel::Serializer
  attributes :id, :artist, :date, :time, :attended
  belongs_to :venue
end
