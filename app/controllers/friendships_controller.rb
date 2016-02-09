class FriendshipsController < ApplicationController
  def create
    @newfriendship = Friendship.new
    friend = params[:friend_id] ? User.find(params[:friend_id]) : User.find_by(username: params[:friendship][:username])
    @friendship = current_user.friendships.build(friend_id: friend.id)
    if @friendship.save
      flash[:notice] = "Friend Request Sent"
    else
      flash[:error] = "Unable to add friend"
    end
    redirect_to root_url
  end

  def approve
    friendship = Friendship.find(params[:id])
    friendship.approve!
    render json: friendship
  end

  def destroy
    friendship = Friendship.find(params[:id])
    friendship.destroy
    flash[:notice] = "Removed friend!"
    render json: friendship
  end
end
