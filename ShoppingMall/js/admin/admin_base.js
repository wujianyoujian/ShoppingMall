((window) => {
  function Base () {

  }
  Base.prototype = {
    constructor: Base,
    init: function() {
      mouseToggle()
      this.showMask()
    },
    showMask: function() {
      let time = null
      $('.avatar').mouseenter(function() {
        clearTimeout(time)
        time = setTimeout(() => {
          $('.mask').eq(0).slideDown(300)
        },300)
      }).mouseleave(function() {
        clearTimeout(time)
        time = setTimeout(() => {
          $('.mask').eq(0).slideUp(300)
        },300)
      })
    }
  }
  function mouseToggle() {
    $(".first_title").click(function() {
  
      $(this).parent().find(".second_ul").toggle(300)
    })
  
    var time = null
    $(".first_li").on('mouseenter', '.first_title', function() {
      clearTimeout(time)
      let that = this
      time = setTimeout(function() {
        $(that).css({
          'background-color': 'rgba(255,255,255,0.1)'
        })
      },60)
    })
    $(".first_li").on('mouseleave', '.first_title', function() {
      clearTimeout(time)
      $(this).css({
        'background-color': 'rgb(50, 64, 87)'
      })
    })
  }
  window.Base = Base
})(window)