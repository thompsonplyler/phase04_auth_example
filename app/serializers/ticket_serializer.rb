class TicketSerializer < ActiveModel::Serializer
  attributes :price, :user, :production
  # has_one :production
  has_one :user

  def production
    {title:object.production.title}
  end 
end
