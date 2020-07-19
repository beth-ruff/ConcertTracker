class Concert < ApplicationRecord
  belongs_to :venue
  validates :name, presence :true
end
