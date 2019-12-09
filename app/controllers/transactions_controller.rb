class TransactionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @transactions = Transaction.where(user_id: current_user.id) if current_user
  end

  def create
    if missing_values?(params)
      raise_flash_error('Please Enter an amount of Coin or Cash.')
      return
    end

    unless Cryptocurrency.all.pluck(:symbol).include?(params['cryptocurrency-type'])
      raise_flash_error('Invalid cryptocurrency.')
      return
    end
    
    crypto = Cryptocurrency.where(symbol: params['cryptocurrency-type']).first

    @transaction = Transaction.new(
      user_id: current_user.id,
      cryptocurrency_id: crypto.id,
      purchase_type: params['purchase-type'],
      amount_of_coin: params['amount-of-coin'].to_f,
      order_total: params['order-total'].to_f,
    )

    @transaction.guest_email = current_user ? '' : params['guest_email']
    
    if @transaction.save
      flash[:notice] = "You've successfully purchased #{@transaction.cryptocurrency.name.humanize}!"
      redirect_to(transactions_show_path(@transaction))
    else
      flash[:alert] = "There was an error during the transaction.  Please Try Again."
      redirect_back(transactions_new_path)
    end
  end

  def new
    unless user_signed_in?
      flash[:alert] = 'You must register to use our platform.'
      redirect_to(new_user_registration_path)
    end

    @buy_page = true
    @cryptocurrencies = Cryptocurrency.where(symbol: ['BTC', 'ETH', 'LTC', 'XRP']).order(:symbol)
  end

  def show
    unless user_signed_in?
      flash[:alert] = 'You must register to use our platform.'
      redirect_to(new_user_registration_path)
    end
    
    @transaction = Transaction.find(params[:format].to_i)

    unless @transaction.user_id.eql?(current_user.id)
      flash[:alert] = 'You can only view transaction made by yourself.'
      redirect_back fallback_location: transactions_index_path
    end
  end

  def missing_values?(params)
    params['order-total'] == "0"
  end

  def raise_flash_error(message)
    flash[:alert] = message
    redirect_back fallback_location: transactions_new_path
  end
end
