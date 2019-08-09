(() => {
  // 使用js增加进入时候的动画
  $(".container").eq(0).fadeIn(500).animate({
    top: '50%',
    opacity: 1
  })
  // 使用ajax进行请求数据登录
  //1.先获取输入数据
  
  $('.submit').on('click', function() {
    let username = $('.username input').eq(0).val()
    let password = $('.password input').eq(0).val()
    let data = {
      username,
      password
    }
    // 增加随机数
    let url = '/shop/admin/loginAdmin'
    $.post(url, data).then(function(res) {
      if(res.errno === 0 && res.data) {
        console.log(res.data)
        if(res.data.power > 1) {
          location.href = './admin_index.html'
        }
      }
    })
  })
})()