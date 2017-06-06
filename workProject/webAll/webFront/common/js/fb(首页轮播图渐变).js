// JavaScript Document
/*banner轮播图*/
$(function(){
    $('#banner ul li').css('width',$(window).width());
    $('#banner').show();
    var sWidth = $("#banner").width(); //获取焦点图的宽度（显示面积）
    var len = $("#banner ul li").length; //获取焦点图个数
    var picTimer;
    $('#banner ul li').each(function(index, element) {
        $('#banner .banner-btn').append('<a href="javascript:;"></a>');
    });
    $('#banner .banner-btn a').first().addClass('btn-now');
    //为小按钮添加鼠标滑入事件，以显示相应的内容
    $("#banner .banner-btn a").click(function() {
        index = $("#banner .banner-btn a").index(this);
        showPics(index);
    }).eq(0).trigger("click");
    //本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
    $("#banner ul").css("width",sWidth * (len));

    //鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
    $("#banner ul").addClass('now'); 
    $('.now').animate({opacity:1},2000);
   
    $("#banner").hover(function() {
        clearInterval(picTimer);
    },function() {
        picTimer = setInterval(function() {
            showPics(index);
            index++;	
            if(index == len) {index = 0;}
        },4000); //此4000代表自动播放的间隔，单位：毫秒
    }).trigger("mouseleave");
    //显示图片函数，根据接收的index值显示相应的内容
    function showPics(index) { //普通切换
        var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
        $("#banner ul").stop(true,false).animate(
                 {'opacity':'0.5'},500,function(){
		      $("#banner ul").css('opacity','1');
		      $("#banner ul").css('left',nowLeft)})

          //通过animate()调整ul元素滚动到计算出的position
        $("#banner .banner-btn a").removeClass('btn-now');
        $("#banner .banner-btn a").eq(index).addClass('btn-now');
        $('.banner-fuD').css('right',($(window).width()-1110)/2);

    }
   //浮动框状态切换
    $("#zhuce-title").hover(function(){
        $("#banner-fuD-zhuce").hide();
        $("#banner-fuD-2weima").show();
    },function(){
        $("#banner-fuD-zhuce").show();
        $("#banner-fuD-2weima").hide();

    });
    $("#weima-title").hover(function(){
        $("#banner-fuD-zhuce").hide();
        $("#banner-fuD-2weima").show();
    },function(){
        $("#banner-fuD-zhuce").show();
        $("#banner-fuD-2weima").hide();

    });
});
/*温馨提示*/
$(function(){
	$("#tips-close").click(
	     function(){
			 $(".warmtips").slideUp("slow");
	     }
	);
});
/*进度条*/
$(function(){
	$('.invest-progress').each(
	  function(){
		var j=0;
		var per=$(this).children().children().html();
		var pernum=parseInt(per);
		for(var i=0;i<=100;i++)
		{
			if(i<90){
				if(i==pernum){
					j=i-i%5;
				   $(this).children().addClass('invest-per-'+j);
				}			
			}else{
				if(i==pernum){
					j=i-i%2;
					$(this).children().addClass('invest-per-'+j);
				}
			}
		}
	});
}
);	
/*合作伙伴图片轮播*/
function move_fast(o) {
    var c=document.getElementById("move");
    var lis=document.getElementById("scroll").getElementsByTagName('li');
    width = lis[0].offsetWidth;//获得每个img容器的宽度
    if(o =='+'){
       c.scrollLeft -= 200;
       if(c.scrollLeft==0){
           document.getElementById("scroll").appendChild(lis[0]);
          c.scrollLeft = 1600;
        };
    }
    else{
        if(c.scrollLeft==0){
            document.getElementById("scroll").appendChild(lis[0]);
            c.scrollLeft = -1600;
        };
        c.scrollLeft += 200;
    }
}
/*理财体验标浮框*/
$(function(){
	$("#bottom-close").click(
	     function(){
			$("#bottom-bid-content").animate({left:'-100%'},'slow').siblings('.bottom-bid').animate({left:'0'},'slow'); 
	     }
	);
	
	$("#bottom-bid").click(
	     function(){
			$("#bottom-bid-content").animate({left:'0'},'slow').siblings('.bottom-bid').animate({left:'-200px'},'slow');
	     }
	);
});
/*右边浮框*/
$(function(){
    $(".right-fud1").click(
        function(){
            location.href="http://cms.facebank.cn/helpIndex.html";
        }
    );
	$(".right-fud2").hover(
        function(){$('.right-f2').show();},
        function(){$('.right-f2').hide();}
		);
	$(".right-fud3").hover(
        function(){$('.right-f3').show();},
        function(){$('.right-f3').hide();}
		);
    $(".right-fud4").click(
        function(){
            location.href="#";
        }
    )
});
//2015-04-10 11:10:12 格式时间转换成时间戳函数(服务器时间)
function get_unix_time(dateStr) {
    var newstr = dateStr.replace(/-/g, '/');
    var date = new Date(newstr);
    var time_str = date.getTime().toString();
    return time_str.substr(0);
}
;
//倒计时
$('.invest-status em').each(function(index, element) {
   var str = $(this).find('div').html();
//   var str = 'Sat Aug 01 14:01:30 CST 2015+2015-06-18 11:54:21';
    $(this).find('div').html('');
    var date1 = get_unix_time(str.split('+')[1]); //当前服务器时间并计算时间戳
//    var date2 = new Date(chinaTime(str.split('+')[0])); //结束时间
    var date2 = get_unix_time(str.split('+')[0]); //结束时间
    var date3 = date2 - date1; //时间差的毫秒数

    //倒计时总秒数量
    var intDif = parseInt(date3 / 1000);
    
    //Tue Jun 16 2015 12:00:00 GMT+0800  //中国标准时间
    timer(intDif, $(this).find('div'));
});
function timer(intDiff, obj) {
    window.setInterval(function() {
        var day = 0, hour = 0, minute = 0, second = 0;//时间默认值
        if (intDiff > 0) {
            day = Math.floor(intDiff / (60 * 60 * 24));
            hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
            minute = Math.floor(intDiff / 60) - (day * 24 * 60)
                - (hour * 60);
            second = Math.floor(intDiff) - (day * 24 * 60 * 60)
                - (hour * 60 * 60) - (minute * 60);
        }
        if (minute <= 9)
            minute = '0' + minute;
        if (second <= 9)
            second = '0' + second;
        obj.html(day + '天' + hour + '时' + minute + '分' + second + '秒');
        if (day == 0) {
            obj.html(hour + '时' + minute + '分' + second + '秒');
            if (hour == 0) {
                obj.html(minute + '分' + second + '秒');
                if (minute == 0) {
                    obj.html(second + '秒');
                }
                ;
            }
            ;
        }
        ;
        intDiff--;
        if (intDiff <= -2) {
            //obj.parent().parent().html('<a class="a2" href="javascript:;">投资</a>');
//            location.reload(true);
        }
    }, 1000);
}
;
//时间格式转换  结束时间转成中国标准时间
function chinaTime(str) {
    var arr = str.split(' ');
    var str1 = arr[0] + ' ' + arr[1] + ' ' + arr[2] + ' ' + arr[5]
        + ' ' + arr[3] + ' ' + 'GMT+0800';
    return str1;
}
;
