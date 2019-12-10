class Transaction < ApplicationRecord

  belongs_to :user
  belongs_to :cryptocurrency

  enum purchase_type:  [ :cad, :crypto ]

  def user_email
    if self.guest_email.present?
      self.guest_email
    else
      self.user.email
    end
  end

  def crypto_price
    (self.order_total / self.amount_of_coin).round(2)
  end
end
