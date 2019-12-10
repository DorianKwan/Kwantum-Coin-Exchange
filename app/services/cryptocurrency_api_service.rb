class CryptocurrencyApiService
  def initialize
  end

  def get_cryptocurreny_data(dollar_type='CAD,USD')
    cryptos = Cryptocurrency.all.pluck(:symbol).map { |symbol| symbol.upcase }.join(',') 
    begin
      url  = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=#{cryptos}&tsyms=#{dollar_type}";
      url += "&api_key=#{ENV['CRYPTO_API_KEY']}"
      uri  = URI(url)
      res  = Net::HTTP.get(uri)
      json = JSON.parse(res)
    rescue => e  
      puts e.message  
      puts e.backtrace.inspect
      return
    end

    cryptos.split(',').each { |crypto| self.update_cryptocurrency(crypto, json) }
  end

  def update_cryptocurrency(symbol, api_data)
    begin
      crypto = Cryptocurrency.find_by(symbol: symbol)
      crypto.raw_data = api_data['RAW'][symbol]
      crypto.display_data = api_data['DISPLAY'][symbol]
      crypto.save!
    rescue => e
      puts "Raised exception updating #{symbol}"
      puts e.message  
      puts e.backtrace.inspect
    end
  end
end