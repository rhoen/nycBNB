# == Schema Information
#
# Table name: sessions
#
#  id            :integer          not null, primary key
#  user_id       :integer
#  session_token :string
#

class Session < ActiveRecord::Base
  validates :user_id, :session_token, presence: true
  validates :session_token, uniqueness: true

  belongs_to :user
end
