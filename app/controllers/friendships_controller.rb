class FriendshipsController < ApplicationController
  def index
    redirect_to :root
  end

  def create
     Friendship.create!(user_id: current_user.id, friend_id: friendship_params[:friend_id])
     redirect_to :root
   end

   private
   def friendship_params
    params.require(:new_friendship).permit(:user_id, :friend_id)
   end
end
