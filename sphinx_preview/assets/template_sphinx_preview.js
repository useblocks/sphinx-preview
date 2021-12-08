// use "load" method instead of document.ready.
// Chromium/webkit may work with load only.
// Otherwise jquery-position() delivers wrong / not initialised
// values and the iframes are jumping
$( window ).on('load', (function() {
// $(function() {
  var sp_active = false;
  var config = {{ config }}

    if(config.set_icon) {
      $(config.selector).not(config.not_selector).each(function () {
        let node_string = '<span class="sp_preview_icon" data-sp-link="'+ $(this).attr('href')+'">' + config.icon + '</span>'

        if(config.icon_click){
          // if click, the icon must not be part of the link / a-element, as a click would open the link and
          // not our preview window only
          $(node_string).insertAfter($(this))
        }else {
          $(this).append(node_string)
        }
      })
  }

  let add_iframe = function (node) {
    // Destroy iframe-container, as we need a complete reload of the iframe.
    // Otherwise anchor changes of the same page are not detected by the iframe
    // and iframe keeps showing old data.
    $("#sp_preview").each(
      function() {
        $(this).remove();
      });

    node.append('<div id="sp_preview"><iframe id="sp_preframe" src=""></iframe></div>')
  }
  let over_function = function() {
    // Be sure we start iframe handling only, if it was not done before.
    // This may be the case if e.g. mouseover and click are as as trigger.
    if (sp_active == false) {
      sp_active = true;
      var position = $(this).offset(); //cache the position
      var position_screen = {  // relative position on the screen
        left: position.left - $(window).scrollLeft(),
        top: position.top - $(window).scrollTop(),
      }
      var link_node = $(this)

      var win_height = $(window).height()
      var win_width = $(window).width()

      if(link_node.is('a')) {
        var link_target = link_node.attr('href');
      }else {  // must be the icon span element
        var link_target = link_node.attr('data-sp-link');
      }

      // we always need to add a "new" iframe and div container, otherwise
      // chromium based browser act strange
      add_iframe(link_node);
      $("#sp_preframe").attr('src', link_target);  //  update iframe src

      if(config.icon_click === false || link_node.is('a')) {
        // close iframe, if mouse leaves a/icon
        link_node.mouseleave(out_function);
      }
      // Always close iframe, if mouse leaves preview div
      $("#sp_preframe").mouseleave(out_function);

      // Some debug info
      console.log('link: ' + link_target);
      console.log('left: ' + position.left + 'top: ' + position.top);
      console.log('width:' + config.width + ' height; ' + config.height);

      // set iframe position relative to link
      pos_left = position.left + config.offset.left
      pos_top = position.top + config.offset.top
      pos_screen_left = position_screen.left + config.offset.left
      pos_screen_top = position_screen.top + config.offset.top
      width = config.width
      height = config.height

      // console.log(
      //   'pos_left: ' + pos_left + '\n' +
      //   'pos_top: ' + pos_top + '\n' +
      //   'pos_screen_left: ' + pos_screen_left + '\n' +
      //   'pos_screen_top: ' + pos_screen_top + '\n' +
      //   'width: ' + width + '\n' +
      //   'height: ' + height + '\n' +
      //   'win_width: ' + win_width + '\n' +
      //   'win_height: ' + win_height + '\n')

      // Check if iframe window will not be "outside"
      if(width > win_width){ width = win_width }
      if(pos_screen_left + width + 50 > win_width){ pos_left = win_width - width - 50; }
      if(pos_left < 0) { pos_left = 50; }

      if(height > win_height){ height = win_height }
      if(pos_screen_top + height > win_height){ pos_top = position.top - height}  // show above link
      if(pos_screen_top < 0) { pos_top = 50; }

      // console.log(
      //   ' -> pos_left: ' + pos_left + '\n' +
      //   ' -> pos_top: ' + pos_top + '\n' +
      //   ' -> width: ' + width + '\n' +
      //   ' -> height: ' + height + '\n' +
      //   ' -> win_width: ' + win_width + '\n' +
      //   ' -> win_height: ' + win_height + '\n')

      $("#sp_preview").css({
        width: width,
        height: height,
        top: pos_top,
        left: pos_left,
        position: 'absolute'
      });

      // show iframe after some time only
      window.setTimeout(function () {
        if (sp_active) {
          $("#sp_preview").show();
        }
      }, config.timeout);
    }else {
      sp_active = false;
      out_function();
    }

  };

  let out_function = function() {
    sp_active = false;
    // We need to remove the preview div including the iframe, otherwise chromium based browser handle strange
    // and do not reload the iframe correctly. They just go to the top of the page and stay there forever.
    $("#sp_preview").hide();
    $("#sp_preview").remove();
  };

  let selector = '';
  if(config.set_icon) {
    selector = 'span.sp_preview_icon'
    if(config.icon_click)
    {
      $(selector).on('click', over_function);
    }else{
      $(selector).mouseover(over_function);
    }
  }
  if (config.icon_only === false) {
    selector = config.selector;
    $(selector).mouseover(over_function);
  }

}));
