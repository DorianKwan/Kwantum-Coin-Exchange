class Cryptocurrency < ApplicationRecord
  validates :symbol, presence: true
  validates_uniqueness_of :symbol
  validates :name, presence: true
  validates_uniqueness_of :name

  after_create :pull_api_data

  def price(currencyType='CAD')
    self.display_data[currencyType]['PRICE'].sub("#{currencyType} ", '')
  end

  def raw_price(currencyType='CAD')
    self.raw_data[currencyType]['PRICE']
  end

  def open_price(currencyType='CAD')
    self.display_data[currencyType]['OPENDAY']
  end

  def day_high(currencyType='CAD')
    self.display_data[currencyType]['HIGHDAY']
  end

  def day_low(currencyType='CAD')
    self.display_data[currencyType]['LOWDAY']
  end

  def daily_volume
    self.display_data['CAD']['TOTALVOLUME24H']
  end

  def get_char
    self.display_data['CAD']['FROMSYMBOL']
  end

  def get_view_data(currencyType='USD')
    display_data = self.display_data
    price       = display_data[currencyType]['PRICE']
    open_price  = display_data[currencyType]['OPENDAY']
    high_of_day = display_data[currencyType]['HIGHDAY']
    low_of_day  = display_data[currencyType]['LOWDAY']
    volume      = display_data[currencyType]['TOTALVOLUME24H']
    [price, open_price, high_of_day, low_of_day, volume]
  end

  private

  def pull_api_data
    api_service = CryptocurrencyApiService.new
    api_service.update_single_cryptocurrency_data(self.symbol)
  end
end
