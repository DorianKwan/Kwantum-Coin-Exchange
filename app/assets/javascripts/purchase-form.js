document.addEventListener("turbolinks:load", function () {

  function showValue(showElement) {
    var coinValues = $('.crypto-prices').children();

    Object.values(coinValues).forEach(coinValue => {
      if (coinValue.innerHTML) {
        if (coinValue === showElement) $(coinValue).removeClass('hidden');
        else if (!$(coinValue).hasClass('hidden')) $(coinValue).addClass('hidden');
      }
    });
  }

  function toggleHidden(unhideElement, hideElement) {
    if ($(unhideElement).hasClass('hidden')) { $(unhideElement).removeClass('hidden'); }
    if (!$(hideElement).hasClass('hidden')) { $(hideElement).addClass('hidden'); }
  }

  if ($('#new-transaction').length) {
    var orderForm    = $('#order-form');
    var ptToggleDiv  = $('.purchase-type-toggle');
    var purchaseType = $('.purchase-type');
    var typeOfCrypto = $('.cryptocurrency-type');
    var amountLabel  = document.getElementsByClassName('amount-label')[0];
    var selectValue  = document.getElementsByClassName('select-value')[0];
    var cryptoData = $('.crypto-data').children();

    function setInputLabel() {
      var cryptocurrency = selectValue.innerHTML;
      if ($('.toggle').hasClass("off")) {
        amountLabel.innerHTML = `Enter amount of ${cryptocurrency} units:`;
      } else {
        amountLabel.innerHTML = `Enter amount of CAD for ${cryptocurrency}:`;
      }
    }

    function addClickListener(selector, cryptoName, cryptoValue, cryptoSymbol) {
      $(selector).on('click', function () {
        selectValue.innerHTML = cryptoName;
        showValue(cryptoValue);
        if (orderForm.hasClass('hidden')) orderForm.removeClass('hidden');
        typeOfCrypto.val(cryptoSymbol);
        $('.cash-amount').keyup();
        setInputLabel();
      });
    }
    
    let cryptoSymbols = {};
    let cashAmounts = {};

    Object.values(cryptoData).forEach((crypto) => {
      if (crypto.innerHTML) {
        const cryptoSymbol = crypto.id;
        const cryptoName   = $(crypto).children('.crypto-name')[0].innerHTML;
        const cryptoValue  = $(`.${cryptoSymbol}-value`)[0];
        const cryptoPrice  = $(crypto).children(`.${cryptoSymbol}-price`)[0].innerHTML;
        const cryptoChar   = $(crypto).children('.crypto-character')[0].innerHTML;
        cryptoSymbols[cryptoName] = cryptoChar;
        cashAmounts[cryptoName] = cryptoPrice;
  
        addClickListener(`.${cryptoName.toLowerCase()}-select`, cryptoName, cryptoValue, cryptoSymbol.toUpperCase());
      }
    });

      // This function will update the coin/cash totals in form
    function updateTotals(crypto, amountOfCrypto, amountOfCash) {
      var cryptoSymbol = cryptoSymbols[crypto];
      $('.cash-amount').val(amountOfCash);
      $('.coin-amount').val(amountOfCrypto);
      $('.order-total-hidden').val(amountOfCash);
      $('.crypto-amount-visible').text(`${cryptoSymbol} ${amountOfCrypto}`);
      $('.order-total').text(amountOfCash.toFixed(2));
    }

    // This function will reset the coin/cash totals in form
    function resetTotals(crypto) {
      var cryptoSymbol = cryptoSymbols[crypto];
      $('.cash-amount').val('');
      $('.coin-amount').val('');
      $('.order-total-hidden').val(0);
      $('.crypto-amount-visible').text(`${cryptoSymbol} 0.00`);
      $('.order-total').text(0.00);
    }
    
    function keyupHandler($element) {
      $element.unbind('keyup').bind('keyup', function () {
        var cryptocurrency = selectValue.innerHTML;
        var cryptoPrice = cashAmounts[cryptocurrency];

        if ($element.selector === '.cash-amount') {
          var amountOfCash = parseFloat($(this).val());
          var amountOfCoin = Math.round((amountOfCash / parseFloat(cryptoPrice)) * 100000) / 100000;
        } else if ($element.selector === '.coin-amount') {
          var amountOfCoin = parseFloat($(this).val());
          var amountOfCash   = Math.round((amountOfCoin * parseFloat(cryptoPrice)) * 100) / 100;
        }

        if (amountOfCash || amountOfCoin) updateTotals(cryptocurrency, amountOfCoin, amountOfCash);
        else resetTotals(cryptocurrency);
      });
    }

    keyupHandler($('.cash-amount'));
    keyupHandler($('.coin-amount'));
    
    ptToggleDiv.unbind('click').bind('click', () => {
      var cryptocurrency = selectValue.innerHTML;
      if ($('.toggle').hasClass("off")) {
        amountLabel.innerHTML = `Enter amount of CAD for ${cryptocurrency}:`;
        toggleHidden('.cash-amount', '.coin-amount');
        purchaseType.val('cad');
      } else {
        amountLabel.innerHTML = `Enter amount of ${cryptocurrency} units:`;
        toggleHidden('.coin-amount', '.cash-amount');
        purchaseType.val('crypto');
      }
    });
  }
});
