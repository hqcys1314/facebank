/**
 * Created by facebank on 2016/12/22.
 */
    //文本逐字输出
(function ( $ ) {

    $.fn.lbyl = function( options ) {

        var s = $.extend({
            content: '',
            speed: 10,
            type: 'fade',
            fadeSpeed: 500,
            finished: function(){}
        }, options );

        var elem = $(this),
            letterArray = [],
            lbylContent = s.content,
            count = $(this).length;

        elem.empty();
        elem.attr('data-time', lbylContent.length * s.speed)

        for (var i = 0; i < lbylContent.length; i++) {
            letterArray.push(lbylContent[i]);
        }

        $.each(letterArray, function(index, value) {
            elem.append('<span style="display: none;">' + value + '</span>');

            setTimeout(function(){
                if (s.type == 'show') {
                    elem.find('span:eq(' + index + ')').show();
                } else if (s.type == 'fade') {
                    elem.find('span:eq(' + index + ')').fadeIn(s.fadeSpeed);
                }
            }, index * s.speed);

        });

        setTimeout(function(){
            s.finished();
        }, lbylContent.length * s.speed);

    };

}( jQuery ));

jQuery(document).ready(function($){

    $(".tip").lbyl({
        content: " 亲，请填写真实信息，否则无法通过，每天最低利率名额有限，先到先得，本次大约占用您10分钟时间。",
        speed: 100,
        type: 'show',
        finished: function(){

        } // Finished Callback
    });

});