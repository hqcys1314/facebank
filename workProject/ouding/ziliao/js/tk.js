/**
 * Created by facebank on 2016/12/21.
 */
/**
 * 居住城市弹框
 */
var text1= 0,text2= 0,text3=0;
$("#city").click(
    function(){
        $(".zl-mc").animate({
            marginLeft:"100%"
        },500);
        $(".city-tk").animate({
            marginLeft:"100%"
        },500);

    }
)
$(".city-1 li").each(
    function(){
        $(this).click(
            function(){
                $(".city-choose ul li").removeClass('on');
                text1=$(this).addClass('on').find('.city-name-1').text();
                $(".city-choose").animate({
                    marginLeft:"100%"
                },500);
            }
        )
    }
)
$(".city-2 li").each(
    function(){
        $(this).click(
            function(){
                text2=$(this).addClass('on').find('.city-name-2').text();
                $(".city-choose").animate({
                    marginLeft:"200%"
                },500);
            }
        )
    }
)
$(".city-3 li").each(
    function(){
        $(this).click(
            function(){
                text3=$(this).addClass('on').find('.city-name-3').text();
                $("#city").html(text1+" "+text2+" "+text3).css('color','#333');
                $(".zl-mc").animate({
                    marginLeft:"0"
                },500);
                $(".city-tk").animate({
                    marginLeft:"0"
                },500);
                $(".city-choose").animate({
                    marginLeft:"0"
                },500);
            }
        )
    }
)
$("#ct-fanhui").click(
    function(){
        var isTrue=parseInt($(".city-choose").css("margin-left"));
        var widthP=$(".city-tk").width();
        if(isTrue=="0"){
            $(".zl-mc").animate({
                marginLeft:"0"
            },500);
            $(".city-tk").animate({
                marginLeft:"0"
            },500);
        }
        else if(isTrue>widthP){
            $(".city-choose").animate({
                marginLeft:"100%"
            },500);
        }else{
            $(".city-choose").animate({
                marginLeft:"0"
            },500);
        }

    }
)
/**
 * 车牌号弹框
 */
var chepai=0;
$("#chepai").click(
    function(){
        $(".zl-mc").animate({
            marginLeft:"100%"
        },500);
        $(".chepai-tk").animate({
            marginLeft:"100%"
        },500);

    }
)
$(".chepai-choose li").each(
    function(){
        $(this).click(
            function(){
                $(".chepai-choose li").removeClass('on');
                chepai=$(this).addClass('on').find('.chepai-name').text();
                $("#chepai").find('font').html(chepai);
                $(".zl-mc").animate({
                    marginLeft:"0"
                },500);
                $(".chepai-tk").animate({
                    marginLeft:"0"
                },500);

            }
        )
    }
)
$("#cp-fanhui").click(
    function(){
        $(".zl-mc").animate({
            marginLeft:"0"
        },500);
        $(".chepai-tk").animate({
            marginLeft:"0"
        },500);
    }
)