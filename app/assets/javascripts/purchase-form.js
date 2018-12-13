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
    var amountlabel  = document.getElementsByClassName('amount-label')[0];
    var visibleTotal = document.getElementsByClassName('order-total')[0];
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

    cashAmount.unbind('focusout').bind('focusout', function () {
      var cryptocurrency = selectValue.innerHTML;
      var cash = parseFloat(cashAmount.val());
      if (cryptocurrency === "Bitcoin") {
        var amountOfBtc = Math.round((cash / parseFloat(btcPrice)) * 100000) / 100000;
        coinAmount.val(amountOfBtc);
        console.log(amountOfBtc);
      } else {
        var amountOfEth = Math.round((cash / parseFloat(btcPrice)) * 100000) / 100000;
        coinAmount.val(amountOfEth);
      }
      visibleTotal.innerHTML = parseFloat(cashAmount.val()).toFixed(2);
      hiddenTotal.val(cashAmount.val());
    });
    
    coinAmount.unbind('focusout').bind('focusout', function () {
      var cryptocurrency = selectValue.innerHTML;
      var amountOfCrypto = parseFloat(coinAmount.val());
      var amountOfCash;
      if (cryptocurrency === "Bitcoin") {
        amountOfCash = Math.round((amountOfCrypto * parseFloat(btcPrice)) * 100) / 100;
        cashAmount.val(amountOfCash);
        visibleTotal.innerHTML = amountOfCash.toFixed(2);
        hiddenTotal.val(amountOfCash);
      } else {
        amountOfCash = Math.round((amountOfCrypto * parseFloat(ethPrice)) * 100) / 100;
        cashAmount.val(amountOfCash);
        visibleTotal.innerHTML = amountOfCash.toFixed(2);
        hiddenTotal.val(cashAmount.val(amountOfCash));
      }
    });
  }
});
