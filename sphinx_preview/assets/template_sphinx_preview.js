// use "load" method instead of document.ready.
// Chromium/webkit may work with load only.
// Otherwise jquery-position() delivers wrong / not initialised
// values and the iframes are jumping
$( window ).on('load', (function() {
// $(function() {
  var hovered = false;
  var config = {{ config }}

    if(config.set_icon) {
    $(config.selector).not(config.not_selector).each(function () {
      $(this).append('<span class="sp_preview_icon">' + config.icon + '</span>')
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
  let over_function = function(){
    hovered = true;
    var position = $(this).offset(); //cache the position
    var link_node = $(this).parent()
    var link_target = link_node.attr('href');

    // we always need to add a "new" iframe and div container, otherwise
    // chromium based browser act strange
    add_iframe(link_node);
    $("#sp_preframe").attr('src', link_target);  //  update iframe src
    link_node.mouseleave(out_function); // close iframe, if mouse leaves div

    // Some debug info
    console.log('link: ' + link_target);
    console.log('left: ' + position.left + 'top: ' + position.top );
    console.log('width:' + config.width + ' height; ' + config.height);

    // set iframe position relative to link
    $("#sp_preview").css({
      width: config.width, height: config.height,
      top: position.top+ config.offset.top,
      left: position.left + config.offset.left , position:'absolute'});

    // show iframe after some time only
    window.setTimeout(function() {
      if(hovered) {  $("#sp_preview").show(); }
    }, config.timeout);
  };

  let out_function = function() {
    hovered = false;
    // We need to remove the preview div including the iframe, otherwise chromium based browser handle strange
    // and do not reload the iframe correctly. They just go to the top of the page and stay there forever.
    $("#sp_preview").hide();
    $("#sp_preview").remove();
  };

  if(config.set_icon && config.icon_only) {
    $('span.sp_preview_icon').mouseover(over_function);
    // $('span.sp_preview_icon').mouseleave(out_function);
  }else {
    $(config.selector).mouseover(over_function);
    // $(config.selector).mouseleave(out_function);
  }

}));
