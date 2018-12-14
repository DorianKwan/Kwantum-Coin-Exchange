document.addEventListener("turbolinks:load", function () {
  
  // Run this code only if yield is homepage-section
  if ($('#homepage-section').length) {
    
    // Make the navbar trasnperant
    $('#navbar').removeClass('solid');
    $('.brand-logo-link img').attr('src', 'assets/brand-logo-white.png');
  }

  $(window).scroll(function() {
    // Run event logic if on homepage
    if ($('#homepage-section').length) {
      // Checks if the window has been scrolled away from the top
      if($(this).scrollTop() > 10) {
        // Check if the navbar is transparent
        if (!$('#navbar').hasClass('solid')) {
          $('#navbar').addClass('solid');
          $('.brand-logo-link img').fadeOut(200, function () {
            $('.brand-logo-link img').attr('src', 'assets/brand-logo-black.png');
          }).fadeIn(500);
        }
      } else {
        // Check if the navbar is not transparent
        if ($('#navbar').hasClass('solid')) {
          $('#navbar').removeClass('solid');
          $('.brand-logo-link img').fadeOut(500, function () {
            $('.brand-logo-link img').attr('src', 'assets/brand-logo-white.png');
          }).fadeIn(200);
        }
      }
    }
  });
});