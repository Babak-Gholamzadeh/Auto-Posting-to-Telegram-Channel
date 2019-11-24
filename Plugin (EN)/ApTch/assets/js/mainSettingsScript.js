jQuery(document).ready(function(){
  // Options For Items
  var titleOptions = "<label class='radioStyle' title='Regular Title'><input type='radio' name='titleStyle' class='radioStyle' value='regular'>Regular</label><label class='radioStyle' title='Bold Title'><input type='radio' name='titleStyle' class='radioStyle' value='bold'>Bold</label><label class='radioStyle' title='Italic Title'><input type='radio' name='titleStyle' class='radioStyle' value='italic'>Italic</label><label class='radioStyle' title='The Title be linked to the website post'><input type='radio' name='titleStyle' class='radioStyle' value='link'>Link</label>";
  var excerptOptions = "<label class='radioStyle' title='Regular Excerpt'><input type='radio' name='excerptStyle' class='radioStyle' value='regular'>Regular</label><label class='radioStyle' title='Bold Excerpt'><input type='radio' name='excerptStyle' class='radioStyle' value='bold'>Bold</label><label class='radioStyle' title='Italic Excerpt'><input type='radio' name='excerptStyle' class='radioStyle' value='italic'>Italic</label><label class='radioStyle' title='The Title be linked to the website post'><input type='radio' name='excerptStyle' class='radioStyle' value='link'>Link</label>";
  var contentOptions = "<label class='radioStyle' title='Regular Content'><input type='radio' name='contentStyle' class='radioStyle' value='regular'>Regular</label><label class='radioStyle' title='Bold Content'><input type='radio' name='contentStyle' class='radioStyle' value='bold'>Bold</label><label class='radioStyle' title='Italic Content'><input type='radio' name='contentStyle' class='radioStyle' value='italic'>Italic</label><label class='maxLength' title='Enter the Max-Length (characters) of the content. By default 400 characters'>Max-Length <input type='text' name='contentMax' class='textStyle' value='400' placeholder='400'> char</label>";
  var tagsOptions = "<label class='radioStyle' title='Tags be used as #hashtags'><input type='radio' name='tagsStyle' class='radioStyle' value='hashtag'>#Hashtags</label><label class='radioStyle' title='Tags be linked to their own page on the website'><input type='radio' name='tagsStyle' class='radioStyle' value='link'>Link</label>";
  var moreOptions = "<label class='moreLabel' title='Enter a label instead of \"Read More\". By default is \"Read More\"'>Label <input type='text' name='moreCaption' class='textStyle' value='' placeholder='Read More'></label>";
  var customOptions = "<label class='radioStyle text'><input type='radio' name='customStyle' class='radioStyle' value='regular'>Regular</label><label class='radioStyle text'><input type='radio' name='customStyle' class='radioStyle' value='bold'>Bold</label><label class='radioStyle text'><input type='radio' name='customStyle' class='radioStyle' value='italic'>Italic</label><label class='radioStyle text' title='The Text will be linked to the address that you would enter'><input type='radio' name='customStyle' class='radioStyle' value='link'>Link</label><label class='textLabel' title='Enter your text'>Text <input type='text' name='customText' class='textStyle' value=''></label><label class='linkLabel' title='Enter the address'>Link <input type='text' name='customLink' class='linkStyle' value=''></label>";

  // Initialize Custom Settings
  // Initialize Custom Settings (Enable Auto Posting)
  if(jQuery('div#customize div.enabling label.enableSendingPost input').val()) {
    switch (jQuery('div#customize div.enabling label.enableSendingPost input').val()) {
      case 'checked':
        jQuery('div#customize div.enabling label.enableSendingPost').css('background-color', '#08c');
        jQuery('div#customize div.enabling label.enableSendingPost').css('border', '1px solid #08c');
        jQuery('div#customize div.enabling label.enableSendingPost').children('span.bull').css('left', '20px');
        break;
      case 'unchecked':
        jQuery('div#customize div.enabling label.enableSendingPost').css('background-color', '#eee');
        jQuery('div#customize div.enabling label.enableSendingPost').css('border', '1px solid #bbb');
        jQuery('div#customize div.enabling label.enableSendingPost').children('span.bull').css('left', '0');
        break;
      default:
        jQuery('div#customize div.enabling label.enableSendingPost').css('background-color', '#e74c3c');
        jQuery('div#customize div.enabling label.enableSendingPost').css('border', '1px solid #e74c3c');
        jQuery('div#customize div.enabling label.enableSendingPost').children('span.bull').css('left', '0');
    }
  }
  // Initialize Custom Settings (Buttons)
  jQuery('.urlButton').children('.btnElement:gt(0)').remove();
  jQuery('.urlButton').children('input[name=countBtnRow]').val(0);
  if(jQuery('input.elementButtons').val() != '') {
    jQuery.each(jQuery('input.elementButtons').val().split('[{7|[]'), function() {
      if(this != '') {
        var countBtnCell = this.split('|]{[6').length - 1;
        var count = parseInt(jQuery('input.countBtnRow').val());
        var newBR = jQuery('.urlButton .btnElement').first();
        if(count > 0)
          newBR = jQuery('.urlButton .btnElement').first().clone();
        newBR.children('.btnItem').children('.btn:gt(0)').remove();
        newBR.children('.btnItem').children('.btn').removeAttr("style");
        newBR.children('.btnOptions').children('.addressLabel').show();
        newBR.removeAttr('style');

        jQuery.each(this.split('|]{[6'), function(index) {
          if(this != '') {
            if(index > 0) {
              newBR.children('.btnItem').children('.btn').first().clone().appendTo(newBR.children('.btnItem'));
              newBR.children('.btnItem').children('.btn').css('width', ((326 / countBtnCell) - 4).toFixed(2));
            }
            newBR.children('.btnItem').children('.btn').last().children('input[name=linkType]').val(this.split('|5[[}|')[0]);
            newBR.children('.btnItem').children('.btn').last().children('span.btnCaption').text(this.split('|5[[}|')[1]);
            if(this.split('|5[[}|')[0] == 'customLink')
              newBR.children('.btnItem').children('.btn').last().children('input[name=btnLink]').val(this.split('|5[[}|')[2]);
            else
              newBR.children('.btnItem').children('.btn').last().children('input[name=btnLink]').val('');
          }
        });
        if(count > 0)
          newBR.insertBefore(jQuery('.urlButton .btnAdd.after'))
        newBR.show(200);
        jQuery('.urlButton input.countBtnRow').val((count + 1));
        jQuery('div.postCustomization').height("+=40");
      }
    });
  }
  // Initialize Custom Settings (Elements & Options)
  jQuery('input.countItems').val(0);
  if(jQuery('input.elementItems').val() != '') {
    jQuery('section .add.after.first').hide();
    jQuery.each(jQuery('input.elementItems').val().split('|]{[6'), function() {
      if(this != '') {
        var count = parseInt(jQuery('input.countItems').val());
        var newElement;
        if (count > 0)
          newElement = jQuery('section div.element').first().clone();
        else
          newElement = jQuery('section .element').first();

        newElement.attr('class', 'element ' + this.split('|5[[}|')[0]);
        newElement.show();
        newElement.children('.item').children('.header').children('.dashicons').children('.counter').text(this.split('|5[[}|')[1]);
        if(this.split('|5[[}|')[1] > 0)
          newElement.children('.item').children('.header').children('.dashicons').css('display','inline-block');
        else
          newElement.children('.item').children('.header').children('.dashicons').hide();
        // **** show the style of item
        newElement.children('.item').children('.header').children('.style').hide();
        newElement.children('.item').children('.header').children('.name').css('width', '80%');

        switch (this.split('|5[[}|')[0]) {
          case 'Title':
            newElement.children('.item').children('.header').children('.name').text('Title');
            newElement.children('.item').children('.options').html(titleOptions);
            newElement.children('.add').children('.addItem').children('.Title').hide();
            jQuery('section div.element .add .addItem .Title').hide();
            jQuery('section div.imgFeatured .add .addItem .Title').hide();
            switch (this.split('|5[[}|')[2]) {
              case 'regular':
                newElement.children('.item').children('.options').children('label.radioStyle').css('background-color', '');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(0)').css('background-color', '#ff7f50');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(0)').children('input').prop('checked', true);
                break;
              case 'bold':
                newElement.children('.item').children('.options').children('label.radioStyle').css('background-color', '');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(1)').css('background-color', '#ff7f50');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(1)').children('input').prop('checked', true);
                newElement.children('.item').children('.header').children('.name').css('width', '67%');
                newElement.children('.item').children('.header').children('span.style').attr('class', 'style fas fa-bold');
                newElement.children('.item').children('.header').children('span.style').show();
                break;
              case 'italic':
                newElement.children('.item').children('.options').children('label.radioStyle').css('background-color', '');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(2)').css('background-color', '#ff7f50');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(2)').children('input').prop('checked', true);
                newElement.children('.item').children('.header').children('.name').css('width', '67%');
                newElement.children('.item').children('.header').children('span.style').attr('class', 'style fas fa-italic');
                newElement.children('.item').children('.header').children('span.style').show();
                break;
              case 'link':
                newElement.children('.item').children('.options').children('label.radioStyle').css('background-color', '');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(3)').css('background-color', '#ff7f50');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(3)').children('input').prop('checked', true);
                newElement.children('.item').children('.header').children('.name').css('width', '67%');
                newElement.children('.item').children('.header').children('span.style').attr('class', 'style fas fa-link');
                newElement.children('.item').children('.header').children('span.style').show();
                break;
            }
            break;
          case 'Excerpt':
            newElement.children('.item').children('.header').children('.name').text('Excerpt');
            newElement.children('.item').children('.options').html(excerptOptions);
            newElement.children('.add').children('.addItem').children('.Excerpt').hide();
            jQuery('section div.element .add .addItem .Excerpt').hide();
            jQuery('section div.imgFeatured .add .addItem .Excerpt').hide();
            switch (this.split('|5[[}|')[2]) {
              case 'regular':
                newElement.children('.item').children('.options').children('label.radioStyle').css('background-color', '');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(0)').css('background-color', '#ff7f50');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(0)').children('input').prop('checked', true);
                break;
              case 'bold':
                newElement.children('.item').children('.options').children('label.radioStyle').css('background-color', '');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(1)').css('background-color', '#ff7f50');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(1)').children('input').prop('checked', true);
                newElement.children('.item').children('.header').children('.name').css('width', '67%');
                newElement.children('.item').children('.header').children('span.style').attr('class', 'style fas fa-bold');
                newElement.children('.item').children('.header').children('span.style').show();
                break;
              case 'italic':
                newElement.children('.item').children('.options').children('label.radioStyle').css('background-color', '');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(2)').css('background-color', '#ff7f50');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(2)').children('input').prop('checked', true);
                newElement.children('.item').children('.header').children('.name').css('width', '67%');
                newElement.children('.item').children('.header').children('span.style').attr('class', 'style fas fa-italic');
                newElement.children('.item').children('.header').children('span.style').show();
                break;
              case 'link':
                newElement.children('.item').children('.options').children('label.radioStyle').css('background-color', '');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(3)').css('background-color', '#ff7f50');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(3)').children('input').prop('checked', true);
                newElement.children('.item').children('.header').children('.name').css('width', '67%');
                newElement.children('.item').children('.header').children('span.style').attr('class', 'style fas fa-link');
                newElement.children('.item').children('.header').children('span.style').show();
                break;
            }
            break;
          case 'Content':
            newElement.children('.item').children('.header').children('.name').text('Content');
            newElement.children('.item').children('.options').html(contentOptions);
            newElement.children('.add').children('.addItem').children('.Content').hide();
            jQuery('section div.element .add .addItem .Content').hide();
            jQuery('section div.imgFeatured .add .addItem .Content').hide();
            switch (this.split('|5[[}|')[2]) {
              case 'regular':
                newElement.children('.item').children('.options').children('label.radioStyle').css('background-color', '');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(0)').css('background-color', '#ff7f50');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(0)').children('input').prop('checked', true);
                break;
              case 'bold':
                newElement.children('.item').children('.options').children('label.radioStyle').css('background-color', '');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(1)').css('background-color', '#ff7f50');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(1)').children('input').prop('checked', true);
                newElement.children('.item').children('.header').children('.name').css('width', '67%');
                newElement.children('.item').children('.header').children('span.style').attr('class', 'style fas fa-bold');
                newElement.children('.item').children('.header').children('span.style').show();
                break;
              case 'italic':
                newElement.children('.item').children('.options').children('label.radioStyle').css('background-color', '');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(2)').css('background-color', '#ff7f50');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(2)').children('input').prop('checked', true);
                newElement.children('.item').children('.header').children('.name').css('width', '67%');
                newElement.children('.item').children('.header').children('span.style').attr('class', 'style fas fa-italic');
                newElement.children('.item').children('.header').children('span.style').show();
                break;
            }
            if(jQuery.isNumeric(this.split('|5[[}|')[3]) && parseInt(this.split('|5[[}|')[3]) > 0)
              newElement.children('.item').children('.options').children('label.maxLength').children('input[name=contentMax]').val(parseInt(this.split('|5[[}|')[3]));
            break;
          case 'Tags':
            newElement.children('.item').children('.header').children('.name').text('Tags');
            newElement.children('.item').children('.options').html(tagsOptions);
            newElement.children('.add').children('.addItem').children('.Tags').hide();
            jQuery('section div.element .add .addItem .Tags').hide();
            jQuery('section div.imgFeatured .add .addItem .Tags').hide();
            switch (this.split('|5[[}|')[2]) {
              case 'hashtag':
                newElement.children('.item').children('.options').children('label.radioStyle').css('background-color', '');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(0)').css('background-color', '#ff7f50');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(0)').children('input').prop('checked', true);
                newElement.children('.item').children('.header').children('.name').css('width', '67%');
                newElement.children('.item').children('.header').children('span.style').attr('class', 'style fas fa-hashtag');
                newElement.children('.item').children('.header').children('span.style').show();
                break;
              case 'link':
                newElement.children('.item').children('.options').children('label.radioStyle').css('background-color', '');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(1)').css('background-color', '#ff7f50');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(1)').children('input').prop('checked', true);
                newElement.children('.item').children('.header').children('.name').css('width', '67%');
                newElement.children('.item').children('.header').children('span.style').attr('class', 'style fas fa-link');
                newElement.children('.item').children('.header').children('span.style').show();
                break;
            }
            break;
          case 'More':
            newElement.children('.item').children('.header').children('.name').text('Read More');
            newElement.children('.item').children('.options').html(moreOptions);
            newElement.children('.add').children('.addItem').children('.More').hide();
            jQuery('section div.element .add .addItem .More').hide();
            jQuery('section div.imgFeatured .add .addItem .More').hide();
            newElement.children('.item').children('.options').children('label.moreLabel').children('input[name=moreCaption]').val(this.split('|5[[}|')[2]);
            break;
          default:
            newElement.children('.item').children('.header').children('.name').text('Custom Text');
            newElement.children('.item').children('.options').html(customOptions);
            var randNum = 1 + Math.floor(Math.random() * 10000);
            newElement.children('.item').children('.options').children('label.radioStyle').children('input[type=radio]').attr('name', 'customStyle' + randNum);
            switch (this.split('|5[[}|')[2]) {
              case 'regular':
                newElement.children('.item').children('.options').children('label.radioStyle').css('background-color', '');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(0)').css('background-color', '#ff7f50');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(0)').children('input').prop('checked', true);
                break;
              case 'bold':
                newElement.children('.item').children('.options').children('label.radioStyle').css('background-color', '');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(1)').css('background-color', '#ff7f50');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(1)').children('input').prop('checked', true);
                newElement.children('.item').children('.header').children('.name').css('width', '67%');
                newElement.children('.item').children('.header').children('span.style').attr('class', 'style fas fa-bold');
                newElement.children('.item').children('.header').children('span.style').show();
                break;
              case 'italic':
                newElement.children('.item').children('.options').children('label.radioStyle').css('background-color', '');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(2)').css('background-color', '#ff7f50');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(2)').children('input').prop('checked', true);
                newElement.children('.item').children('.header').children('.name').css('width', '67%');
                newElement.children('.item').children('.header').children('span.style').attr('class', 'style fas fa-italic');
                newElement.children('.item').children('.header').children('span.style').show();
                break;
              case 'link':
                newElement.children('.item').children('.options').children('label.radioStyle').css('background-color', '');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(3)').css('background-color', '#ff7f50');
                newElement.children('.item').children('.options').children('label.radioStyle:eq(3)').children('input').prop('checked', true);
                newElement.children('.item').children('.header').children('.name').css('width', '67%');
                newElement.children('.item').children('.header').children('span.style').attr('class', 'style fas fa-link');
                newElement.children('.item').children('.header').children('span.style').show();
                newElement.children('.item').children('.options').children('label.linkLabel').slideDown();
                newElement.children('.item').children('.options').children('label.linkLabel').children('input[name=customLink]').val(this.split('|5[[}|')[4]);
                break;
            }
            newElement.children('.item').children('.options').children('label.textLabel').children('input[name=customText]').val(this.split('|5[[}|')[3]);
        }
        if(count > 0)
          newElement.insertBefore('section .add.after.first');
        jQuery('input.countItems').val(++count);
        jQuery('div.postCustomization').height("+=35");
      }
    });
  }
  // Initialize Custom Settings (Delay)
  if(jQuery('section header .delay .inputDelay input').val() != '' && jQuery('section header .delay .inputDelay input').val() > 0) {
    jQuery('section header .delay').css('background-color', '#f1c40f');
    jQuery('section header .delay').css('color', '#fff');
  }
  // Initialize Custom Settings (Image)
  if(jQuery('input.imageType').val() != '') {
    jQuery('section .imgFeatured.' + jQuery('input.imageType').val()).show();
    jQuery('section div.element .add .addItem .Image').hide();
    jQuery('div.postCustomization').height("+=245");
    jQuery('section .add.after.first').hide();
  }

  // Tab Menu
  jQuery('div.panels div.tabContent:eq(' + jQuery('nav.tabMenu ul li.selected').index() + ')').fadeIn(200);
  jQuery('nav.tabMenu ul li').click(function() {
    jQuery('div.panels div.tabContent').fadeOut(200);
    jQuery('nav.tabMenu ul li').removeClass('selected');
    jQuery(this).addClass('selected');
    jQuery('div.panels div.tabContent:eq(' + jQuery(this).index() + ')').delay(200).fadeIn(200);
  });
  // Open Options For The Element
  jQuery('.postCustomization section').on('click', 'div.element .item .header .name', function() {
    jQuery(this).parent().next().slideToggle(200);
  });
  // Close Everything When Mouse Leave
  jQuery('.postCustomization section').on('mouseleave', 'div.element', function() {
    jQuery(this).children('div.item').children('div.options').slideUp(200);
    jQuery(this).children('div.add').children('ul.addItem').slideUp(200);
  });
  // Open Add menu (After)
  jQuery('.postCustomization section').on('click', 'div.element .add.after', function() {
    jQuery('div.element .add.before').children('ul.addItem').slideUp(200);
    jQuery(this).children('ul.addItem').slideToggle(200);
  });
  // Open Add menu (Before)
  jQuery('.postCustomization section').on('click', 'div.element .add.before', function() {
    jQuery('div.element .add.after').children('ul.addItem').slideUp(200);
    jQuery(this).children('ul.addItem').slideToggle(200);
  });
  // Open Add menu (Image)
  jQuery('.postCustomization section').on('click', '.add.img', function() {
    jQuery(this).children('ul.addItem').slideToggle(200);
  });
  // Close Add menu (Image)
  jQuery('.postCustomization section').on('mouseleave', 'div.imgFeatured', function() {
    jQuery(this).children('div.add').children('ul.addItem').slideUp(200);
  });
  // Open Add menu (First)
  jQuery('.postCustomization section').on('click', '.add.first', function() {
    jQuery(this).children('ul.addItem').slideToggle(200);
  });
  // Image add Item
  jQuery('.postCustomization section').on('click', '.add.img .addItem li', function() {
    var currentImg = jQuery(this).parents('.imgFeatured');
    var newElement;
    var count = jQuery('input.countItems').val();
    if(count > 0)
      newElement = jQuery('section .element').first().clone();
    else
      newElement = jQuery('section .element').first();
    newElement.attr('class', 'element ' + jQuery(this).attr('class'));
    newElement.show(200);
    newElement.children('.item').children('.header').children('.name').text(jQuery(this).text());
    newElement.children('.item').children('.header').children('.dashicons').children('.counter').text(1);
    newElement.children('.item').children('.header').children('.dashicons').css('display','inline-block');
    newElement.children('.item').children('.header').children('.style').hide();
    newElement.children('.item').children('.header').children('.name').css('width', '80%');
    switch (jQuery(this).attr('class')) {
      case 'Title':
        newElement.children('.item').children('.options').html(titleOptions);
        newElement.children('.add').children('.addItem').children('.Title').hide();
        jQuery('section div.element .add .addItem .Title').hide();
        jQuery('section div.imgFeatured .add .addItem .Title').hide();
        break;
      case 'Excerpt':
        newElement.children('.item').children('.options').html(excerptOptions);
        newElement.children('.add').children('.addItem').children('.Excerpt').hide();
        jQuery('section div.element .add .addItem .Excerpt').hide();
        jQuery('section div.imgFeatured .add .addItem .Excerpt').hide();
        break;
      case 'Content':
        newElement.children('.item').children('.options').html(contentOptions);
        newElement.children('.add').children('.addItem').children('.Content').hide();
        jQuery('section div.element .add .addItem .Content').hide();
        jQuery('section div.imgFeatured .add .addItem .Content').hide();
        break;
      case 'Tags':
        newElement.children('.item').children('.options').html(tagsOptions);
        newElement.children('.item').children('.header').children('.style').attr('class', 'style fas fa-hashtag');
        newElement.children('.item').children('.header').children('.name').css('width', '67%');
        newElement.children('.item').children('.header').children('.style').show();
        newElement.children('.add').children('.addItem').children('.Tags').hide();
        jQuery('section div.element .add .addItem .Tags').hide();
        jQuery('section div.imgFeatured .add .addItem .Tags').hide();
        break;
      case 'More':
        newElement.children('.item').children('.options').html(moreOptions);
        newElement.children('.add').children('.addItem').children('.More').hide();
        jQuery('section div.element .add .addItem .More').hide();
        jQuery('section div.imgFeatured .add .addItem .More').hide();
        break;
      default:
        newElement.children('.item').children('.options').html(customOptions);
        var randNum = 1 + Math.floor(Math.random() * 10000);
        newElement.children('.item').children('.options').children('label.radioStyle').children('input[type=radio]').attr('name', 'customStyle' + randNum);
    }
    newElement.children('.item').children('.options').children('label.radioStyle').first().css('background-color', '#ff7f50');
    newElement.children('.item').children('.options').children('label.radioStyle').first().children().prop('checked', true);
    if (jQuery(this).parents('.add.img').attr('class') == 'add after img') {
      if(count > 0)
        newElement.insertBefore(currentImg.next());
    }
    else {
      if(count > 0)
        newElement.insertBefore(currentImg.prev());
    }
    jQuery('input.countItems').val(++count);
    jQuery('div.postCustomization').height("+=35");
  });
  // First add Item
  jQuery('.postCustomization section').on('click', '.add.first .addItem li', function() {
    jQuery(this).parents('.add.after.first').hide(200);
    if(jQuery(this).attr('class') == 'Image') {
      jQuery('.postCustomization .popUpBg').fadeIn(200);
      jQuery('.postCustomization .popUpBg .popUpFg').slideDown(200);
    }
    else{
      var newElement = jQuery(this).parents('.add.after.first').prev();
      newElement.attr('class', 'element ' + jQuery(this).attr('class'));
      newElement.show(300);
      newElement.children('.item').children('.header').children('.name').text(jQuery(this).text());
      newElement.children('.item').children('.header').children('.dashicons').children('.counter').text(1);
      newElement.children('.item').children('.header').children('.dashicons').css('display','inline-block');
      newElement.children('.item').children('.header').children('.style').hide();
      newElement.children('.item').children('.header').children('.name').css('width', '80%');
      switch (jQuery(this).attr('class')) {
        case 'Title':
          newElement.children('.item').children('.options').html(titleOptions);
          jQuery('section div.element .add .addItem .Title').hide();
          jQuery('section div.imgFeatured .add .addItem .Title').hide();
          break;
        case 'Excerpt':
          newElement.children('.item').children('.options').html(excerptOptions);
          jQuery('section div.element .add .addItem .Excerpt').hide();
          jQuery('section div.imgFeatured .add .addItem .Excerpt').hide();
          break;
        case 'Content':
          newElement.children('.item').children('.options').html(contentOptions);
          jQuery('section div.element .add .addItem .Content').hide();
          jQuery('section div.imgFeatured .add .addItem .Content').hide();
          break;
        case 'Tags':
          newElement.children('.item').children('.options').html(tagsOptions);
          newElement.children('.item').children('.header').children('.style').attr('class', 'style fas fa-hashtag');
          newElement.children('.item').children('.header').children('.name').css('width', '67%');
          newElement.children('.item').children('.header').children('.style').show();
          jQuery('section div.element .add .addItem .Tags').hide();
          jQuery('section div.imgFeatured .add .addItem .Tags').hide();
          break;
        case 'More':
          newElement.children('.item').children('.options').html(moreOptions);
          jQuery('section div.element .add .addItem .More').hide();
          jQuery('section div.imgFeatured .add .addItem .More').hide();
          break;
        default:
          newElement.children('.item').children('.options').html(customOptions);
          var randNum = 1 + Math.floor(Math.random() * 10000);
          newElement.children('.item').children('.options').children('label.radioStyle').children('input[type=radio]').attr('name', 'customStyle' + randNum);
      }
      newElement.children('.item').children('.options').children('label.radioStyle').first().css('background-color', '#ff7f50');
      newElement.children('.item').children('.options').children('label.radioStyle').first().children().prop('checked', true);
      var count = jQuery('input.countItems').val();
      jQuery('input.countItems').val(++count);
      jQuery('div.postCustomization').height("+=35");
    }
  });
  // Add Item
  jQuery('.postCustomization section').on('click', 'div.element .add .addItem li', function() {
    var currentElement = jQuery(this).parents('div.element');
    var newElement;
    if(jQuery(this).attr('class') == 'Image') {
      jQuery('.postCustomization .popUpBg').fadeIn(200);
      jQuery('.postCustomization .popUpBg .popUpFg').slideDown(200);
    }
    else{
      newElement = jQuery(currentElement).clone();
      newElement.attr('class', 'element ' + jQuery(this).attr('class'));
      newElement.children('.item').children('.header').children('.name').text(jQuery(this).text());
      newElement.children('.item').children('.header').children('.dashicons').children('.counter').text(1);
      newElement.children('.item').children('.header').children('.dashicons').css('display','inline-block');
      newElement.children('.item').children('.header').children('.style').hide();
      newElement.children('.add').children('ul.addItem').hide();
      newElement.children('.item').children('.header').children('.name').css('width', '80%');
      newElement.children('.item').children('.options').hide();

      switch (jQuery(this).attr('class')) {
        case 'Title':
          newElement.children('.item').children('.options').html(titleOptions);
          newElement.children('.add').children('.addItem').children('.Title').hide();
          jQuery('section div.element .add .addItem .Title').hide();
          jQuery('section div.imgFeatured .add .addItem .Title').hide();
          break;
        case 'Excerpt':
          newElement.children('.item').children('.options').html(excerptOptions);
          newElement.children('.add').children('.addItem').children('.Excerpt').hide();
          jQuery('section div.element .add .addItem .Excerpt').hide();
          jQuery('section div.imgFeatured .add .addItem .Excerpt').hide();
          break;
        case 'Content':
          newElement.children('.item').children('.options').html(contentOptions);
          newElement.children('.add').children('.addItem').children('.Content').hide();
          jQuery('section div.element .add .addItem .Content').hide();
          jQuery('section div.imgFeatured .add .addItem .Content').hide();
          break;
        case 'Tags':
          newElement.children('.item').children('.options').html(tagsOptions);
          newElement.children('.item').children('.header').children('.style').attr('class', 'style fas fa-hashtag');
          newElement.children('.item').children('.header').children('.name').css('width', '67%');
          newElement.children('.item').children('.header').children('.style').show();
          newElement.children('.add').children('.addItem').children('.Tags').hide();
          jQuery('section div.element .add .addItem .Tags').hide();
          jQuery('section div.imgFeatured .add .addItem .Tags').hide();
          break;
        case 'More':
          newElement.children('.item').children('.options').html(moreOptions);
          newElement.children('.add').children('.addItem').children('.More').hide();
          jQuery('section div.element .add .addItem .More').hide();
          jQuery('section div.imgFeatured .add .addItem .More').hide();
          break;
        default:
          newElement.children('.item').children('.options').html(customOptions);
          var randNum = 1 + Math.floor(Math.random() * 10000);
          newElement.children('.item').children('.options').children('label.radioStyle').children('input[type=radio]').attr('name', 'customStyle' + randNum);
      }
      newElement.children('.item').children('.options').children('label.radioStyle').first().css('background-color', '#ff7f50');
      newElement.children('.item').children('.options').children('label.radioStyle').first().children('input').prop('checked', true);
      if(jQuery(this).parents('div.add').attr("class") == 'add before') {
        newElement.insertBefore(currentElement);
      }
      else {
        newElement.insertBefore(currentElement.next());
      }
      var count = jQuery('input.countItems').val();
      jQuery('input.countItems').val(++count);
      jQuery('div.postCustomization').height("+=35");
    }
  });
  // Close Selecting Image Type
  jQuery('.popUpBg').click(function() {
    jQuery(this).children('.popUpFg').slideUp(200);
    jQuery(this).fadeOut(300);
    var count = jQuery('input.countItems').val();
    var type = jQuery('input.imageType').val();
    if(count == 0 && type == '')
      jQuery('section .add.first').show(200);
  });
  // Selecting Image Type
  jQuery('.popUpBg .popUpFg .imgType').click(function() {
    jQuery('section div.imgFeatured.' + jQuery(this).attr('id')).show(200);
    jQuery('section div.element .add .addItem .Image').hide();
    jQuery('div.postCustomization').height("+=245");
    jQuery('input.imageType').val(jQuery(this).attr('id'));
  });
  // Add New Line
  jQuery('.postCustomization section').on('click', 'div.element .side.nl', function() {
    var countNl = jQuery(this).prev().children('.header').children('.dashicons').children('.counter');
    if (countNl.text() == 0)
      countNl.parents('.dashicons').show(200);
    countNl.text(parseInt(countNl.text()) + 1);
  });
  // Remove New Line
  jQuery('.postCustomization section').on('click', 'div.element .item .header .dashicons .minus', function() {
    var countNl = parseInt(jQuery(this).next().text());
    if(countNl == 1)
      jQuery(this).parents('.dashicons').hide(200);
    jQuery(this).next().text(countNl - 1);
  });
  // Remove Item
  jQuery('.postCustomization section').on('click', 'div.element .side.remove', function() {
    var count = jQuery('input.countItems').val();
    if(count > 1) {
      jQuery(this).parents('div.element').hide(200, function() {
        jQuery(this).remove();
      });
    }
    else {
      jQuery(this).parents('div.element').hide(200);
    }
    switch (jQuery(this).parents('.element').attr('class')) {
      case 'element Title':
        jQuery('section div.element .add .addItem .Title').show();
        jQuery('section div.imgFeatured .add .addItem .Title').show();
        break;
      case 'element Excerpt':
        jQuery('section div.element .add .addItem .Excerpt').show();
        jQuery('section div.imgFeatured .add .addItem .Excerpt').show();
        break;
      case 'element Content':
        jQuery('section div.element .add .addItem .Content').show();
        jQuery('section div.imgFeatured .add .addItem .Content').show();
        break;
      case 'element Tags':
        jQuery('section div.element .add .addItem .Tags').show();
        jQuery('section div.imgFeatured .add .addItem .Tags').show();
        break;
      case 'element More':
        jQuery('section div.element .add .addItem .More').show();
        jQuery('section div.imgFeatured .add .addItem .More').show();
        break;
    }
    jQuery('input.countItems').val(--count);
    jQuery('div.postCustomization').height("-=35");
    var type = jQuery('input.imageType').val();
    if(count == 0 && type == '')
      jQuery('section .add.first').show(200);
  });
  // Remove Image Element
  jQuery('.postCustomization section').on('click', 'div.imgFeatured .imgOption .imgRemove', function() {
    jQuery(this).parents('div.imgFeatured').hide(200);
    jQuery('section div.element .add .addItem .Image').show();
    jQuery('input.imageType').val('');
    jQuery('div.postCustomization').height("-=245");
    var count = jQuery('input.countItems').val();
    var type = jQuery('input.imageType').val();
    if(count == 0 && type == '')
      jQuery('section .add.first').show(200);
  });
  // Move Image
  jQuery('.postCustomization section').on('click', 'div.imgFeatured .imgOption .imgMove', function() {
    var curParrent = jQuery(this).parents('div.imgFeatured');
    if (curParrent.attr('class') == 'imgFeatured imgBottom') {
      jQuery('div.imgFeatured.imgTop').slideDown(200);
      jQuery('input.imageType').val('imgTop');
    }
    else {
      jQuery('div.imgFeatured.imgBottom').slideDown(200);
      jQuery('input.imageType').val('imgBottom');
    }
    curParrent.slideUp(200);
  });
  // Close Add First
  jQuery('section').mouseleave(function() {
    jQuery('.add.first').children('ul.addItem').slideUp(200);
  });
  // Set Delay
  jQuery('.postCustomization section').on('click', '.beginOfPost .delay i', function() {
    jQuery(this).next().toggle(200);
    if (jQuery(this).parents('.delay').css('background-color') == 'rgb(255, 255, 255)') {
      jQuery(this).parents('.delay').css('background-color', '#f1c40f');
      jQuery(this).parents('.delay').css('color', '#fff');
    }
    else {
      if(jQuery(this).next().children('input').val() == 0) {
        jQuery(this).parents('.delay').css('background-color', '#fff');
        jQuery(this).parents('.delay').css('color', '#999');
      }
    }
  });
  // Set Style For Item
  jQuery('.postCustomization section').on('click', '.options label.radioStyle', function() {
    jQuery(this).siblings().css('background-color', '');
    jQuery(this).css('background-color', '#ff7f50');
    var currentStyle = jQuery(this).children('input').val();
    if(currentStyle == 'regular') {
      jQuery(this).parents('.options').prev().children('span.style').hide(200, function() {
        jQuery(this).siblings('.name').css('width', '80%');
      });
    }
    else {
      jQuery(this).parents('.options').prev().children('.name').css('width', '67%');
      jQuery(this).parents('.options').prev().children('span.style').attr('class', 'style fas fa-' + currentStyle);
      jQuery(this).parents('.options').prev().children('span.style').show(200);
    }
  });
  // Enter Custom Link
  jQuery('.postCustomization section').on('click', '.options label.radioStyle.text', function() {
    if(jQuery(this).children('input').val() == 'link') {
      jQuery(this).siblings('.linkLabel').slideDown(500);
    }
    else {
      jQuery(this).siblings('.linkLabel').slideUp(500);
    }
  });
  // Add Button Cell
  jQuery('.postCustomization .urlButton').on('click', '.btnElement .btnAddCell', function() {
    var countBtnCell = jQuery(this).prev().children('.btn').length;
    if(countBtnCell == 8)
      return;
    jQuery(this).prev().children().width(((252 / (countBtnCell + 1)) - 14).toFixed(2));
    jQuery(this).prev().children().first().clone().appendTo(jQuery(this).prev());
    jQuery(this).prev().children('.btn').css('background-color','');
    jQuery(this).next().slideUp(200);
    jQuery(this).parent().css('height','');
    jQuery(this).prev().children('.btn').last().children('span.btnCaption').text('Link');
    jQuery(this).prev().children('.btn').last().children('input[name=btnLink]').val('');
    jQuery(this).prev().children('.btn').last().children('input[name=linkType]').val('customLink');
  });
  // Resize Button
  jQuery('.postCustomization .urlButton').on('mouseenter', '.btnElement', function() {
    var countBtnCell = jQuery(this).children('.btnItem').children('.btn').length;
    jQuery(this).children('.btnItem').children('.btn').animate({width: ((252 / countBtnCell) - 4).toFixed(2)}, 200);
  });
  jQuery('.postCustomization .urlButton').on('mouseleave', '.btnElement', function() {
    var countBtnCell = jQuery(this).children('.btnItem').children('.btn').length;
    jQuery(this).children('.btnItem').children('.btn').animate({width: ((326 / countBtnCell) - 4).toFixed(2)}, 200);
  });
  // Remove Button Row
  jQuery('.postCustomization .urlButton').on('click', '.btnElement .btnRemove', function() {
    var cBR = parseInt(jQuery('.urlButton').children('input.countBtnRow').val());
    if(cBR > 1) {
      jQuery(this).parents('.btnElement').hide(200, function() {
        jQuery(this).remove();
      });
    }
    else {
      jQuery(this).parents('.btnElement').hide(200);
    }
    jQuery('.urlButton').children('input.countBtnRow').val((cBR - 1));
    jQuery('div.postCustomization').height("-=40");
  });
  // Add Button Row After
  jQuery('.postCustomization .urlButton').on('click', '.btnAdd.after', function() {
    var cBR = parseInt(jQuery('.urlButton').children('input.countBtnRow').val());
    var newBR = jQuery(this).prev();
    if(cBR > 0)
      newBR = jQuery(this).prev().clone();
    newBR.children('.btnItem').children('.btn:gt(0)').remove();
    newBR.children('.btnItem').children('.btn').removeAttr("style");
    newBR.children('.btnOptions').hide();
    newBR.children('.btnItem').children('.btn').children('span.btnCaption').text('Link');
    newBR.children('.btnItem').children('.btn').children('input[name=btnLink]').val('');
    newBR.children('.btnItem').children('.btn').children('input[name=linkType]').val('customLink');
    newBR.children('.btnOptions').children('.addressLabel').show();
    newBR.removeAttr('style');
    if(cBR > 0)
      newBR.insertBefore(jQuery(this));
    newBR.show(200);
    jQuery('.urlButton').children('input.countBtnRow').val((cBR + 1));
    jQuery('div.postCustomization').height("+=40");
  });
  // Add Button Row Before
  jQuery('.postCustomization .urlButton').on('click', '.btnAdd.before', function() {
    var cBR = parseInt(jQuery('.urlButton').children('input.countBtnRow').val());
    jQuery(this).siblings('.btnOptions').hide();
    jQuery(this).parent().css('height','');
    var newBR = jQuery(this).parent().clone();
    newBR.children('.btnItem').children('.btn:gt(0)').remove();
    newBR.children('.btnItem').children('.btn').removeAttr("style");
    newBR.children('.btnItem').children('.btn').children('span.btnCaption').text('Link');
    newBR.children('.btnItem').children('.btn').children('input[name=btnLink]').val('');
    newBR.children('.btnItem').children('.btn').children('input[name=linkType]').val('customLink');
    newBR.children('.btnOptions').children('.addressLabel').show();
    newBR.removeAttr('style');
    newBR.insertBefore(jQuery(this).parent());
    newBR.show(200);
    jQuery('.urlButton').children('input.countBtnRow').val((cBR + 1));
    jQuery('div.postCustomization').height("+=40");
  });
  // Open Options For Button
  var whichButton;
  jQuery('.postCustomization .urlButton').on('click', '.btnElement .btnItem .btn', function() {
    whichButton = jQuery(this);
    if(whichButton.children('input[name=linkType]').val() == 'customLink')
      whichButton.parents('.btnElement').animate({height: 193}, 200);
    else
      whichButton.parents('.btnElement').animate({height: 162}, 200);
    jQuery(this).parent().siblings('.btnOptions').slideUp(200, function() {
      jQuery(this).children('label.captionLabel').children('input').val(jQuery.trim(whichButton.children('span.btnCaption').text()));
      jQuery(this).children('label.addressLabel').children('input').val(whichButton.children('input[name=btnLink]').val());
      if(whichButton.children('input[name=linkType]').val() == 'customLink') {
        whichButton.parent().siblings('.btnOptions').children('label.radioStyle').first().css('background-color', '');
        whichButton.parent().siblings('.btnOptions').children('label.radioStyle').last().css('background-color', '#ff7f50');
        whichButton.parent().siblings('.btnOptions').children('.addressLabel').css('display','inline');
      }
      else {
        whichButton.parent().siblings('.btnOptions').children('label.radioStyle').first().css('background-color', '#ff7f50');
        whichButton.parent().siblings('.btnOptions').children('label.radioStyle').last().css('background-color', '');
        whichButton.parent().siblings('.btnOptions').children('.addressLabel').hide();
      }
    });
    jQuery(this).parent().siblings('.btnOptions').slideDown(200);
    jQuery(this).siblings().css('background-color','rgba(127, 140, 141,.8)');
    jQuery(this).css('background-color','rgba(0, 136, 204, .7)');
  });
  // Set Style For Button
  jQuery('.postCustomization .urlButton').on('click', '.btnElement .btnOptions label.radioStyle', function() {
    jQuery(this).siblings().css('background-color', '');
    jQuery(this).css('background-color', '#ff7f50');
    whichButton.children('input[name=linkType]').val(jQuery(this).attr('id'));
    if(jQuery(this).attr('id') == 'customLink') {
      jQuery(this).siblings('.addressLabel').slideDown(200);
      jQuery(this).siblings('.addressLabel').css('display','inline');
      jQuery(this).parents('.btnElement').animate({height: 193}, 200);
    }
    else {
      jQuery(this).siblings('.addressLabel').slideUp(200);
      jQuery(this).parents('.btnElement').animate({height: 162}, 200);
    }
  });
  // Save Options For Button
  jQuery('.postCustomization .urlButton').on('change', '.btnElement .btnOptions label.captionLabel input', function() {
    whichButton.children('span.btnCaption').text(jQuery(this).val());
  });
  jQuery('.postCustomization .urlButton').on('change', '.btnElement .btnOptions label.addressLabel input', function() {
    whichButton.children('input[name=btnLink]').val(jQuery(this).val());
  });
  // Close Options For Button
  jQuery('.postCustomization .urlButton').on('mouseleave', '.btnElement', function() {
    jQuery(this).css('height','');
    jQuery(this).children('.btnOptions').slideUp(200);
    jQuery(this).children('.btnItem').children('.btn').css('background-color','');
  });
  // Enable Auto Posting
  jQuery('div#customize div.enabling label.enableSendingPost').click(function () {
    switch(jQuery(this).children('input').val()) {
      case 'checked':
        jQuery(this).css('background-color', '#eee');
        jQuery(this).css('border', '1px solid #bbb');
        jQuery(this).children('span.bull').css('left', '0');
        jQuery(this).children('input').val('unchecked');
        break;
      case 'unchecked':
        jQuery(this).css('background-color', '#08c');
        jQuery(this).css('border', '1px solid #08c');
        jQuery(this).children('span.bull').css('left', '20px');
        jQuery(this).children('input').val('checked');
        break;
      default:
        jQuery(this).next().text('First you must set initial settings');
    }
  });
  // Save All The Elements & Options
  jQuery("#customize input[name='submitCustomize']").click( function() {
    var elements = '';
    if(parseInt(jQuery('input.countItems').val()) > 0) {
      jQuery('section div.element').each( function() {
        elements += (jQuery(this).attr('class').split(' ')[1] + '|5[[}|');
        elements += (jQuery(this).children('.item').children('.header').children('.dashicons').children('.counter').text() + '|5[[}|');
        if(typeof(jQuery(this).children('.item').children('.options').children('label').children('input[type=radio]').val()) !== 'undefined')
          elements += (jQuery(this).children('.item').children('.options').children('label').children('input[type=radio]:checked').val() + '|5[[}|');
        if(typeof(jQuery(this).children('.item').children('.options').children('label').children('input[type=text]').first().val()) !== 'undefined')
          elements += (jQuery(this).children('.item').children('.options').children('label').children('input[type=text]').first().val() + '|5[[}|');
        if(typeof(jQuery(this).children('.item').children('.options').children('label').children('input[name=customLink]').val()) !== 'undefined')
          elements += (jQuery(this).children('.item').children('.options').children('label').children('input[name=customLink]').val() + '|5[[}|');
        elements += '|]{[6';
      });
    }
    jQuery('input.elementItems').val(elements);
    var buttons = '';
    if(parseInt(jQuery('input.countBtnRow').val()) > 0) {
      jQuery('.urlButton div.btnElement').each( function(index) {
        jQuery(this).children('.btnItem').children('.btn').each( function() {
          buttons += (jQuery(this).children('input[name=linkType]').val() + '|5[[}|');
          buttons += (jQuery(this).children('span.btnCaption').text() + '|5[[}|');
          buttons += (jQuery(this).children('input[name=btnLink]').val() + '|]{[6');
        });
        buttons += '[{7|[]';
      });
    }
    jQuery('input.elementButtons').val(buttons);
  });
});
