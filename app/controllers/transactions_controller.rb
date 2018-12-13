class TransactionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
  end

  def create
    user = current_user || User.where(email: 'guest@no-exist.com').first

    @transaction = Transaction.new(
      user_id: user.id,
      type_of_crypto: 1,
      purchase_type: 1,
      amount_of_coin: params['amount_of_coin'].to_f,
      order_total: 1
    )

    @transaction.guest_email = current_user ? '' : params['guest_email']
    if @transaction.save
      flash[:notice] = "You've successfully purchased #{@transaction.type_of_crypto.humanize}!"
      redirect_to(transactions_show_path(@transaction))
    else
      flash[:alert] = "There was an error during the transaction!"
      redirect_back(transactions_new_path)
    end
  end

  def new
  end

  def show
    @transaction = Transaction.find(params[:format].to_i)
  end
end
