/**
 * Created by facebank on 2017/2/9.
 */
/**
 * Created by facebank on 2016/12/21.
 */

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