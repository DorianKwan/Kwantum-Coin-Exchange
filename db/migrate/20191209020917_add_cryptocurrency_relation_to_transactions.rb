class AddCryptocurrencyRelationToTransactions < ActiveRecord::Migration[5.1]
  def change
    remove_column :transactions, :type_of_crypto, :integer
    add_reference :transactions, :cryptocurrency, foreign_key: true
  end
end
