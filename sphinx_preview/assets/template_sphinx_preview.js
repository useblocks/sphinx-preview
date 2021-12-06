$(function() {
  console.log("EXECUTED")

  var hovered = false;
  var config = {{ config }}

    if(config.set_icon) {
    $(config.selector).not(config.not_selector).each(function () {
      $(this).append('<span class="preview_icon">' + config.icon + '</span>')
    })
  }

  let add_iframe = function () {
    // Destroy iframe-container, as we need a complete reload of the iframe.
    // Otherwise anchor changes of the same page are not detected by the iframe
    // and iframe keeps showing old data.
    $("#preview").each(
      function() {
        $(this).remove();
      });

    $("body").append('<div id="preview"><iframe id="preframe" src=""></iframe></div>')
  }
  let over_function = function(){
    hovered = true;
    var position = $(this).offset(); //cache the position
    console.log(position)
    var link = $(this).parent().attr('href');
    var old_link = $("#preframe").attr('src');

    if(link !== old_link) {
      add_iframe();
      $("#preframe").attr('src', link);  //  update iframe src
    };
    // set iframe position relative to link
    $("#preview").css({top: position.top+ config.offset.top,
      left: position.left + config.offset.left , position:'absolute'});
    $("#preview").css({width: config.width, height: config.height});

    // show iframe after some time only
    window.setTimeout(function() {
      if(hovered) {  $("#preview").show(); }
    }, config.timeout);
  };

  let out_function = function() {
    hovered = false;
    $("#preview").hide();
  };

  if(config.set_icon && config.icon_only) {
    $('span.preview_icon').mouseover(over_function);
    $('span.preview_icon').mouseleave(out_function);
  }else {
    $(config.selector).mouseover(over_function);
    $(config.selector).mouseleave(out_function);
  }


});
