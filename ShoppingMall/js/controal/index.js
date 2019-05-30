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
    // 手机模板
    function good_mobile(id,imgURL,title, content, newprice) {
        let $mobile_item = jq(`
            <div class="col-sm-3 col-xs-6 list_s">
                <a href="../detail.html?id=${id}" class="imgs text-center" target="_blank">
                    <img src="${imgURL}" class="img-responsive" alt="" />
                    <p class="list_text1">${title}</p>
                    <p class="list_text2">${content}</p>
                    <p class="list_text3">¥${newprice}</p>
                </a>
            </div>
        `)
        return $mobile_item
    }
    // 电脑模板
    function good_computer(id, imgURL, title, oldprice, newprice) {
        let $computer_item = jq(`
            <div class="col-sm-3 col-xs-6 list_s">
                <a href="../detail.html?id=${id}" class="imgs text-center" target="_blank">
                    <img src="${imgURL}" class="img-responsive" alt="" />
                    <p class="list_text1">${title}</p>
                    <p class="list_text2">${oldprice}</p>
                    <p class="list_text3">${newprice}</p>
                </a>
            </div>
        `)
        return $computer_item
    }
    let url = '/shop/good/list'
    const urlParams = getUrlParams()
    get(url).then(res=> {
        if(res.errno !== 0) {
            console.log('初始页面载入数据错误')
            return
        }
        const data = res.data||[]
        //循环生成
        data.forEach((item,index) => {
            if(item.type == 'mobile') {
                let num = Math.floor((index+1)/4)
                let $mobile_item = good_mobile(item.id, item.imgURL, item.title, item.content, item.newprice)
                jq(".sj_list .row").eq(num).append($mobile_item)
            } else if(item.type == 'computer') {
                if(!item.title) {
                    let $computer_item = good_computer(item.id, item.imgURL, item.content, item.oldprice, item.newprice)
                    jq(".computer_list .row").eq(0).append($computer_item)
                } else {
                    let $computer_item = good_computer(item.id, item.imgURL, item.title, item.content, item.newprice)                    
                    jq(".computer_list .row").eq(1).append($computer_item)
                }
            }
        })
    })
    // 主页的搜索功能,跳转到搜索页
    jq(".input-group-btn .btn").eq(0).on('click',()=> {
        if(jq('.form-control').eq(0).val()) {
            window.open('../search.html?keyword='+ jq('.form-control').eq(0).val())
        }
    })
    //购物车的数量
    function cart_num() {
        
    }
})()