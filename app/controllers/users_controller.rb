class UsersController < ApplicationController
    def show 
        user = User.find(params[:id])
        render json: user, status: :ok
    end 
    
    private 

    def user_params
        params.permit(:username, :email)
    end 
end
