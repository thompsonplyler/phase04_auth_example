class UserSerializer < ActiveModel::Serializer
  attributes :username, :id
  has_many :tickets
  has_many :productions

end
