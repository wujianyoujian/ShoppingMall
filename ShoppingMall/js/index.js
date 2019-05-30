window.onload=function(){
	//获取数据
/*************************/

    jQuery.noConflict();
	var Top=$("Top");
	var top_close=Top.children[2];
	// console.log(top_close.className);
	top_close.onclick=function(){
		Top.style.display="none";
	}
	setTimeout(function(){
		Top.style.display="none";
	},1000);
	
	var Time=$("Time");
	var Times=Time.children;
	var endtime=new Date("2019/11/11 24:00:00");
	//获得截止时间
	setInterval(play,1000);
	function play(){
		var nowtime=new Date();
		var second=parseInt((endtime.getTime()-nowtime.getTime())/1000);
		//console.log(second);
		var d=parseInt((second/3600)/24);
		var h=parseInt((second/3600)%24);
		var m=parseInt((second/60)%60);
		var s=second%60;
		d<10?d="0"+d:d;
 		h<10?h="0"+h:h;
 		m<10?m="0"+m:m;
 		s<10?s="0"+s:s;
 		Times[0].innerHTML=d;
 		Times[1].innerHTML=h;
 		Times[2].innerHTML=m;
 		Times[3].innerHTML=s;
 		
 		var time=$("time");
 		time.children[0].innerHTML="还剩下 "+d+"天"+h+"小时"+m+"分钟"+s+"秒";
	}
	var send=$("send");
	var sj=$("sj");
	var shouji=$("shouji");
	var com=$("com");
	var diannao=$("diannao");
	var kuai_j=$("kuai_j");
	// 当滚动条拉动的时候出现效果
	window.onscroll=function(){
		var scroll_top=document.documentElement.scrollTop;
		scroll_top>0?show(send):hide(send);
		scroll_top>100?show(kuai_j):hide(kuai_j);
//		console.log(scroll_top);
		leader=scroll_top;
		if(scroll_top>(sj.offsetTop)&&scroll_top<(com.offsetTop)){
			shouji.className="act";
		}
		else{
			shouji.className="";
		}
		if(scroll_top>com.offsetTop){
			diannao.className="act";
		}
		else{
			diannao.className="";
		}
	}
	//返回顶部效果
	var leader=0;
	var time_1=null;
	send.onclick=function(){
		var last=0;
		time_1=setInterval(function(){
			leader=leader+(last-leader)/10;
			window.scrollTo(0,leader);
			if(leader==last){
				clearInterval(time_1);
			}
		},30);
	}

	//楼层效果
	var project=document.getElementById("contect").children;
	var nav_list=document.getElementById("nav_list").children;
	var last_1=0;
	var time_2=null;
	
	
	
	for(var i=0;i<project.length;i++){
		nav_list[i].index=i;
		nav_list[i].onclick=function(){
			clearInterval(time_2);
			last_1=project[this.index].offsetTop+1;
			time_2=setInterval(play,30);
			function play(){
				var step=(last_1-leader)/10;
				//是从用户当前屏幕的位置到达所相应的位置，不能弄错起点的位置
				step=step>0?Math.ceil(step):Math.floor(step);
				leader=leader+step;
				window.scrollTo(0,leader);
				if(leader==last_1){
					clearInterval(time_2);
				}
			}
		}
	}
	

//	shouji.onclick=function(){
//		window.scrollTo(0,sj.offsetTop);
//	}
//	diannao.onclick=function(){
//		window.scrollTo(0,com.offsetTop);
//	}
	
	//对楼层效果的优化
	
	/* for(var i=0;i<nav_list.length;i++)
	{
		var time=null;
		nav_list[i].onmouseenter=tab(i);
		nav_list[i].onmouseout=function(){
			clearInterval(time);
		}
		function tab(i){
			return function(){
				clearInterval(time);
				time=setInterval(function(){
					for(var j=0;j<nav_list.length;j++)
					{
						nav_list[j].className="";
					}
					nav_list[i].className="act";
				},300);	
			}		
		}
	} */
			
// 	var SHOP=$("SHOP");
// 	SHOP.onmouseover=function(){
// 		shop.style.display="block";
// 	}
// 	SHOP.onmouseout=function(){
// //		setTimeout(function(){
// //			shop.style.display="none";
// //		},2000)
// 		shop.style.display="none";
// 	}
	var lists=document.getElementsByClassName("list_s");	
	for(var i=0;i<lists.length;i++)
	{
		lists[i].onmouseover=function(){
			this.className="list_active col-sm-3 col-xs-12 list_s";	
		}
		lists[i].onmouseout=function(){
			this.className="col-sm-3 col-xs-12 list_s";	
		}
		
	}
	//手机栏的是927,电脑栏的是1444
    var city = new City();
	city.init();
	
	

}