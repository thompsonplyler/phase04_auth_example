class User < ApplicationRecord
    has_many :tickets
    has_many :productions, through: :tickets
    validates :username, uniqueness: true
    has_secure_password

    # password
    # password=
    # password_confirmation
    # authenticate

end
