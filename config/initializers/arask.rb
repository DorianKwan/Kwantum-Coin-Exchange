Arask.setup do |arask|
  # Only run on production
  arask.create task: 'api_call:update_crypto_data', interval: 1.minutes if Rails.env.production?

  # On exceptions, send email with details
  arask.on_exception email: 'bryce.sayers-kwan@live.ca'

  # Run code on exceptions
  arask.on_exception do |exception, arask_job|
    # Just write exception to console
    puts exception
  end
end
