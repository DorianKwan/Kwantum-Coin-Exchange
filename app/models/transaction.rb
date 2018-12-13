class Transaction < ApplicationRecord

  belongs_to :user

  enum type_of_crypto: [ :bitcoin, :ethereum ]
  enum purchase_type:  [ :cad, :crypto ]

  def user_email
    if self.guest_email.present?
      self.guest_email
    else
      self.user.email
    end
  end
end
