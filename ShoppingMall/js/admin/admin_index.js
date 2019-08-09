$(document).ready(function() {
  
  var b = new Base()
  b.init()

  $('.Info_base').fadeIn(1000)
  //下面的number就模拟成从后台传来的数据
  let numbers = [34, 5, 180, 220, 69, 112]
  $('.number').text(0)
  $(".info_wrapper").each(function(index, value) {
    let $text = $(this).find('span')
    let number = parseInt($(this).find('span').text())
    let time = null
    let that = this
    time = setInterval(() => {
      number++
      $(that).find('span').text(number)
      if(number == numbers[index]) {
        clearInterval(time)
      }
    }, 10)
  })
})