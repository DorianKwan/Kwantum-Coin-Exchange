document.addEventListener("turbolinks:load", function () {
  // Dynamically change the z-index of a fixed background img
  document.addEventListener('scroll', function() {
    // Only run when on homepage
    if ($('.home-index').length) {
      // Scroll height from window top to top of page
      var currentScrollHeight = jQuery(window).scrollTop();
      var heightWhenImgSwitch = jQuery('#join-us').offset().top - jQuery(window).height() - 50;
      if (currentScrollHeight >= heightWhenImgSwitch) {
        $('.fullscreen-bg-2').css('z-index', -99);
      } else {
        $('.fullscreen-bg-2').css('z-index', -101);
      }
    }
  });
});
