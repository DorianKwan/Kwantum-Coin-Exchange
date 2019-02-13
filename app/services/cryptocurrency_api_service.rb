class CryptocurrencyApiService

  attr_accessor :bitcoin_price, :ethereum_price

  def initialize
    self.bitcoin_price  = get_current_price('btc')
    self.ethereum_price = get_current_price('eth')
  end

  # This method takes in a cryptocurrency acronym ex/ 'btc', 'eth' or 'ltc' and returns the last sold price
  def get_current_price(crypto)
    url  = "https://api.quadrigacx.com/v2/ticker?book=#{crypto}_cad"
    uri  = URI(url)
    res  = Net::HTTP.get(uri)
    json = JSON.parse(res)
    
    # Temporary band-aid error handling during Quadrigacx CEO fiasco
    if json['error'].present?
      static_btc_price = '4792.69'
      static_eth_price = '159.17'
      return crypto.eql?('btc') ? static_btc_price : static_eth_price
    end

    json['last']
  end

  ###
    # This method takes in a cryptocurrency acronym ex/ 'btc', 'eth' or 'ltc'
    # It also has a optional param dollar_type to specify CAD ('cad') or USD ('usd)
    # It will return the day high, day low and last transaction price
  ###
  def get_crypto_price_data(crypto, dollar_type='cad')
    url  = "https://api.quadrigacx.com/v2/ticker?book=#{crypto}_cad"
    uri  = URI(url)
    res  = Net::HTTP.get(uri)
    json = JSON.parse(res)

    # Temporary band-aid error handling during Quadrigacx CEO fiasco
    if json['error'].present?
      static_btc_prices = ['4792.69', '4836.04', '4754.17', '4786.95', 249.23]
      static_eth_prices = ['159.17', '162.87', '157.53', '159.95', 2585.23]
      return crypto.eql?('btc') ? static_btc_prices : static_eth_prices
    end

    [json['last'], json['high'], json['low'], json['vwap'], json['volume'].to_f.round(2)]
  end
end
