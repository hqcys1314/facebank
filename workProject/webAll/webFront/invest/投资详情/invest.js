var noPermission;
$(function(){
	//如果不登录取登录
	$("#investAmount").focus(function(){		
		if(typeof($(".invest-btn").attr("disabled"))!="undefined"){
			var loanId = $("#loanId").val();//标id
			$("#check-loan-login .modal-body").html("您没有登录!<a href='"+"/loan-authc/"+loanId+"'>马上登录</a>");
			$("#check-loan-login").modal();
		}
	});
	$(".progress-bar").mouseover(function(){
		$(".progress-bar-tooltip").css("display","block");
	});
	$(".progress-bar").mouseout(function(){
		$(".progress-bar-tooltip").css("display","none");
	});
	noPermission = function(){
		app.openL("温馨提示","您是企业借款用户没有投资权限,请您退出当前账户，重新注册个人账户进行投资！");
	};
	//投资前校验
	//$(".invest-btn").click(function(){ 
	$(".btn_detail").click(function(){
		$("#verifyCode").val("");
		$("#error-msg").empty();
		var loanId = $("#loanId").val();//标id
		var userId = $("#userId").val();//用户id
		var borrowerId = $("#borrowerId").val();//借款人id
		var amount = $("#amount").val();//借款金额
		var remaining = $("#remaining").val();//剩余金额
		var investAmount = $("#investAmount").val();//投资金额
		var usercash = $("#usercash").val();//用户余额
		var beginAmount = $("#beginAmount").val();//起投金额
		var increaseAmount = $("#increaseAmount").val();//递增金额
		var termCount = $("#termCount").val();//借款期限
		var termUnit = $("#termUnit").val();//借款期限单位
		var productId = $("#productId").val();//还款方式
		var annualInterestRate = $("#annualInterestRate").val();//年化利率
		var loanType =  $("#loanType").val();   // 1 个人 2 企业
		var firstcharge =  $("#firstcharge").val(); 
		var paypass =  $("#paypass").val();
		var maxAmount =  $("#maxAmount").val();
		var isNovice =  $("#isNovice").val();
		var hisAmount =  $("#hisAmount").val();
		var reg = /^[1-9]\d*$/;
		
		if(userId==null||userId==''){
			var parm = "/login?loanid="+loanId+"&fromUrl=/loan/enterprise-"+loanId;
			$("#check-loan-invest .modal-body").html("请<a href='"+parm+"'>登录</a>后再投资");
			$("#check-loan-invest").modal();
			return false;
		}
		if(firstcharge=='1'){
			$("#check-loan-invest .modal-body").html("您尚未银行卡认证，请<a href='/account/accountBind'>认证</a>后进行投资");
			$("#check-loan-invest").modal();
			return false;
		}
		
		if(paypass=='1'){
			$("#check-loan-invest .modal-body").html("您尚未设置支付密码，请<a href='/account/updatePayPasswordUi?from=recharge'>设置支付密码</a>后进行投资");
			$("#check-loan-invest").modal();
			return false;			
		}
		
		if(isNovice!='1'){
			$("#check-loan-invest .modal-body").html("该项目仅限未投资过的用户购买，请选择其他项目进行投资。");
			$("#check-loan-invest").modal();
			return false;			
		}
		
		if(investAmount != ""){
			if (borrowerId == userId) {
				$("#check-loan-invest .modal-body").html("不能投资自己的借款");
				$("#check-loan-invest").modal();
			} else {
				if(!reg.test(investAmount)){
					$("#check-loan-invest .modal-body").html("请输入正确的金额格式");
					$("#check-loan-invest").modal();
				} else if(investAmount - usercash > 0) {
					var param="/account/rechargeUI?investAmount="+investAmount+"&loanId="+loanId+"&isInvest=1";
					$("#check-loan-invest .modal-body").html("您的账户余额不足，<a href='"+param+"'>请立即充值</a>");
					$("#check-loan-invest").modal();					
				} else if(investAmount - remaining > 0) {
					$("#check-loan-invest .modal-body").html("投资金额不能大于剩余金额");
					$("#check-loan-invest").modal();										
				} else if(investAmount - beginAmount < 0 &&  remaining-beginAmount>=0) {
					$("#check-loan-invest .modal-body").html("投资金额不能小于起投金额");
					$("#check-loan-invest").modal();										
				} else if(remaining-increaseAmount<0&&(investAmount*100)/100!=remaining) {
					$("#check-loan-invest .modal-body").html("剩余金额小于递增金额时，最后一笔投资金额必须等于剩余金额");
					$("#check-loan-invest").modal();										
				} else if((investAmount*1-beginAmount*1) % increaseAmount*1!=0 && (remaining*1-(increaseAmount*1+beginAmount*1)>=0)) {
					//$("#check-loan-invest .modal-body").html("投资金额必须为递增金额整数倍");
					//$("#check-loan-invest").modal();	
					
					/*$("#increaseAmountDiv").slideToggle(200);
	                 setTimeout(function () {
	                     $("#increaseAmountDiv").hide(200);
	                 }, 1000);*/
	                 
					return false; 
				} else if( maxAmount*1 > 0 && investAmount*1> maxAmount*1 ) { 
					$("#check-loan-invest .modal-body").html("不能超过最高投资金额" + maxAmount);
					$("#check-loan-invest").modal();										
				} else {
					$("#loanId").val(loanId);
					$(".amount").html(amount);
					if (termUnit == 1) {
						$(".termCount").html(termCount+"天");
					} else if(termUnit == 2) {
						$(".termCount").html(termCount+"周");
					} else if(termUnit == 3) {
						$(".termCount").html(termCount+"个月");
					}
					if(productId == 1){
						$(".productId").html("按月付息，到期还本");
					} else if(productId == 2){
						$(".productId").html("一次性还本付息");
					} else if(productId == 3){
						$(".productId").html("等额本息");
					}
					$("#imgverCode").attr("src","/jcaptcha/investVerfiyCode?a=" + new Date().getTime());
					$(".remaining").html(remaining);
					$(".annualInterestRate").html(annualInterestRate);
					$(".investAmount").html($("#investAmount").val());
					$("#actualInvestAmount").html($("#investAmount").val());
					//$("#confirm-loan-invest").modal();
					if(loanType==1){
						window.location.href="/loanConfirm/"+loanId+"?investAmount="+investAmount;
					}else{
						window.location.href="/loanCompanyConfirm/"+loanId+"?investAmount="+investAmount;
					}
					
				}
			}
		} else {
			$("#check-loan-invest .modal-body").html("请输入投资金额");
			$("#check-loan-invest").modal();
		}
	});
	

	
	function checkVerifyCode(){
		var flag = false;
		$.ajax({
			type:"post",
			url:"/invest/investVerfiyCode",
			data:{"jcaptcha":$( "#verifyCode" ).val()},
			success: function(data){
				flag = data;
			},
			async:false
		});
		return flag;
	}
});

function refreshCode(){
	app.codeRefresh($("#imgverCode"));
}

//打开服务条款和隐私条款
function openItem(url) {
	window.open("/common/"+url, 'regconfirm', 'height=584,width=718,toolbar=no,menubar=no,scrollbars=no,resizable=false,location=no,status=no');
	return true;
}

//点击这里链接
function successJump() {
	var url = window.location.href;
	url = url.split("#")[0] + "#" + new Date().getTime();
	window.location.href=url;
	window.location.reload(true);
}

