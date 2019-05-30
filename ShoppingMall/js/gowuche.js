window.onload=function(){

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
    function cart_list(id,imgURL, title, content, oldprice, newprice, num) {
		let totleprice = num * newprice 
        let $cart_item = jq(`
            <tr class="item" data-id="${id}">
                <td class="td_one"><input type="checkbox" class="check"/></td>
                <td><img src="${imgURL}"/></td>
                <td class="text">${title}
                    <span>${content}</span>
                </td>
                <td style="color:#f00;padding-left:30px;">
                    <p style="text-decoration: line-through;color:#ccc">￥${oldprice}</p>	
                    ￥<span class="danjia">${newprice}</span>
                </td>
                <td>
                    <button class="pull-left btn_jian">-</button>
                    <input type="text" readonly unselectable="on" value="${num}" class="pull-left shuliang"/>
                    <button class="pull-left btn_jia">+</button>
                </td>
                <td style="color:#f00;padding:10px 0 0 30px;">
                    ￥<span class="jiage">${totleprice}</span>
                </td>
                <td>
                    <button class="Close" >&times;</button>
                </td>
            </tr>
        `)
        return $cart_item
	}
	function againcheck() {
		let url = '/shop/user/check'
		get(url).then(res => {
			if(res.errno == 0) {
				let data = res.data ||{}
				jq(".mail").eq(0).html(`<span>用户绑定的邮箱:</sapn>${data.username}`)
			} else {
				location.href = '../../login.html'
			}
		})
	}
	againcheck()
    //先判断是否登录，登录就再请求购物车数据，没有登录就返回登录页面进行登录
    let url = '/shop/cart/list'
    let urlParams = getUrlParams()
    jq('.username').eq(0).html(`<span>用户名:</span> default`)
    get(url).then(res => {
        if(res.errno == 0) {
            let data = res.data||[]
            console.log(data)
            data.forEach((item, index) => {
                let $cart_item = cart_list(item.id,item.imgURL, item.title, item.content, item.newprice, item.newprice, item.num)
                jq('tbody').eq(0).append($cart_item)
			})
			jq(".badge").eq(0).text(data.length)
        }
	})
	
	var check=document.getElementsByClassName("check");
	var btn_jia=document.getElementsByClassName("btn_jia");
	var btn_jian=document.getElementsByClassName("btn_jian");
	var shuliang=document.getElementsByClassName("shuliang");
	var jiage=document.getElementsByClassName("jiage");
	var danjia=document.getElementsByClassName("danjia");
	var trs=document.getElementsByTagName("tbody")[0].children;
	var t_jiage=document.getElementById("t_jiage");
	var none=document.getElementById("none");
	var total=document.getElementById("total");
	//先是进入页面的时候初始化数据·
	for(i=0;i<trs.length;i++)
	{
		shuliang[i].value=1;
	}
	
	function selected(){
		var seled=0;
		var price=0;
		var shangping=0
		// 对每行的选中框都进行判断再累加起来
		for(var i=0;i<trs.length;i++)
		{
			if(trs[i].getElementsByTagName("input")[0].checked==true){
				seled+=parseInt(shuliang[i].value);
				price+=parseInt(jiage[i].innerHTML);
			}
			shangping++;
		}
		if(shangping==0){
			total.style.display="none";
		}
		else if(shangping==1){
			total.style.marginBottom=102+"px";
		}
		t_jiage.innerHTML=price;
		select.innerHTML=seled;
		if(seled>0) {
			jq(".submit").eq(0).css({
				"background": "#23a86f",
				"color": "#fff"
			})
		} else {
			jq(".submit").eq(0).css({
				"background": "#666",
				"color": "#ccc"
			})
		}
	}

	
	for(var i=0;i<check.length;i++)
	{
		check[i].onclick=function(){
		//每次选中一个就调用函数一次
			if(this.id=='allcheck'){
				for(var k=0;k<check.length;k++)
				{
					check[k].checked=this.checked;
					//直接与全选框的选中状态相同
				}
			}
			selected();
		}
	}
	//我要疯了
	jq('tbody').on('click', 'tr .td_one .check', () => {
		if(jq(this).prop('checked')==undefined) {
			jq('.check').eq(0).prop('checked', undefined)
		}
		selected();
	})

	
	jq("tbody").on("click", "tr td .btn_jian", function() {
		
		let index = jq(this).index(".btn_jian")
		let shuliang = parseInt(jq(".shuliang").eq(index).val())
		let danjia = parseInt(jq(".danjia").eq(index).text())
		if(shuliang > 1) {
			jq(".shuliang").eq(index).val(shuliang-1)
			shuliang = parseInt(jq(".shuliang").eq(index).val())
			jq(".jiage").eq(index).text(shuliang*danjia)
			//发送请求
			let url = '/shop/cart/reduce?id=' + jq(".item").eq(index).attr('data-id')
			post(url).then(res => {
				if(res.errno == 0) {
					console.log("reduce")
				}
			})
			selected();
		}
	})
	jq("tbody").on("click", "tr td .btn_jia", function() {
		let index = jq(this).index(".btn_jia")
		let shuliang = parseInt(jq(".shuliang").eq(index).val())
		let danjia = parseInt(jq(".danjia").eq(index).text())
		jq(".shuliang").eq(index).val(shuliang+1)
		shuliang = parseInt(jq(".shuliang").eq(index).val())
		jq(".jiage").eq(index).text(shuliang*danjia)
		//发送请求
		let url = '/shop/cart/add?id=' + jq(".item").eq(index).attr('data-id')
		post(url).then(res => {
			if(res.errno == 0) {
				console.log("add")
			}
		})
		selected();
	})
	jq("tbody").on("click", "tr td .Close", function() {
		let index = jq(this).index(".Close")
		let url = '/shop/cart/del?id=' + jq(".item").eq(index).attr("data-id")
		post(url).then(res => {
			if(res.errno == 0) {
				location.href = location.href
			}
		})
		selected();
	})
}