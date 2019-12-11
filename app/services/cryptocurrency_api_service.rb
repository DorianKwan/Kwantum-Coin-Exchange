class CryptocurrencyApiService
  def initialize
  end

  def update_bulk_cryptocurrency_data
    symbols = Cryptocurrency.all.pluck(:symbol).map { |symbol| symbol.upcase }.join(',')
    json = send_api_request(symbols)
    symbols.split(',').each { |symbol| update_cryptocurrency(symbol, json) } if json
  end

  def update_single_cryptocurrency_data(symbol)
    json = send_api_request(symbol)
    update_cryptocurrency(symbol, json)
  end

  private

  def send_api_request(symbols, dollar_type='CAD,USD')
    begin
      url  = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=#{symbols}&tsyms=#{dollar_type}";
      url += "&api_key=#{ENV['CRYPTO_API_KEY']}"
      uri  = URI(url)
      res  = Net::HTTP.get(uri)
      json = JSON.parse(res)
    rescue => e  
      puts "Raised exception requesting cryptocurrency data url: #{url}"
      puts e.message  
      puts e.backtrace.inspect
    end
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