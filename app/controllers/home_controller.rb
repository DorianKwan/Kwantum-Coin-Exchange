class HomeController < ApplicationController
  layout 'application'

  def index
    @home_page = true
    @btc, @eth, @ltc, @xrp = Cryptocurrency.where(symbol: ['BTC', 'ETH', 'LTC', 'XRP']).order(:symbol)
  end
end
