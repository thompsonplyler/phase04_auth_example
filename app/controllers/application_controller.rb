class ApplicationController < ActionController::API
    include ActionController::Cookies

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found


    def render_unprocessable_entity(invalid)
        render json: {errors: invalid.record.errors}, status: :unprocessable_entity
    end 

     def render_not_found(error)
        #confiure the response to work with the error handleng we have on the frontend. 
        render json: {errors: {error.model => "Not Found"}}, status: :not_found
    end 

    private

    def current_user
        User.find_by(id: session[:user_id])
    end

    def not_found(e)
        render json: { error: e.message }, status: :not_found
      end
end
