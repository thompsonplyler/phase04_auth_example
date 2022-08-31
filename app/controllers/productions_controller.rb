class ProductionsController < ApplicationController

    def index 
        render json: Production.all, status: :ok
    end 

    def show
        production = Production.find(params[:id])
        render json: production, include: :cast_members, status: :ok
    end 

    def create
        production = Production.create!(production_params)
        render json: production, status: :created
    end 

    def update 
       #Review error handling and create a rescue for RecordNotFound
        #Add the ! to update so it raises an exception

        production = Production.find(params[:id])
        production.update!(production_params)
        render json: production, status: :accepted
    end 

    def destroy
        production = Production.find(params[:id])
        production.destroy
        head :no_content 
    end 

    private
    
    #Review strong params and why they are useful with updates
    def production_params
        params.permit(:title, :genre, :description, :budget, :image, :director, :ongoing)
    end 

end
