!function ($) {

  $(function(){

    var $window = $(window)

    // side bar
    $('.sidenav').affix({
      offset: {
        top: function () { return $window.width() <= 980 ? 290 : 210 }
      , bottom: 270
      }
    })
    
    // make code pretty
    window.prettyPrint && prettyPrint()
  })
}(window.jQuery)