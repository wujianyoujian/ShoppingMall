	/*---定义查找id元素---*/
	function $(id){return document.getElementById(id);}
	
	/*----检测屏幕上方被卷去多少----*/
	function scrollTop(){
			if(window.pageYOffset!=null){
				return {
					left:pageXOffset,
					top:pageYOffset
				}
			}
			else if(document.compatMode == "CSS1Compat"){
				return {
					left:document.scrollLeft,
					top:document.scrollTop
				}
			}
			else{
				return{
					left:document.documentElement.scrollLeft,
					top:document.documentElement.scrollTop
				}
			}
		}

/*------改变窗口大小----*/
		function client() {
	        if(window.innerWidth != null)  // ie9 +  最新浏览器
	        {
	            return {
	                width: window.innerWidth,
	                height: window.innerHeight
	            }
	        }
	        else if(document.compatMode === "CSS1Compat")  // 标准浏览器
	        {
	            return {
	                width: document.documentElement.clientWidth,
	                height: document.documentElement.clientHeight
	            }
	        }
	        return {   // 怪异浏览器
	            width: document.body.clientWidth,
	            height: document.body.clientHeight
	
	        }
	    }
/*-----------匀速运动封装函数-----
		//	obj为运动的对象，last为在x上的目标位置
		function animate( $(obj) ,last){
				clearInterval(obj.time);//在每次调用运动函数之前必须清除一次定时器
				var speed=obj.offsetLeft<last?5:-5;
				
				//当他的offsetLeft值小于目标值时，为+5，大于的时候为-5这样就能够运动回来
				
				obj.time=setInterval(function(){
					var least= last-obj.offsetLeft;   //在定时器中不断判断两者的差值，当小于速度的时候就清除定时器;
					obj.style.left=obj.offsetLeft+speed+"px";//这个放在前面，如果放在后面的话判断结束之后还会执行一次
					if(Math.abs(least)<=5){
						
						clearInterval(obj.time);
						obj.style.left=last+"px";//有误差，直接在最后跳转到目标位置
						console.log(obj.offsetLeft);
					}
					//console.log(speed);
					//console.log(obj.offsetLeft);
				},30);
			}
			
*/



/*-----------------获得css属性的函数--------*/
			function getstyle(obj,attr){
				if(obj.currentStyle){
						return obj.currentStyle[attr];
				}
				else{
					return window.getComputedStyle(obj,null)[attr];
				}
			}
			
			
/*-------------------缓慢运动函数------------*/
			function animate(obj,json,fu){
				clearInterval(obj.time);
				obj.time=setInterval(function(){
					var flag=true;// 用一个判断
					for(var attr in json)
					{
						//console.log(attr);
						var current;
						if(attr=="opacity"){
							current=parseInt(getstyle(obj,attr)*100);//不能使用小数，下面会取整
							console.log("hah"+current)
						}
						else{
							current=parseInt(getstyle(obj,attr));  //当前 对象的属性值
						}
						var setp=(json[attr]-current)/10;
						setp=setp>0?Math.ceil(setp):Math.floor(setp);
						//console.log(setp);
						if(attr=="opacity"){// 判断是否添加了opacity
							//判断浏览器是否支持
							if("opacity" in obj.style){//支持的话
								obj.style[attr]=(current+setp)/100;
								// obj.style.opacity
							}
							else{//不支持的话
								obj.style.filter="alpha(opacity="+current+setp+")";
								// obj.style.filter=alpha(opacity=30)
							}
						}
						else if(attr=="zIndex"){
							obj.style[attr]=json[attr];
						}
						else{
							obj.style[attr]=current+setp+"px";
						}

						if(current!=json[attr]){
							//在循环中判断只要有一个不是flag的值就变为flase
							flag=false;
						}
					}
					if(flag!=false){//当循环完成的时候再判断flag的值
						clearInterval(obj.time);
						if(fu){
							fu();
						}
					}
				},10);
			}
	/*----------             -------------------------*/
	function show(obj) { obj.style.display = "block";}
	function hide(obj) { obj.style.display = "none";}