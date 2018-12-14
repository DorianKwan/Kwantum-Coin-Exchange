class HomeController < ApplicationController
  layout 'application'

  def index
    @crypto_api_service = CryptocurrencyApiService.new()
  end
end
