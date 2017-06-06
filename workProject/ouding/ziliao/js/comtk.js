/**
 * Created by facebank on 2016/12/22.
 */
$(".content .ziliao").each(
    function(){
        $(this).click(
            function(){
                var ziliao_id=$(this).attr("id");
                var tk_id=ziliao_id+"_tk";
                $(".zl-mc").animate({
                    marginLeft:"100%"
                },500);
                $("#"+tk_id).animate({
                    marginLeft:"100%"
                },500);

                $("#"+tk_id+" ul li").each(
                    function(){
                        $(this).click(
                            function(){
                                $("#"+tk_id+" ul li").removeClass('on');
                                var item=$(this).addClass('on').find('.item').text();
                                $("#"+ziliao_id).html(item).css("color","#333");
                                $(".zl-mc").animate({
                                    marginLeft:"0"
                                },500);
                                $("#"+tk_id).animate({
                                    marginLeft:"0"
                                },500);
                                backSend(item);

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

            }
        )
    }
)
