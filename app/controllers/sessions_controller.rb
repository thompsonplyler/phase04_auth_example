class SessionsController < ApplicationController

  def create
    user = User.find_by_username(params[:username])
    
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: {user: user}, status: :ok
    else
      render json: {errors: "Invalid Credentials"}, status: :unauthorized
    end

  end

  def index
    if session[:user_id]
      session[:session_hello]  ||= "World"
      cookies[:session_hello]  ||= "World"
      render json: {session: session, cookies: cookies.to_hash}
    else
      render json: {message: "No active session."}
    end
  end

  def destroy
    session.delete(:user_id)
  end

  private 

  # def session_params
  #   params.permit(:username, :password)
  # end
end
