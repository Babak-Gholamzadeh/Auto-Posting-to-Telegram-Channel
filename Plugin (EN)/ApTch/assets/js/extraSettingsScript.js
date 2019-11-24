jQuery(document).ready(function() {

  // Initialize Sending Post Checkbox
  if(jQuery('.telegramMetaBox div.sending label.SendingPost input').val()) {
    switch (jQuery('.telegramMetaBox div.sending label.SendingPost input').val()) {
      case 'checked':
        jQuery('.telegramMetaBox div.sending label.SendingPost').css('background-color', '#08c');
        jQuery('.telegramMetaBox div.sending label.SendingPost').css('border', '1px solid #08c');
        jQuery('.telegramMetaBox div.sending label.SendingPost').children('span.bull').css('left', '20px');
        jQuery('.telegramMetaBox div.pinMSG').show();
        break;
      case 'unchecked':
        jQuery('.telegramMetaBox div.sending label.SendingPost').css('background-color', '#eee');
        jQuery('.telegramMetaBox div.sending label.SendingPost').css('border', '1px solid #bbb');
        jQuery('.telegramMetaBox div.sending label.SendingPost').children('span.bull').css('left', '0');
        break;
      default:
        jQuery('.telegramMetaBox div.sending label.SendingPost').css('background-color', '#e74c3c');
        jQuery('.telegramMetaBox div.sending label.SendingPost').css('border', '1px solid #e74c3c');
        jQuery('.telegramMetaBox div.sending label.SendingPost').children('span.bull').css('left', '0');
        jQuery('.telegramMetaBox div.sending label.SendingPost').next().html('Ckeck <a href="admin.php?page=telegram_settings" target="_blank">Telegram Settings</a>');
    }
  }
  // Initialize Pinning Post Checkbox
  if(jQuery('.telegramMetaBox div.pinMSG label.pinningPost input').val()) {
    switch (jQuery('.telegramMetaBox div.pinMSG label.pinningPost input').val()) {
      case 'checked':
        jQuery('.telegramMetaBox div.pinMSG label.pinningPost').css('background-color', '#2ecc71');
        jQuery('.telegramMetaBox div.pinMSG label.pinningPost').css('border', '1px solid #2ecc71');
        jQuery('.telegramMetaBox div.pinMSG label.pinningPost').children('span.bull').css('left', '20px');
        break;
      case 'unchecked':
        jQuery('.telegramMetaBox div.pinMSG label.pinningPost').css('background-color', '#eee');
        jQuery('.telegramMetaBox div.pinMSG label.pinningPost').css('border', '1px solid #bbb');
        jQuery('.telegramMetaBox div.pinMSG label.pinningPost').children('span.bull').css('left', '0');
        break;
    }
  }
  //Enable Send Post
  jQuery('.telegramMetaBox div.sending label.SendingPost').click(function () {
    switch(jQuery(this).children('input').val()) {
      case 'checked':
        jQuery(this).css('background-color', '#eee');
        jQuery(this).css('border', '1px solid #bbb');
        jQuery(this).children('span.bull').css('left', '0');
        jQuery(this).children('input').val('unchecked');
        jQuery('.telegramMetaBox div.pinMSG').slideUp(200);
        break;
      case 'unchecked':
        jQuery(this).css('background-color', '#08c');
        jQuery(this).css('border', '1px solid #08c');
        jQuery(this).children('span.bull').css('left', '20px');
        jQuery(this).children('input').val('checked');
        jQuery('.telegramMetaBox div.pinMSG').slideDown(200);
        break;
    }
  });
  //Enable Pin Post
  jQuery(".telegramMetaBox div.pinMSG label.pinningPost").click(function () {
    switch(jQuery(this).children('input').val()) {
      case 'checked':
        jQuery(this).css('background-color', '#eee');
        jQuery(this).css('border', '1px solid #bbb');
        jQuery(this).children('span.bull').css('left', '0');
        jQuery(this).children('input').val('unchecked');
        break;
      case 'unchecked':
        jQuery(this).css('background-color', '#2ecc71');
        jQuery(this).css('border', '1px solid #2ecc71');
        jQuery(this).children('span.bull').css('left', '20px');
        jQuery(this).children('input').val('checked');
        break;
    }
  });
  //check to show LC or sending button to telegram
  jQuery("center.telegramColumnCenter input.postSent").each( function() {
    if(jQuery(this).val() != '') {
      jQuery(this).prev().children('span.telegramLC').fadeIn(500);
    }
    else {
      jQuery(this).prev().children('i').fadeIn(500);
    }
  });
  //Ajax requst for send post to telegram quickly
  jQuery("div.telegramColumn i").click(function() {
    var thisClass = jQuery(this);
    jQuery(this).css('display', 'block');
    jQuery(this).attr('class', 'telegramSend fas fa-spinner fa-spin');
		var post_id = jQuery(this).attr('data-post-id');
		jQuery.ajax({
      type: 'GET',
      url: jQuery(this).attr('data-url'),
      data: {
        'action': 'send_post_id_by_mail',
	      'post_id': post_id
      },
      dataType: 'json',
      success: function(result) {
        if(result.data.msg) {
          thisClass.fadeOut(500);
          thisClass.siblings('span.telegramLC').fadeIn(500);
        }
        else {
          thisClass.attr('class', 'telegramSend fas fa-paper-plane');
        }
      }
		});
	});

});
