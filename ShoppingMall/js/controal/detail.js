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
    //模板
    function good_detail(id, imgURL, title, content, oldprice, newprice) {
        let $detail_item = jq(`
            <div class="jieshao">
                <div class="picture">
                    <div class="small">
                        <img class="imgshow" src="${imgURL}" alt="" />
                        <div class="mask"></div>
                    </div>
                    <ul>
                        <li><img src="${imgURL}" alt="" /></li>
                    </ul>
                    <div class="big">
                        <img class="imgshow" src="${imgURL}" alt="" />
                    </div>
                </div>
                <div class="msgtxt">
                    <h3 class="title_1">${title}</h3>
                    <p>${content}</p>
                    <div class="jiage">
                        <p>价格:　<span class="old_sj">￥${oldprice}</span></p>
                        <p >促销价:　<span class="new_sj">￥${newprice}</span></p>
                    </div>
                    <p style="font-size: 12px">请选择商品的属性</p>
                    <div class="select"></div>
                    <div class="cart">
                        <button class="add_cart">加入购物车</button>
                        <button class="buy_cart">立即购买</button>
                    </div>
                </div>
            </div>
        `)
        return $detail_item 
    }
    function check(imgURL) {
        let url = '/shop/cart/check'
        let data = {
            imgURL
        }
        return post(url, data).then(res => {
            console.log(res)
            if(res.errno == 0) {
                let data = res.data||{}
                return data.id
            } else {
                return 0
            }
        })
    }
    function add_item(data) {
        let url = '/shop/good/newcart'
        post(url, data).then(res => {
            if(res.errno == 0) {
                console.log('添加商品成功')
                location.href = location.href
            } else {
                alert('请先登录或者注册')
            }
        })
    }
    function add_item_num(id) {
        let url = '/shop/cart/add?id=' + id
        post(url).then(res => {
            if(res.errno == 0) {
                console.log('向购物车增加了当前商品的数量')
                location.href = location.href
            } 
        })
    }
    //存储在服务器中信息
    let url = '/shop/good/detail'
    const urlParams = getUrlParams()
    url = url + '?id=' +urlParams.id
    get(url).then(res => {
        if(res.errno != 0) {
            console.log('获取当前商品信息出错')
            return
        }
        const data = res.data || {}
        console.log(data)
        let $detail_item
        if(data.oldprice == 0) {
            $detail_item = good_detail(data.id, data.imgURL, data.title
                , data.content, data.newprice, data.newprice)
        } else {
           
            $detail_item = good_detail(data.id, data.imgURL, data.content
                , data.title, data.oldprice, data.newprice)
        }
        jq('.content .container').append($detail_item)
        //应该是先请求数据看当前商品在购物车中是否存在，不存在就添加，存在就增加数量
        
        jq('.add_cart').on('click', () => {
            let num = check(data.imgURL)
            num.then(value => {
                if(value == 0) {
                    add_item(data)
                } else {
                    add_item_num(value)
                }
            })
        })
    })
    // 模拟的详情页信息
    function selectGood(typelist) {
        let $select_item
        typelist.forEach((item, index) => {
            $select_item = jq(`
                <div class="item_wrapper">
                    <div class="item_text">${item.type}</div>
                </div>`
            )
            jq('.select').append($select_item)
        })
        jq(".content .container").on('click','.item_wrapper', function() {
            jq(this).css("color", "#ffaa16").siblings().css("color","#222")
        })
    }
    function detailInfo(info_list) {
        let $detail_info
        info_list.forEach((item, index) => {
            $detail_info = jq(`
                <div class="info_item">
                    <div class="info_text">${item.text}</div>
                </div>
            `)
            jq('.detail_info').append($detail_info)
        })
    }
    function detailImg(Imglist) {
        let $detail_img
        Imglist.forEach((item, index) => {
            $detail_img = jq(`
                <img src="${item.imgURL}">
            `)
            jq(".detail_img").append($detail_img)
        })
    }
    if(urlParams.id === '10') {
        setTimeout(()=>{
            let url = 'http://localhost:8000/api/huawei7c.json'
            get(url).then(res => {
                if(res.errno === 0) {
                    const Data = res.data
                    selectGood(Data.selectType)
                    detailInfo(Data['7CDetail'])
                    detailImg(Data['7cImgURL'])
                }
            })
        }, 400)
        jq(".nav_title li").eq(0).find(".title_tag").eq(0).show()
        jq(".nav_title li").on('click', function() {
            let index = jq(this).index()
            jq('.title_tag').eq(index).fadeIn(100)
                .parent().siblings().find(".title_tag").fadeOut(100)
            jq('.nav_connect li').eq(index).fadeIn(100)
                .siblings().fadeOut(100)
        })
    }
})()