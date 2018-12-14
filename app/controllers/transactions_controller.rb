class TransactionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @transactions = Transaction.where(user_id: current_user.id) if current_user
  end

  def create
    unless params['amount-of-coin'].present? || params['order-total'].present?
      raise_flash_error('There was an issue with your input. Please Try Again.')
    end

    @transaction = Transaction.new(
      user_id: current_user.id,
      type_of_crypto: params['type-of-crypto'],
      purchase_type: params['purchase-type'],
      amount_of_coin: params['amount-of-coin'].to_f,
      order_total: params['order-total'].to_f,
    )


    @transaction.guest_email = current_user ? '' : params['guest_email']
    
    if @transaction.save
      flash[:notice] = "You've successfully purchased #{@transaction.type_of_crypto.humanize}!"
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

    @crypto_api_service = CryptocurrencyApiService.new()
  end

  def show
    unless user_signed_in?
      flash[:alert] = 'You must register to use our platform.'
      redirect_to(new_user_registration_path)
    end
    
    @transaction = Transaction.find(params[:format].to_i)
  end

  def raise_flash_error(message)
    flash[:alert] = message
    redirect_back(transactions_new_path)
  end
end
