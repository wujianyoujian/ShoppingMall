(function() {
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
    function good_search(id, imgURL, title, content, newprice) {
        let $search_item = jq(`
            <div class="col-xs-12 item">
                <a href="../detail.html?id=${id}" target="_blank">
                    <img src="${imgURL}" class="img-responsive" alt="">
                </a>
                <div class="info">
                    <div class="info_content">${title} ${content}</div>
                    <div class="price">${newprice}</div>
                    <button>点击查看详情</button>
                </div>
            </div>
        `)
        return $search_item
    }
    let url = '/shop/good/list'
    const urlParams = getUrlParams()
    let keyword = decodeURIComponent(urlParams.keyword)
    jq('.breadcrumb li').eq(2).text(keyword)
    if(urlParams.keyword) {
        url = url + '?keyword=' + keyword
    }
    get(url).then(res => {
        if(res.errno != 0) {
            console.log('获取当前商品信息出错')
            return
        }
        const data = res.data || []
        console.log(data)
        data.forEach((item, index) => {
            let $search_item = good_search(item.id, item.imgURL, item.title, item.content, item.newprice)
            jq('.content .row').eq(0).append($search_item)
        })
    })
})()