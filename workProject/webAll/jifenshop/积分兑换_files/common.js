var is_hover='';

/**
 * Created by facebank on 2015/11/18.
 */
/*---------------转换为万元-----------------------------------*/
$(document).ready(function(){
    //“万元”单位
	$('.numWan').each(
	     function() {
		var quZhi = parseInt($(this).html())
        if( quZhi >= 100000 ){
			$(this).html(quZhi/10000)
			$(this).next().html('万元');
		}else{
			$(this).next().html('元');
		}
		;
        });	
/*--------------菜单栏被选中------------------------------*/
     
	   
	   var _pathname = window.location.pathname;
	   if(_pathname.indexOf("index")>0){
		   $("a[data-event=navIndex]").addClass("navOn");
	   }else if(_pathname.indexOf("invest")>0){
		   $("a[data-event=navInvest]").addClass("navOn");
	   }else if(_pathname.indexOf("debt")>0){
		   $("a[data-event=navTransfer]").addClass("navOn");
	   }else if(_pathname.indexOf("account")>0){
		   $("a[data-event=navAccount]").addClass("navOn");
	   }

});




/*--------------蒙层+通用错误提示框------------------------------*/
var maskHeight=document.body.scrollHeight;
$(".mask").height(maskHeight);
$(".maskBox").height(maskHeight);
$(".maskBoxCenter").height(maskHeight);
$(".confirm").click(
    function(){
        $(".mask").hide();
        $(".maskBox").hide();
    }
);
$(".maskContent .span1").click(
    function(){
        $(".mask").hide();
        $(".maskBox").hide();
    }
);



$(function() {
/*--------------浏览器版本提示------------------------------*/
    checkBrowser();
    $("#close_id").click(function() {
        $(".tanch").hide();
    });

})
function checkBrowser() {
    var browser = navigator.appName;
    var b_version = navigator.appVersion;
    var version = b_version.split(";");
    if(version[1]){
        var trim_Version = version[1].replace(/[ ]/g, "");
        if (browser == "Microsoft Internet Explorer") {
            if (trim_Version == "MSIE6.0" || trim_Version == "MSIE7.0") {
                $(".tanch").show();
            }
        }
    }
}

/*--------------翻页------------------------------*/
+function($, app) { "use strict";
//翻页
	$.fn.extend({
	　　appPagination:function(){
		var elem = this;
		elem.find('.pagination [data-page-number]').each(function() {
			$(this).click(function(){
				 var pageNumber = $(this).data('pageNumber')
	      		 elem.find('[name="currentPage"]').val(pageNumber);
				 elem.submit();
				 return false;
			});
		 });
	   }
	}); 	
}(window.jQuery, window.app);
