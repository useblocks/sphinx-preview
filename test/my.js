$(function() {
  var hovered = false;
  var config = {
    "selector": "a",
    "set_icon": true,
    "icon_only": true,
    "offset": {
      "left": 20,
      "top": 20
    },
    "icon": "  👁",
    "timeout": 200,
  }

  if(config.set_icon) {
    $(config.selector).each(function () {
      $(this).append('<span class="preview_icon">' + config.icon + '</span>')
    })
  }

  let over_function = function(){
    hovered = true;
    var position = $(this).position(); //cache the position
    var link = $(this).parent().attr('href');

    $("#preframe").attr('src', link);  //  update iframe src

    // set iframe position relative to link
    $("#preview").css({top: position.top+ config.offset.top,
      left: position.left + config.offset.left , position:'absolute'});

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
