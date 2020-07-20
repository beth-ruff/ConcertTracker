class Venue < ApplicationRecord
    has_many :concerts, :dependent => :destroy
end
