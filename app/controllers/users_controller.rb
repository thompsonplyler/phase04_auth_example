class UsersController < ApplicationController

    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :ok
        else
            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def show
        # byebug
        if current_user
            
          render json: current_user, status: :ok
        else
          render json: { error: 'No active session' }, status: :unauthorized
        end
    end
    
    private 

    def user_params
        params.permit(:username, :email, :password, :id)
    end 
end
