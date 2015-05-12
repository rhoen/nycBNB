class User < ActiveRecord::Base
  validates :email, :password_digest, presence: true
end
