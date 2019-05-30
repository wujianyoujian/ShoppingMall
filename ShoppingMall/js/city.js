(function(window){
    var jq = jQuery.noConflict();
    
    function City () {
        var cityList = {};
    }
    
    City.prototype = {
        constructor: City,
        // 初始化操作    
        init: function() {
            jq(".location").eq(0).mCustomScrollbar();
            this.getInfo();
            this.setDom();
        },
        // ajax请求
        getInfo: function() {
            var _this = this;
            jq.ajax({
                dataType: "json",
                url: "./api/city.json",
                success: function(res) {
                    if(res.ret && res.data){
                        _this.cityList = res.data.cities;
                        _this.setInfo();
                    }
                },
                error: function(e) {
                    conosle.log(e);
                }
            });
        },
        //对数据进行处理，为两重循环
        setInfo: function () {
            const cities = this.cityList;
            let i = 0;
            for(key in cities) {
                this.createParentNode(key);
                i++;
                for(item in cities[key]) {
                    let city = cities[key][item].name;
                    this.createChildNode(city, i-1);
                }
            }
        },
        // 对节点的创建和生成
        createParentNode: function (data) {
            let $Parent = jq(
                "<div class=\"city\">\n"+
                    "<div class=\"city_title\">"+data+"</div>"+
                "</div>"
            );
            jq(".cityList").eq(0).append($Parent);
        },
        createChildNode: function (data, index) {
            let $Child = jq(
                "<div class=\"list\">\n"+
                    "<div class=\"city_wrapper\">\n"+
                        "<div class=\"city_name\">\n"+data+"</div>\n"+
                    "</div>\n"+
                "</div>"
            );
            jq(".city").eq(index).append($Child);
        },
        // 对页面里一些dom的操作
        setDom: function() {
            jq(".location").eq(0).hide();
            jq(".Lc").hover(function() {
                jq(".location").eq(0).show();
            },function() {
                jq(".location").eq(0).hide();
            });
            // 给每一个城市块都添加点击事件
            jq(".Lc span").eq(0).text(localStorage.getItem("city"));
            
            jq(".cityList").on("click", ".city_name", function() {
                let location_City = jq(this).text();
                localStorage.setItem("city", location_City);
                jq(".Lc span").eq(0).text(localStorage.getItem("city"));
            });
        }
    } 
    
    window.City = City;
    
})(window)