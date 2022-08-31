class Ticket < ApplicationRecord
  belongs_to :production
  belongs_to :user
end
