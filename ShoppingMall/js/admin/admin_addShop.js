$(document).ready(function() {

  var base = new Base()
  base.init()

  $('.click_down').click(function() {
    let $fa = $(this).find('.fa')
    $fa.toggleClass('fa-caret-down')
    if($fa.attr('class').indexOf('fa-caret-down') != -1) {
      $fa.removeClass('fa-caret-up')
      $('.type_down').slideDown(300)
    } else {
      $fa.addClass('fa-caret-up')
      $('.type_down').slideUp(300)
    }
  })

  $('.fa-plus').click(function() {
    $('.file').trigger('click')
  })
  $('.file').change(function() {
    let img_address = $(this).get(0).value
    $('.showImg').slideDown(300)
    $('.showImg img').attr('src', img_address)
    
  })

  $('.type_submit').on('click', function() {
    let option_value = $('.input').eq(0).val()
    let $option = $(`<option value='${option_value}'>${option_value}</option>`)
    $('#Select').append($option)
  })

  $('.detail_submit').eq(0).on('click', function() {
    let img_address
    let name = $('.input_name input').eq(0).val()
    let content = $('.input_detail input').eq(0).val()
    let price = $('.input_price input').eq(0).val()
    let imgurl = ($(this).get(0).value)?($(this).get(0).value):'http://39.106.176.121/Shopimg/xiaomi_3.jpg'
    let type = $('#Select').eq(0).val()
    let data = {
       shop_name: name,
       price: price,
       imgurl: imgurl,
       content: content,
       type: type
    }
    let url = '/shop/good/Addgood'
    if(!data.shop_name || !data.price || !type) {
      alert('请先填写数据')
      return false
    }
    post(url, data).then((res) => {
      if(res.errno === 0) {
        console.log(res)
      }
    })
  })
})