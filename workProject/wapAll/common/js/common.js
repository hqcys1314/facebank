/**
 * Created by facebank on 2016/1/14.
 */

$(document).ready(function(){
    function mcLoad(){
        var wapFud=$("#wapFud").outerHeight();
        var wapMcHeight=document.body.scrollHeight;
        /*底部浮动框高度*/
        $("#empty").css("height",wapFud);
        /*蒙层高度*/
        $("#wapMc").css("height",wapMcHeight);
    }
    window.onload=mcLoad();
});
