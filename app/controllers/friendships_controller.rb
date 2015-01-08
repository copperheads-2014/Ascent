class FriendshipsController < ApplicationController
  def create
    if params[:friend_id]
      friend = User.find(params[:friend_id])
    else
      friend = User.find_by(username: params[:friendship][:username])
    end
    @friendship = current_user.friendships.build(friend_id: friend.id)
    if @friendship.save
      flash[:notice] = "Friend Request Sent"
      redirect_to root_url
    else
      flash[:error] = "Unable to add friend"
      redirect_to root_url
    end
  end

  def approve
    @friendship = Friendship.find(params[:id])
    @friendship.approve!
    render json: @friendship
  end

  def destroy
    @friendship = Friendship.find(params[:id])
    @friendship.destroy
    flash[:notice] = "Removed friend!"
    render json: @friendship
  end
end
