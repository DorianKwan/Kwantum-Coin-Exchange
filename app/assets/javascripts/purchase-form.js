document.addEventListener("turbolinks:load", function () {
  
  // This function will toggle the hidden class on two elements
  function toggleHidden(unhideElement, hideElement) {
    if ($(unhideElement).hasClass('hidden')) { $(unhideElement).removeClass('hidden'); }
    if (!$(hideElement).hasClass('hidden')) { $(hideElement).addClass('hidden'); }
  }

  // This function will update the coin/cash totals in form
  function updateTotals(crypto, amountOfCrypto, amountOfCash) {
    var cryptoSymbol = (crypto === 'Bitcoin' ? '₿' : 'Ξ');
    $('.cash-amount').val(amountOfCash);
    $('.coin-amount').val(amountOfCrypto);
    $('.order-total-hidden').val(amountOfCash);
    $('.crypto-amount-visible').text(`${cryptoSymbol} ${amountOfCrypto}`);
    $('.order-total').text(amountOfCash.toFixed(2));
  }

  // This function will reset the coin/cash totals in form
  function resetTotals(crypto) {
    var cryptoSymbol = (crypto === 'Bitcoin' ? '₿' : 'Ξ');
    $('.cash-amount').val('');
    $('.coin-amount').val('');
    $('.order-total-hidden').val(0);
    $('.crypto-amount-visible').text(`${cryptoSymbol} 0.00`);
    $('.order-total').text(0.00);
  }

  if ($('#new-transaction').length) {
    var btcValue     = $('.btc-value');
    var ethValue     = $('.eth-value');
    var orderForm    = $('#order-form');
    var ptToggleDiv  = $('.purchase-type-toggle');
    var purchaseType = $('.purchase-type');
    var typeOfCrypto = $('.type-of-crypto');
    var amountlabel  = document.getElementsByClassName('amount-label')[0];
    var selectValue  = document.getElementsByClassName('select-value')[0];
    var btcSelect    = document.getElementsByClassName('bitcoin-select')[0];
    var ethSelect    = document.getElementsByClassName('ethereum-select')[0];
    var btcPrice     = document.getElementsByClassName('btc-price')[0].innerHTML;
    var ethPrice     = document.getElementsByClassName('eth-price')[0].innerHTML;
    
    btcSelect.addEventListener('click', function () {
      selectValue.innerHTML = "Bitcoin";
      toggleHidden(btcValue, ethValue);
      if (orderForm.hasClass('hidden')) { orderForm.removeClass('hidden'); }
      typeOfCrypto.val('bitcoin');
      $('.cash-amount').keyup();
    });
    
    ethSelect.addEventListener('click', function () {
      selectValue.innerHTML = "Ethereum";
      toggleHidden(ethValue, btcValue);
      if (orderForm.hasClass('hidden')) { orderForm.removeClass('hidden'); }
      typeOfCrypto.val('ethereum');
      $('.cash-amount').keyup();
    });
    
    ptToggleDiv.unbind('click').bind('click', function () {
      var cryptocurrency = selectValue.innerHTML;
      if (!$('#input-toggle').prop('checked')) {
        amountlabel.innerHTML = `Enter the desired amount of ${cryptocurrency} in CAD:`;
        toggleHidden('.cash-amount', '.coin-amount');
        purchaseType.val('cad');
      } else {
        amountlabel.innerHTML = `Enter the desired amount of ${cryptocurrency}`;
        toggleHidden('.coin-amount', '.cash-amount');
        purchaseType.val('crypto');
      }
    });

    // Handle amount of CAD input, updates hidden input values for form
    $('.cash-amount').unbind('keyup').bind('keyup', function () {
      var cryptocurrency = selectValue.innerHTML;
      var amountOfCash   = parseFloat($(this).val());
      var cryptoPrice    = (cryptocurrency === "Bitcoin" ? btcPrice : ethPrice);
      var amountOfCrypto = Math.round((amountOfCash / parseFloat(cryptoPrice)) * 100000) / 100000;
      if (amountOfCrypto) {
        updateTotals(cryptocurrency, amountOfCrypto, amountOfCash);
      } else {
        resetTotals(cryptocurrency);
      }
    });
    
    // Handle amount of coins input, updates hidden input values for form
    $('.coin-amount').unbind('keyup').bind('keyup', function () {
      var cryptocurrency = selectValue.innerHTML;
      var amountOfCrypto = parseFloat($(this).val());
      var cryptoPrice    = (cryptocurrency === "Bitcoin" ? btcPrice : ethPrice);
      var amountOfCash   = Math.round((amountOfCrypto * parseFloat(cryptoPrice)) * 100) / 100;
      if (amountOfCash) {
        updateTotals(cryptocurrency, amountOfCrypto, amountOfCash);
      } else {
        resetTotals(cryptocurrency);
      }
    });
  }
});
