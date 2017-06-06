/**
 * Created by facebank on 2016/12/22.
 */

$("#bank").click(
     function(){
           $(".zl-mc").animate({ marginLeft:"100%"},500);
           $("#bank_tk").animate({marginLeft:"100%"},500);
     })
$("#bank_tk ul li").each(
    function(){
        $(this).click(
            function(){
                var item=$(this).find('img').attr('alt');
                $("#bank").html(item).css("color","#333");
                $(".zl-mc").animate({
                    marginLeft:"0"
                },500);
                $("#bank_tk").animate({
                    marginLeft:"0"
                },500);

            }
        )
    }
);
$(".common-fanhui").click(
    function(){
        $(".zl-mc").animate({
            marginLeft:"0"
        },500);
        $(".common-tk").animate({
            marginLeft:"0"
        },500);
    }
)

