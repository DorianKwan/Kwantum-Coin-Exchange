class HomeController < ApplicationController
  layout 'application'

  def index
    @home_page = true
    @crypto_api_service = CryptocurrencyApiService.new()
  end
end
