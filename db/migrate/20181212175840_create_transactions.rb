class CreateTransactions < ActiveRecord::Migration[5.1]
  def change
    create_table :transactions do |t|
      t.references :users
      t.integer    :type_of_crypto,    null: false
      t.integer    :purchase_type,     null: false
      t.float      :amount_of_coin,    null: false
      t.float      :order_total,       null: false
      t.string     :guest_email,       null: false
      t.timestamps
    end
  end
end
