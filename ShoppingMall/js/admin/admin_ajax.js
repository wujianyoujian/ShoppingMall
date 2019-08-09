// var jq = jQuery.noConflict()
function get(url) {
  return $.get(url)
}

// 发送 post 请求
function post(url, data = {}) {
  return $.ajax({
      type: 'post',
      url,
      data: JSON.stringify(data),
      contentType: "application/json",
  })
}
// 获取 url 参数
function getUrlParams() {
  let paramStr = location.href.split('?')[1] || ''
  paramStr = paramStr.split('#')[0]
  const result = {}
  paramStr.split('&').forEach(itemStr => {
      const arr = itemStr.split('=')
      const key = arr[0]
      const val = arr[1]
      result[key] = val
  })
  return result
}