class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, presence: true, uniqueness: true
      t.string :avatar
      t.string :password_digest
    end
  end
end
