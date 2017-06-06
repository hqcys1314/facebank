/**
 * Created by facebank on 2017/2/15.
 */
/*
 投资金额+投资期限拖动条
 */

var scale = function (btn,bar,jine_value,date_value,jiange,str,money,rdValue){
    this.btn=document.getElementById(btn);
    this.bar=document.getElementById(bar);
    this.jine_value=document.getElementById(jine_value);
    this.date_value=document.getElementById(date_value);
    this.money=document.getElementById(money);
    this.step=this.bar.getElementsByTagName("div")[0];
    this.jiange=jiange;
    this.rdValue=rdValue;
    var func="this.init_"+str+"()";
    eval(func);
};
scale.prototype={
    init_jine:function (){
        var f=this,g=document,b=window;
        f.btn.style.left='352px';
        f.ondrag_jine("352");
        f.btn.onmousedown=function (e){
            var x=(e||b.event).clientX;
            var nowPos=this.offsetLeft;
            var max=f.bar.offsetWidth;
            g.onmousemove=function (e){
                var thisX=(e||b.event).clientX;
                var tom=Math.min(max,Math.max(-2,nowPos+(thisX-x)));
                var to=tom-tom% f.jiange;
                f.btn.style.left=to+'px';
                f.ondrag_jine(to);
                b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
            };
            g.onmouseup=new Function('this.onmousemove=null');
        };
    },
    init_date:function (){
        var f=this,g=document,b=window;
        f.btn.style.left='200px';
        f.ondrag_date("200");
        f.btn.onmousedown=function (e){
            var x=(e||b.event).clientX;
            var nowPos=this.offsetLeft;
            var max=f.bar.offsetWidth;
            g.onmousemove=function (e){
                var thisX=(e||b.event).clientX;
                var tom=Math.min(max,Math.max(-2,nowPos+(thisX-x)));
                var to=tom-tom% f.jiange;
                f.btn.style.left=to+'px';
                f.ondrag_date(to);
                b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
            };
            g.onmouseup=new Function('this.onmousemove=null');
        };
    },
    ondrag_jine:function (pos){
        this.step.style.width=Math.max(0,pos)+'px';
        this.jine_value.style.left=(65+parseInt(pos))+'px';
        this.jine_value.innerHTML=pos*100/440+'万';
        var jine_value=parseInt(this.jine_value.innerHTML);
        var date_value=parseInt(this.date_value.innerHTML);
        if(this.rdValue=="1"){
            this.zhijie(jine_value,date_value)
        }else{
            this.jianjie(jine_value,date_value)
        }
    },
    ondrag_date:function (pos){
        this.step.style.width=Math.max(0,pos)+'px';
        this.date_value.style.left=(65+parseInt(pos))+'px';
        this.date_value.innerHTML=pos*11/440+1+'个月';
        var jine_value=parseInt(this.jine_value.innerHTML);
        var date_value=parseInt(this.date_value.innerHTML);
        if(this.rdValue=="1"){
            this.zhijie(jine_value,date_value)
        }else{
            this.jianjie(jine_value,date_value)
        }
    },
    zhijie:function(jine_value,date_value){
        var result=jine_value*10000*0.2/100/12*date_value;
        this.money.innerHTML=result.toFixed(2);
    },
    jianjie:function(jine_value,date_value){
        var result=jine_value*10000*0.1/100/12*date_value;
        this.money.innerHTML=result.toFixed(2);
    }
}
window.onload=function(){
    new scale('jine_btn','jine_bar','jine_value','date_value','22','jine','money','1');
    new scale('date_btn','date_bar','jine_value','date_value','40','date','money','1');
}

$("input[type=radio]").click(
    function(){
        var rdValue=parseInt($("input[type=radio]:checked").val());
        var jine_value=parseInt($("#jine_value").html());
        var date_value=parseInt($("#date_value").html());
        if(rdValue==1){
            var result1=jine_value*10000*0.2/100/12*date_value;
            $("#money").html(result1.toFixed(2));
            new scale('jine_btn','jine_bar','jine_value','date_value','22','jine','money','1');
            new scale('date_btn','date_bar','jine_value','date_value','40','date','money','1');
        }else{
            var result2=jine_value*10000*0.1/100/12*date_value;
            $("#money").html(result2.toFixed(2));
            new scale('jine_btn','jine_bar','jine_value','date_value','22','jine','money','2');
            new scale('date_btn','date_bar','jine_value','date_value','40','date','money','2');
        }
    }
)