$(document).ready(function() {
  var base = new Base()
  base.init()

  select_user()

  let url = '/shop/user/list'
  get(url).then(res => {
    if(res.errno === 0 && res.data) {
      const user_list = res.data
      user_list.forEach((item, index) => {
        let $user_li = user_li(index, item.power, item.username, item.realname)
        $('.user_list').append($user_li)
      })
    } else {
      location.href = './admin_login.html'
    }
  })

  function select_user() {
    $(".user_list").on('mouseenter', '.user', function() {
      $(this).css({
        "background-color": "#eee"
      })
    }).on('mouseleave','.user',function() {
      $(this).css({
        "background-color": "#fff"
      })
    })
  }
  function user_li(id, power, username, name) {
    let power_value 
    switch (power) {
      case 1:
        power_value = '普通用户'
        break;
      case 2:
        power_value = '普通管理员'
      case 3:
        power_value = '超级管理员'
        break;
      default:
        break;
    }
    $user_li = $(`
      <li class="user">
        <span class="user_id">${id}</span>
        <span class="user_data">${power_value}</span>
        <span class="user_name">${username}</span>
        <span class="user_address">${name}</span>
      </li>
    `)
    return $user_li
  }
})