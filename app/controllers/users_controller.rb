class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to flights_path, :notice => "Signed up!"
    else
      render "new"
    end
  end

  def show
    @user = User.find(params[:id])
    if current_user.id == @user.id
      user_path(@user)
    else
      redirect_to user_path(current_user)
    end
  end

  private
    def user_params
      params.require(:user).permit(:username, :password)
    end
end
