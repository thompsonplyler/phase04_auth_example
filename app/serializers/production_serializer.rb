class ProductionSerializer < ActiveModel::Serializer
  attributes :id, :title, :genre, :description, :budget, :image, :director, :ongoing
  has_many :cast_members

  # More examples of ways to customize attributes 
  # def budget
  #   "$#{'%.2f' % object.budget}"
  # end 

  # def ongoing
  #   object.ongoing ? "Activley Showing": "Not Showing"
  # end 
end
