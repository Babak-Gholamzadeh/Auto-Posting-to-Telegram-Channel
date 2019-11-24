jQuery(document).ready(function() {
  jQuery('nav a').click(function(e) {
    e.preventDefault();
    jQuery('body, html').animate({scrollTop: jQuery(this.hash).offset().top + 10}, 500);
  });
  function fixedSidebar() {
    var scrollLoc = jQuery(window).scrollTop();
    jQuery(jQuery("nav a").get().reverse()).each(function() {
      if(scrollLoc >= jQuery(this.hash).offset().top) {
        jQuery(this).parent().siblings('li').removeClass('active');
        jQuery(this).next().children('li').removeClass('active');
        jQuery(this).parent().siblings('li').children('ul.subMenu').children('li').removeClass('active');
        jQuery(this).parent().siblings('li').children('ul.subMenu').slideUp(500);
        jQuery(this).parent().addClass('active');
        jQuery(this).parent().parent().parent().addClass('active');
        jQuery(this).parent().parent().parent().siblings('li').removeClass('active');
        jQuery(this).next().slideDown(500);
        if(jQuery(this).parent().attr('class') == 'active') {
          jQuery(this).parent().parent().parent().siblings().children('ul.subMenu').slideUp(500);
          jQuery(this).parents('ul.subMenu').slideDown(500);
        }
        return false;
      }
    });
    if(scrollLoc > jQuery('.indexColumn').offset().top - 30) {
      jQuery('nav').css('position', 'fixed');
      jQuery('nav').css('top', '60px');
    }
    else {
      jQuery('nav').removeAttr('style');
      jQuery('nav ul.mainMenu li.active').removeClass('active');
    }
  }
  fixedSidebar();
  jQuery(window).scroll(fixedSidebar);

});
