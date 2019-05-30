
	$(document).ready(function(){
		const jq = jQuery.noConflict();
		jq('.content .container').on('mouseenter', '.picture ul li',()=> {
			var index=jq(this).index();
			jq(".small img").eq(index).addClass("imgshow").siblings().removeClass("imgshow");
			jq(".big img").eq(index).addClass("imgshow").siblings().removeClass("imgshow");
		})
		var x=0,y=0
		jq('.content .container').on('mouseenter', '.picture .small', ()=> {
			jq(".mask").show();
			jq(".big").show();
		})
		jq('.content .container').on('mouseleave', '.picture .small', ()=> {
			jq(".mask").hide();
			jq(".big").hide();
		})
		jq('.content .container').on('mousemove', '.picture .small', ()=> {
			x=event.pageX-jq(".small").offset().left-jq(".mask").width()/2;
			y=event.pageY-jq(".small").offset().top-jq(".mask").height()/2;
			// console.log(x+" "+y);
			//限定边界
			if(x<=0){
				x=0;
			}
			else if(x>=jq(".small").width()-jq(".mask").width()){
				x=jq(".small").width()-jq(".mask").width();
			}
			if(y<=0){
				y=0;
			}
			else if(y>=jq(".small").height()-jq(".mask").height()){
				y=jq(".small").height()-jq(".mask").height();
			}
			
			jq(".mask").css({
				"left":x, 
				"top":y
			});
			jq(".big img.imgshow").css({
				"left":-x*jq(".big").width()/jq(".small").width(),
				"top":-y*jq(".big").height()/jq(".small").height()
			});
		})
	});