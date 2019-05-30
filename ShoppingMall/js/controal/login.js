(function(){
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
    // 再进入页面的时候进行判断，如果本地存在账号就直接登录
    function tologin() {
        let url = '/shop/user/check'
        get(url).then(res => {
            if(res.errno == 0) {
                location.href = '../../gouwuche.html'
            } else {
                console.log('请登录')
            }
        })
    }
    tologin()
    
    // 获取页面中账号和密码的数据
    jq('#tijiao').on('click', ()=> {
        let url = '/shop/user/login'
        let username = jq('#user_text input').eq(0).val()
        let password = jq('#user_password input').eq(0).val()
        let data = {
            username,
            password
        }
        post(url, data).then(res=> {
            if(res.errno == 0) {
                location.href = '../../gouwuche.html'

            } else {
                console.log('登录失败')
            }
        })
    })
})()