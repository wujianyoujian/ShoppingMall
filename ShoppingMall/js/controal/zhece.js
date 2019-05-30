(() => {
    const jq = jQuery.noConflict();
    function get(url) {
        return jq.get(url)
    }
    
    // 发送 post 请求
    function post(url, data = {}) {
        return jq.ajax({
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
    let url = '/shop/user/register'
    
    jq("#submit").on('click', function() {
        let username = jq("#input_text").val()
        let password = jq("#input_password").val()
        let data = {
            username,
            password
        }
        console.log(data)
        if(data.username !="" && data.password!="") {
            console.log(1)
            post(url, data).then(res => {
                console.log(res)
                if(res.errno == 0) {
                    location.href = '../../login.html'
                }  else {
                    console.log('注册失败')
                }
            })
        }
    })
    
})()