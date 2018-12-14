document.addEventListener("turbolinks:load", function () {
  
  // This function will toggle the hidden class on two elements
  function toggleHidden(unhideElement, hideElement) {
    if (unhideElement.hasClass('hidden')) { unhideElement.removeClass('hidden'); }
    if (!hideElement.hasClass('hidden')) { hideElement.addClass('hidden'); }
  }

  if ($('#new-transaction').length) {

    var cashAmount   = $('.cash-amount');
    var coinAmount   = $('.coin-amount');
    var hiddenTotal  = $('.order-total-hidden');
    var btcValue     = $('.btc-value');
    var ethValue     = $('.eth-value');
    var hideForm     = $('.hide-form');
    var ptToggleDiv  = $('.purchase-type-toggle');
    var purchaseType = $('.purchase-type');
    var typeOfCrypto = $('.type-of-crypto');
    var visibleCoin  = document.getElementsByClassName('crypto-amount-visible')[0];
    var amountlabel  = document.getElementsByClassName('amount-label')[0];
    var cashTotal    = document.getElementsByClassName('order-total')[0];
    var selectValue  = document.getElementsByClassName('select-value')[0];
    var btcSelect    = document.getElementsByClassName('bitcoin-select')[0];
    var ethSelect    = document.getElementsByClassName('ethereum-select')[0];
    var btcPrice     = document.getElementsByClassName('btc-price')[0].innerHTML;
    var ethPrice     = document.getElementsByClassName('eth-price')[0].innerHTML;
    
    btcSelect.addEventListener('click', function () {
      selectValue.innerHTML = "Bitcoin";
      toggleHidden(btcValue, ethValue);
      if (hideForm.hasClass('hidden')) { hideForm.removeClass('hidden'); }
      typeOfCrypto.val('bitcoin');
    });
    
    ethSelect.addEventListener('click', function () {
      selectValue.innerHTML = "Ethereum";
      toggleHidden(ethValue, btcValue);
      if (hideForm.hasClass('hidden')) { hideForm.removeClass('hidden'); }
      typeOfCrypto.val('ethereum');
    });

    ptToggleDiv.unbind('click').bind('click', function () {
      var cryptocurrency = selectValue.innerHTML;
      if (!$('#input-toggle').prop('checked')) {
        amountlabel.innerHTML = `Enter the desired amount of ${cryptocurrency} in CAD:`;
        toggleHidden(cashAmount, coinAmount);
        purchaseType.val('cad');
      } else {
        amountlabel.innerHTML = `Enter the desired amount of ${cryptocurrency}`;
        toggleHidden(coinAmount, cashAmount);
        purchaseType.val('crypto');
      }
    });

    // Handle amount of CAD input, updates hidden input values for form
    cashAmount.unbind('keyup').bind('keyup', function () {
      var cash = parseFloat(cashAmount.val());
      var cryptocurrency = selectValue.innerHTML;
      var cryptoPrice    = (cryptocurrency === "Bitcoin" ? btcPrice : ethPrice);
      var cryptoSymbol   = (cryptocurrency === "Bitcoin" ? '₿' : 'Ξ');
      var amountOfCrypto = Math.round((cash / parseFloat(cryptoPrice)) * 100000) / 100000;
      if (amountOfCrypto) {
        coinAmount.val(amountOfCrypto);
        hiddenTotal.val(cashAmount.val());
        visibleCoin.innerHTML = `${cryptoSymbol} ${amountOfCrypto}`;
        cashTotal.innerHTML   = parseFloat(cashAmount.val()).toFixed(2);
      }
    });
    
    // Handle amount of coins input, updates hidden input values for form
    coinAmount.unbind('keyup').bind('keyup', function () {
      var cryptocurrency = selectValue.innerHTML;
      var amountOfCrypto = parseFloat(coinAmount.val());
      var cryptoPrice  = (cryptocurrency === "Bitcoin" ? btcPrice : ethPrice);
      var cryptoSymbol = (cryptocurrency === "Bitcoin" ? '₿' : 'Ξ');
      var amountOfCash = Math.round((amountOfCrypto * parseFloat(cryptoPrice)) * 100) / 100;
      if (amountOfCash) {
        cashAmount.val(amountOfCash);
        coinAmount.val(amountOfCrypto);
        hiddenTotal.val(amountOfCash);
        visibleCoin.innerHTML = `${cryptoSymbol} ${amountOfCrypto}`;
        cashTotal.innerHTML   = amountOfCash.toFixed(2);
      }
    });
  }
});
