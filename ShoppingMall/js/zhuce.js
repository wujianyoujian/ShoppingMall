$(document).ready(function(){
    const jq = jQuery.noConflict();
    const sty = [{
        "width": "20px",
        "background": "#f00"
    },
    {
        "width": "60px",
        "background": "#ff0"
    },
    {
        "width": "100px",
        "background": "#ff6600"
    },
    {
        "width": "178px",
        "background": "green"
    }
    ]
    // 一个文字的打字机效果
    function text_animate() {
        const text_1 = "欢迎您的到来";
        const text_2 = "👥从今天开始我们相知相遇"
        console.log(text_1 + "\n" + text_2);
        var time_text = null;
        var time_text1 = null;
        let i = 0;
        let j = 0;
        time_text = setInterval(function(){
            i++;
            jq(".zhuce_title p").text(text_1.slice(0, i) + "|" );
            if(i == text_1.length){
                clearInterval(time_text);
                jq(".zhuce_title p").text(text_1.slice(0, text_1.length));
                time_text1 = setInterval(function(){
                    j++;
                    jq(".zhuce_title samll").text(text_2.slice(0, j) + "|" );
                    if(j == text_2.length){
                        clearInterval(time_text1);
                        jq(".zhuce_title samll").text(text_2.slice(0, text_2.length));
                    }
                },200);
            }
        },200);
    }
    
    text_animate();
    
	var reg = /^[0-9a-zA-Z+@+.]+$/
	jq("#input_text").focus(function(){
		if(!jq(this).val()){
			jq(this).next(".label-warning").show();
		}
		
	}).blur(function(){
		if(!jq(this).val()){
			jq(this).next(".label-warning").hide();
			jq(this).next(".label-danger").show();
		}
	}).on("propertychange input",function(){
		if(!jq(this).val()){
			jq(this).next(".label-warning").show();
		}
		else{
			jq(this).next(".label-warning").hide();
            if(reg.test(jq(this).val()) == false){
                jq(this).val("");
            }
		}
	});
    
    jq("#input_password").on("propertychange input", function() {
        let this_password = jq(this).val();
        let reg_str = /[a-zA-Z]/;
        let reg_num = /[1-9]/;
        let test1 = reg_str.test(this_password);
        let test2 = reg_num.test(this_password);
        if(this_password){
            jq("#passwordcheck").fadeIn();
            if(reg_str.test(this_password)){
                jq(".label-info").eq(0).text("还需要加上数字");
            }
            else if(reg_num.test(this_password)){
                jq(".label-info").eq(0).text("还需要加上字母");
            }
            
            if( test1 && test2 ){
                jq(".label-info").eq(0).text("符合要求");
            }
            // 根据密码的复杂度来判断
            let chengdu = checkPass(this_password);
            jq(".lenght .dot").eq(0).css({
                "background": sty[chengdu].background
            });
            jq(".lenght .dot").eq(0).animate({
                width: sty[chengdu].width
            });
        }
        else {
            jq("#passwordcheck").fadeOut();
            jq(".label-info").eq(0).text("你的密码由数字,字母组成");
        }
    }).focus(function() {
        jq(".label-info").eq(0).show();
    }).blur(function() {
        jq(".label-info").eq(0).hide();
    });
    
    function checkPass(str){ 
        if(str.length < 5){
            return 0;
        }
        var ls = 0;
        if(str.match(/([a-z])+/)){ 
            ls++; 
        }
        if(str.match(/([0-9])+/)){
            ls++; 
        }
        if(str.match(/([A-Z])+/)){      
            ls++; 
        }
        if(str.match(/[^a-zA-Z0-9]+/)){
            ls++;   
        }
       return ls 
    }
    
    jq("#reinput_password").on("propertychange input", function() { 
       if(!jq(this).val()){
          jq(".label-warning").eq(1).hide();
       }
       if(jq(this).val()){
           if(jq(this).val() === jq("#input_password").val()){
               jq(".label-success").eq(0).show();
               jq(".label-warning").eq(1).hide();
           }
           else{
               jq(".label-warning").eq(1).show().text("密码不一致");
               jq(".label-success").eq(0).hide();
           }
       }
    });
    
	jq("#input_password").next(".glyphicon").mousedown(function(){
        jq(this).removeClass("glyphicon-eye-open").addClass("glyphicon-eye-close");
        jq("#input_password").attr("type", "text");
    });
    jq("#input_password").next(".glyphicon").mouseup(function(){
        jq(this).removeClass("glyphicon-eye-close").addClass("glyphicon-eye-open");
        jq("#input_password").attr("type", "password");
    });
    
    jq("textarea").eq(0).on("propertychange input", function(){
        if(jq(this).val().length > 140) {
            return false;
        }
        
        jq(".textarea i").eq(0).text("还可以输入" + (140 - jq(this).val().length) + "个字")
    });
});
