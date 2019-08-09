$(document).ready(function() {
  var base = new Base()
  base.init()
  select_shop()
  var ShopList
  $('.shop_list').on('click', '.modify', function() {
    $('.Modify').show()
    $('.Mask').show()
    $('.right').eq(0).css({
      'overflow': 'hidden'
    })
    // 拿到是id的值
    let ID = parseInt($(this).eq(0).attr('v-data'))
    ShopList.forEach((item, index) => {
      if(item.id === ID) {
        let name = item.title?item.title:item.content
        console.log(name + item.newprice + item.imgURL + item.type)
        $('.Name').eq(0).val(name)
        $('.Price').eq(0).val(item.newprice)
        $('.ImgUrl').eq(0).val(item.imgURL)
        $('.Select').eq(0).val(item.type)
        $('.Info').eq(0).val(item.content)
      }
    })
    
    $('.Modify').on('click', '.submit',  function() {
      let shop_name = $('.Name').eq(0).val()
      let price = $('.Price').eq(0).val()
      let imgurl = $('.ImgUrl').eq(0).val()
      let type = $('.Select').eq(0).val()
      let content = $('.Info').eq(0).val()
      let data = {
        shop_name,
        price,
        imgurl,
        type,
        content,
        ID,
      }
      let url = '/shop/good/modify'
      post(url, data).then(res => {
        if(res.errno === 0) {
          location.href = location.href
        }
      })
    })

  })
  $('.Modify').on('click', '.Esc', function() {
    $('.Modify').hide()
    $('.Mask').hide()
    $('.right').eq(0).css({
      'overflow': 'auto'
    })
  })
  $('.Mask').on('click', function() {
    $('.Modify').hide()
    $(this).hide()
    $('.right').eq(0).css({
      'overflow': 'auto'
    })
  })

  let url = '/shop/good/list'
  get(url).then(res => {
    if(res.errno === 0 && res.data) {
      let Data = res.data
      ShopList = Data
      Data = Data.reverse()
      Data.forEach((item, index) => {
        let $shop_li = shop_li(index, item)
        $('.shop_list').append($shop_li)
      })
    }
  })

  function select_shop() {

    // $('.shop_list').on('mouseenter', '.shop', function() {
    //   $(this).css({
    //     "background": "#dfe6ec"
    //   })
    // }).on('mouseleave', '.shop', function() {
    //   $(this).css({
    //     "background": "#fff"
    //   })
    // })
    $('.shop_list').on('click', '.shop .fa', function() {
      $(this).toggleClass('fa-angle-down')
      // if($(this).class)
      if($(this).attr('class').indexOf('fa-angle-down') != -1) {
        $(this).parent().find('.info_deital').slideDown(300)
      } else {
        $(this).parent().find('.info_deital').slideUp(300)
      }
    })
  }
  function shop_li (index, item) {
    let name_value = item.title
    if(!item.title) {
      name_value = item.content
    }
    $shop_li = $(`
      <li class="shop">
        <span class="fa fa-angle-right"></span>
        <span class="shop_id">${index}</span>
        <span class="shop_name">${name_value}</span>
        <span class="shop_type">${item.type}</span>
        <span class="shop_price">${item.newprice}</span>
        <button class="modify" v-data='${item.id}'>编辑</button>
        <button class="del">删除</button>
        <div class="info_deital">
          <div class="shop_info">
            <div class="info">
              <span class="info_name">商品名称 : </span>
              <span class="info_value">${name_value}</span>
            </div>
            <div class="info">
              <span class="info_name">商品价格 : </span>
              <span class="info_value">${item.oldprice?item.oldprice:item.newprice}</span>
            </div>
            <div class="info">
              <span class="info_name">促销价格 : </span>
              <span class="info_value">${item.newprice}</span>
            </div>
            <div class="info">
              <span class="info_name">优惠活动 : </span>
              <span class="info_value">${item.content}</span>
            </div>
            <div class="info">
              <span class="info_name">分类 : </span>
              <span class="info_value">${item.type}</span>
            </div>
            <div class="info">
              <a href="./detail.html?id=${item.id}" target='_blank'>点击查看详情页</a>
            </div>
            <div class="shop_img">
              <img src='${item.imgURL}' alt="商品图片">
            </div>
          </div>
        </div>
      </li>
    `)
    return $shop_li
  }
})