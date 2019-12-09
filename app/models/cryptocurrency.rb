class Cryptocurrency < ApplicationRecord
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
end
