class User < ActiveRecord::Base
  validates :email, :password_digest, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  validates :email, uniqueness: true

  has_many :sessions
  has_many :listings
  attr_reader :password

  def User.generate_token
    SecureRandom.base64
  end

  def User.find_by_credentials(email, password)
    user = User.find_by(email: email)
    if !user.nil? && user.is_password?(password)
      user
    else
      nil
    end
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end


end
