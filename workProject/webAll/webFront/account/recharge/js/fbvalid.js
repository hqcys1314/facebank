var FBValid = {
    // 键入时直接过滤非法字符。 
    //var set={id:"被验证元素id",size:输入长度 非必填,no:"过滤内容 下详",only:"未开发"};
    //no：截取设置。范围：num为数字；letter为字母；upper为大写字母；chn为中文；sign为符号；space为空格。使用“,”分割
    trimingInputletter: function(set) {
        v = $("#" + set.id).val();
        var _self = this;
        if (set.no) {
            con_arr = set.no.split(",");
            $.each(con_arr, function(i, n) {
                v = v.replace(_self.getReg_fullcheck(n), '');
            });
        }
        else if (set.only) {
            //未实现
        }
        if (set.size && set.size > 0) {
            v = v.substr(0, set.size);
        }
        $("#" + set.id).val(v);
    },
    getReg_fullcheck: function(n) {
        var r;
        switch (n) {
            case "letter":
                r = /[A-Za-z]/g;
                break;
            case "upper":
                r = /[A-Z]/g;
                break;
            case "chn":
                r = /[\u4e00-\u9fa5]/g;
                break;
            case "sign":
                //r = /[`~!@#\$%\^\&\*\(\)\-_\+=|<>\?:\"\{\},\.\\\/;'\[\]]/g;
            	r = /[`~!@#\$%\^\&\*\(\)\-_\+=|<>\?:\"\{\},\.\\\/;'\[\]~！@#￥……&*（）——|{}【】’‘；：”“'。，、？·]/g;
                break;
            case "space":
                //r = /[?!\s]/g;
                r = /\s+/;
                break;
			case "num":
				r = /[0-9]/g;
				break;
        }
        return r;
    },
    
    cleanInput: function(name) {
        $("#" + name).val("");
    },
    
    ///add
    isCloseMsg: function(name) {
        return $("div:visible[name='"+name+"']").length===0;
    },
//     var set={
//             msgbox:"error-msg",//通用错误提示框id 非必填
//             passbox:"div_pass",//通过展示元素 非必填
//             isFocus:true,//出错是否返回焦点 非必填 默认为false
//             callback:function(){alert("cb")}, //成功回调函数 非必填
//             checks:[
//                  {id:"被验证元素id",valid:"验证方法",errmsg:"错误提示，不写则显示默认",fail_callback:function(){失败回调函数 非必填}},
//                     ]
//              }
    valid: function(set) {
        var _self = this;
        var is_access = true;
        var ajax_checks = [];
        $.each(set.checks, function(i, chk) {
            
            if(chk.validtype && chk.validtype=="ajax"){
                ajax_checks.push(chk);
            }
            else{
                var v =  $("#" + chk.id).val();
                msgbox = chk.msgbox ? chk.msgbox : (set.msgbox ? set.msgbox : null);
                passbox = chk.passbox ? chk.passbox : (set.passbox ? set.passbox :null);
                $("#" + msgbox).hide();
                var vparam = chk.vparam;
                valid_func = "_self." + chk.valid + "(v,vparam);";
                try {
                    r = eval(valid_func);
                } catch (e) {}
                if (!r[0]) {
                    if(passbox){
                        $("#" + passbox).hide();
                    }
                    if(msgbox){
                        $("#" + msgbox).html(chk.errmsg ? chk.errmsg : r[1]);
                        $("#" + msgbox).show();
                    }
                    if (set.isFocus) {
                        $("#" + chk.id).focus();
                    }
                    is_access = false;
                    if (chk.fail_callback) {
                        chk.fail_callback();
                    }
                    return false;
                }
            }
        });
            if (is_access && ajax_checks.length==0) {
                if(msgbox){
                    $("#" + msgbox).hide();
                }
                if(passbox){
                    $("#" + passbox).show();
                }
                if(set.callback){
                    set.callback();
                }
            }
            else if(is_access && ajax_checks.length>0){
                var ajax_set=new Object();
                ajax_set=set;
                ajax_set.checks=ajax_checks;
                _self.ajax_valid_invoke(ajax_set);
            }
    },
    ajax_valid_invoke:function(set){
            chk=set.checks[0]; 
        var v =  $("#" + chk.id).val();
                var vparam = chk.vparam;
            valid_func = "this." + chk.valid + "(v,vparam,set);";
                try {
                    r = eval(valid_func);
                } catch (e) {}
    },
    ajax_valid_access:function(set){
         if(set.checks.length>1)   
              set.checks.shift(); 
            var chk=new Object();
            chk=set.checks[0]; 
            
        var v =  $("#" + chk.id).val();
                msgbox = chk.msgbox ? chk.msgbox : (set.msgbox ? set.msgbox : null);
                passbox = chk.passbox ? chk.passbox : (set.passbox ? set.passbox :null);
                $("#" + msgbox).hide();
                var vparam = chk.vparam;
            
            
        if(set.checks.length>1){          
                valid_func = "this." + chk.valid + "(v,vparam，set);";
                try {
                    r = eval(valid_func);
                } catch (e) {}
        }
        else{
            if(msgbox){
                    $("#" + msgbox).hide();
                }
                if(passbox){
                    $("#" + passbox).show();
                }
                if(set.callback){
                    set.callback();
                }
        }
    },
    ajax_valid_fail:function(errmsg,set){
            var chk=set.checks[0];  
                msgbox = chk.msgbox ? chk.msgbox : (set.msgbox ? set.msgbox : null);
                passbox = chk.passbox ? chk.passbox : (set.passbox ? set.passbox :null);
                if(passbox){
                        $("#" + passbox).hide();
                    }
                    if(msgbox){
                        $("#" + msgbox).html(chk.errmsg ? chk.errmsg :errmsg);
                        $("#" + msgbox).show();
                    }
                    if (set.isFocus) {
                        $("#" + chk.id).focus();
                    }
                    if (chk.fail_callback) {
                        chk.fail_callback();
                    }
    },
    isNotEmpty: function(v) {
        return v.length > 0 ? [true] : [false, "内容不能为空"];
    },
    isPhoneNum: function(v) {
        return /^1[3|4|5|7|8][0-9]\d{8}$/.test(v) ? [true] : [false, "手机号码格式不正确，请重新输入"];
    },
    checkSize: function(v,range) {
        min=range[0];
        max=range[1];
        return !((min!==null &&  v.length<min) ||(max!==null &&  v.length>max)) ? [true] : [false, "内容字数超出范围"];
    },
    isNotHave: function(v,cons) {
    	
            con_arr = cons.split(",");
            var is_access=true;
        $.each(con_arr, function(i, n) {
               if(FBValid.getReg_fullcheck(n).test(v) )
                   is_access=false;
            });
        return is_access ? [true] : [false, "内容含有不允许字符"];
    },
    compareValue: function(v,compareId) {
        return v===$("#"+compareId).val() ? [true] : [false, "两次输入的值不一致"];
    },
    checkNotRegPhone: function(v,param,set) {
        $.post("/checkReferee",{'mobileNum':v},function(data, type) {
            if (data.responseText == 1) {
             FBValid.ajax_valid_fail("手机号码已经注册",set);
            }else {
                //递归
              FBValid.ajax_valid_access(set);
            }
        });
    },
    //add
    checkHasRegPhone: function(v,param,set) {
        $.post("/checkReferee",{'mobileNum':v},function(data, type) {
            if (data.responseText == 1) {
              FBValid.ajax_valid_access(set);
            }else {
             FBValid.ajax_valid_fail("手机账号用户不存在",set);
            }
        });
    },
    sendValidCode:function(phonenum,param,set){
        $.post("/sendVerifyCodeWithNoForward",{'mobileNum':phonenum},function(data, type) {
         if (data.responseText == 1) {
              FBValid.ajax_valid_access(set);
            }else if(data.responseText == 2){
                FBValid.ajax_valid_fail("手机号码已经注册",set);
             phoneMsg.innerHTML="";
                return false;
            }else if(data.responseText == 0){
                FBValid.ajax_valid_fail("手机号码格式不正确，请重新输入",set);
             phoneMsg.innerHTML="";
                return false;
            }else {
                FBValid.ajax_valid_fail("验证短信发送失败，请稍后再试",set);
                return false;
            }
        })
    },
    sendMobileForPassword:function(phonenum,param,set){
        $.post("/password/sendMobileForUpdatePassword",{'phone':phonenum},function(data, type) {
        	if(data!=''){
        		FBValid.ajax_valid_fail("验证短信发送失败，请稍后再试",set);
        		return false;
        	}else{
       	 		FBValid.ajax_valid_access(set);
       	 	}
        })
    },
	isIdCard: function(idCard){
        var maxOld = 100;
        var now = (new Date()).getFullYear();
        //判断18位身份证
		if(idCard.length==18){
			var year = parseInt(idCard.substring(6,10),10);
            if(maxOld+year<now){
                return false;
            };
            var idCardReg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$/;
            if(!idCardReg.test(idCard)){//基本正则
                return false;
            };
            var wi=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];//权列表
            var ex=[1,0,'x',9,8,7,6,5,4,3,2];//校验码列表
            var su=0;
            for(var i=0,wil=wi.length;i<wil;i++){
                su+=parseInt(idCard.charAt(i),10)*wi[i];
            };
            return idCard.charAt(17).toLowerCase()==ex[su%11];
		}else if(idCard.length==15){//判断15位身份证
			var maxId = 2003-16;//2003年前是15位证，但办证也得最少16岁吧
            var minId = now-maxOld;
            var year = parseInt("19"+idCard.substring(6,8),10);
            if(minId>maxId || year<minId || year>maxId){
                return false;
            };
            var idCardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
            return  idCardReg.test(idCard);
		}else{
			return false;
		}
    },
	luhmCheck: function(bankno){
		var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhm进行比较）
		var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
		var newArr=new Array();
		for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
			newArr.push(first15Num.substr(i,1));
		}
		var arrJiShu=new Array();  //奇数位*2的积 <9
		var arrJiShu2=new Array(); //奇数位*2的积 >9
		 
		var arrOuShu=new Array();  //偶数位数组
		for(var j=0;j<newArr.length;j++){
			if((j+1)%2==1){//奇数位
				if(parseInt(newArr[j])*2<9)
				arrJiShu.push(parseInt(newArr[j])*2);
				else
				arrJiShu2.push(parseInt(newArr[j])*2);
			}
			else //偶数位
			arrOuShu.push(newArr[j]);
		}
		 
		var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
		var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
		for(var h=0;h<arrJiShu2.length;h++){
			jishu_child1.push(parseInt(arrJiShu2[h])%10);
			jishu_child2.push(parseInt(arrJiShu2[h])/10);
		}        
		 
		var sumJiShu=0; //奇数位*2 < 9 的数组之和
		var sumOuShu=0; //偶数位数组之和
		var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
		var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
		var sumTotal=0;
		for(var m=0;m<arrJiShu.length;m++){
			sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
		}
		 
		for(var n=0;n<arrOuShu.length;n++){
			sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
		}
		 
		for(var p=0;p<jishu_child1.length;p++){
			sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
			sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
		}      
		//计算总和
		sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);
		 
		//计算Luhm值
		var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;        
		var luhm= 10-k;
		 
		if(lastNum==luhm){
			return true;
		}else{ 
			return false;
		}        
	}
    
    

}