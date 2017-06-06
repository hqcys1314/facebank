  $(function(){
	var homeTownProvince= $("#homeTownProvince").val();
	var homeTownCity = $("#homeTownCity").val();
	var homeTownCounty = $("#homeTownCounty").val();
	var native=getstr(homeTownProvince,province)+"省"+getstr(homeTownCity,city)+"市"+getstr(homeTownCounty,county);
	$("#native").html(native);
	var residenceProvince = $("#residenceCity").val();
	var residenceCity = $("#residenceCity").val();
	var residenceCounty = $("#residenceCounty").val();
	var zhuCity= getstr(residenceCity,city)+"省"+getstr(residenceCity,city)+"市"+getstr(residenceCounty,county);
	$("#zhuCity").html(zhuCity);

  	if($("#credit-information").height() > 240){
	  $("#credit-information").addClass("info-tab-height");
  	  $("#credit-information").addClass("pre-scrollable");
  	} else {
  	  $("#credit-information").addClass("info-tab-height");
  	}
	
//	var userId = $("#userId").val();
//	if(userId != "" && userId != null){
//		//获取账户余额
//		$.getJSON(app.base+"/chinapnr/start-queryMoney",{'userId':userId},function (data){
//			 if(data.AvlBal == null ){
//				$("#usercash").val("0.00");
//				$("#cash").html("0.00");
//				return;
//			 }
//			 //可用余额data.AvlBal，账户余额data.AcctBal，冻结余额data.FrzBal
//			 $("#usercash").val(data.AvlBal);
//			 $("#cash").html(data.AvlBal);
//		});
//	}

  });

  function saveLoanComment(){
	var loanId = $("#loanId").val();
	var str=$.trim($('#my-comment').val());
	if(str.length==0){
	  $("#msg-comment").html("请输入您的留言内容!");
	  return ;
	} else if(str.length>100){
	  $("#msg-comment").html("留言内容不能超过100字!");
	  return ;				
	} else {
		$.ajax({
		  type:"POST",
		  url:app.base+"/invest/saveLoanComment",
		  data:"content="+str+"&loanId="+loanId,
		  success: function(data) {
			  if(data.saveComment){
				$("#comment-dialog").modal();
			    $('#my-comment').val('');
			  } else {
				alert("提交留言失败");
			  }
		  }
	   });
    }
  }