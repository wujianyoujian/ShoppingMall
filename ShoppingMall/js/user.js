$(document).ready(function(){
    const jq = jQuery.noConflict();
    var reg2=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    var t1;
    var indexof = 0;
    
    function checkout (value){
        let reg2 = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        let t1 = reg2.test(value);
        if(t1 == false){
            jq(".tishi").show();
        }
        else{
            jq(".tishi").hide();
        }
    }
    
    jq(".tishi").hide();
    jq("input").eq(0).on("propertychange input", function(){
        var neirong = jq("input")[0].value;
        let youxiang = ['@qq.com','@163.com','@gamil.com'];
        t1 = reg2.test(this.value);
        if(this.value !== ""){
            jq(".tishis").show();
            if(t1 == false){
                jq(".tishi").show();
            }
            else{
                jq(".tishi").hide();
            }
            
            var _this = this;  
            var flag = ""; 
            if(neirong.indexOf('@') > 0){
                flag = neirong.substring(0,neirong.indexOf('@'));
            }
            if(!flag){
                jq(".tishis li").each(function(index, item){
                    this.innerHTML = neirong + youxiang[index];
                }); 
            }
            else{
                jq(".tishis li").each(function(index, item){
                    if(this.innerHTML.indexOf(_this.value)>=0){
                        this.style.display = "block";
                    }
                    else{
                        this.style.display = "none";
                    }
                });
            }
            
        }
        if(!neirong){
            jq(".tishi").hide();
            jq(".tishis").hide();
        }
        
        
    }).focus(function(){
        jq("input").eq(0).keydown(function(event) {
            if(this.value){
                if(event.which == 40){
                    jq(".tishis li").each(function(index, item){
                        this.style.backgroundColor = "#e9e9e9";
                    });
                    indexof++;
                    if(indexof > jq(".tishis li").length-1){
                        indexof = 0;
                    }   
                    jq(".tishis li").eq(indexof - 1).css("backgroundColor","#ccc");
                }
                else if(event.which == 38){
                    jq(".tishis li").each(function(index, item){
                        this.style.backgroundColor = "#e9e9e9";
                    });
                    indexof--;
                    if(indexof < 0 ){
                        indexof = jq(".tishis li").length - 1;
                    }   
                    jq(".tishis li").eq(indexof - 1).css("backgroundColor","#ccc");
                }
                // else if(event.which ==
                else if(event.which == 13) {
                    jq("input").eq(0).val(jq(".tishis li").eq(indexof-1).text());
                    checkout(jq(".tishis li").eq(indexof-1).text());
                    jq(".tishis").hide();
                }
            }
            else{
                jq(".tishis li").each(function(index, item){
                    this.style.backgroundColor = "#e9e9e9";
                });
                indexof = 0;
            }
        });
    })
    
    jq(".tishis li").on("click",function() {
        if(t1 == false){
            jq(".tishi").show();
        }
        else{
            jq(".tishi").hide();
        }
        jq("input")[0].value = this.innerHTML;
        checkout(this.innerHTML);
        jq(".tishis").hide();
    }).mouseenter(function(){
        jq(".tishis li").each(function(index, item){
            this.style.backgroundColor = "#e9e9e9";
        });
        this.style.backgroundColor = "#ddd";
    });
    
    jq("#user_password span").mousedown(function() {
        jq(this).removeClass("fa-eye").addClass("fa-eye-slash");
        jq("input").eq(1).attr("type", "text");
    });
    jq("#user_password span").mouseup(function() {
        jq(this).removeClass("fa-eye-slash").addClass("fa-eye");
        jq("input").eq(1).attr("type", "password");
    });
    
    // jq("#tijiao").click(function(e) {
    //     let username = jq("input").get(0).value;
    //     let password = jq("input").get(1).value;
    //     if(username == "" && password == ""){
    //         alert("请输入你的账号和密码");
    //         return false;
    //     }
    //     if(username == ""){
    //         alert("请输入你的账号");
    //         return false;
    //     }
    //     if(password == ""){
    //         alert("请输入你的密码");
    //         return false;
    //     }
    // });
})
