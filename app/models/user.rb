class User < ActiveRecord::Base
  validates :email, :password_digest, presence: true
  validates :password {length: minimum: 6, allow_null: true}
end
