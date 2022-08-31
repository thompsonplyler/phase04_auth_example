class CastMemberSerializer < ActiveModel::Serializer
    attributes :id, :name, :role
    belongs_to :production
  
    # More examples of ways to customize attributes 
    # def budget
    #   "$#{'%.2f' % object.budget}"
    # end 
  
    # def ongoing
    #   object.ongoing ? "Activley Showing": "Not Showing"
    # end 
  end
  