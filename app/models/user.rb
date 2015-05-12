class User < ActiveRecord::Base
  validates :email, :password_digest, presence: true
  validates :password {length: minimum: 6, allow_null: true}

  def User.find_by_credentials(email, password)

  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end


end
