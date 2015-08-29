class UsersController < ApplicationController
  before_filter :get_user, only: [:show, :edit, :update]

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to flights_path, :notice => "Signed up!"
    else
      render "new"
    end
  end

  def show
    @friendship = Friendship.find_by(user_id: @user.id, friend_id: current_user.id) || Friendship.find_by(user_id: current_user.id, friend_id: @user.id)
    if current_user.id == @user.id
      user_path(@user)
    elsif current_user.all_friends.include?(@user) && @friendship.approved
      user_path(@user)
    else
      render "private"
    end
  end

  def edit
  end

  def update
    file = params[:user][:file]
    file ? @user.avatar = file : @user.remote_avatar_url = params[:user][:remote_avatar_url]
    @user.save
    redirect_to user_path(user)
  end

  def autocomplete_username
    term = params[:q].downcase
    @users = User.where("lower(username) LIKE '%#{term}%'")
    respond_to do |format|
      format.json { render json: @users.map(&:username) }
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

  def get_user
    @user = User.find(params[:id])
  end
end
