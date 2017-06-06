/**
 * Created by facebank on 2016/11/7.
 */
    //绘制饼图
function drawCircle(canvasId, data_arr, color_arr,value)
{
    var c = document.getElementById(canvasId);
    var ctx = c.getContext("2d");
    var radius = c.width /3 - 1.5*value; //大圆半径
    var radiusSmall = c.width / 3 - 3.5*value; //小圆半径
    var ox = c.width /2, oy = c.height /2; //圆心
    bigCircle(canvasId,ox,oy,radius);
    smallCircle(canvasId,ox,oy,radiusSmall);
    var i=0;
    var startAngledt=0,endAngledt=0;
    //绘制饼图
    function digui(){
        var times= 0,count=0;
        var per=data_arr[i];
        var color=color_arr[i];
        var goAngle =per * Math.PI * 2;
        var anglePerSec = Math.PI * 2/360; // 每个间隔滑动的弧度
        var handle= setInterval(function() {
            ctx.beginPath();
            ctx.strokeStyle=color;
            ctx.lineWidth=2*value;
            ctx.arc(ox, oy, radiusSmall+value, startAngledt, endAngledt, false); //这里的圆心坐标要和cirle的保持一致
            ctx.closePath();
            ctx.stroke();
            startAngledt=startAngledt+anglePerSec; // 消除每次绘环间的计算误差，防止出现空隙
            endAngledt = startAngledt+anglePerSec;
            count++;
            times=times+20;
            if (count*anglePerSec==goAngle||goAngle==0){
                clearInterval(handle);
                i++;
                if(i<data_arr.length){
                    //   jiange(canvasId,ox,oy,radius,startAngledt,startAngledt+anglePerSec);
                    //   startAngledt=startAngledt+anglePerSec;
                    digui();
                }else{
                    return 0;
                }
            }
        }, 1); // 这里定义每30ms绘制一次

    }
    digui();
}
//*间隔白线*//*
function jiange(canvasId,ox,oy,radius,startAngledt,endAngledt,value){
    var c = document.getElementById(canvasId);
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle="#ffffff";
    ctx.lineWidth=3*value;
    ctx.arc(ox, oy, radius, startAngledt, endAngledt, false); //这里的圆心坐标要和cirle的保持一致
    ctx.stroke();
    ctx.closePath();
}
/*外面的大灰圆*/
function bigCircle(canvasId,ox,oy,radius,value){
    var c = document.getElementById(canvasId);
    var ctx = c.getContext("2d");

    ctx.fillStyle ="#e3e3e3";
    ctx.beginPath();
    ctx.moveTo(ox, oy); //移动到到圆心
    ctx.arc(ox, oy, radius, 0, 2*Math.PI, false);
    ctx.closePath();
    ctx.fill();
}
/*里面的小圆*/
function smallCircle(canvasId,ox,oy,radiusSmall,value){
    var c = document.getElementById(canvasId);
    var ctx = c.getContext("2d");

    ctx.fillStyle ="#ffffff";
    ctx.beginPath();
    ctx.moveTo(ox, oy); //移动到到圆心
    ctx.arc(ox, oy, radiusSmall, 0, 2*Math.PI, false);
    ctx.closePath();
    ctx.fill();
}
/*计算显示比例*/
function dataDisplay(data_value){
    var sum=0;
    var data_value_int=[];
    for(i=0;i<data_value.length;i++){
        if(data_value[i]==0){
            data_value_int=0;
        }else if(data_value[i]<10&&data_value[i]>0){
            data_value_int[i]=10;
        }else if(data_value[i]>=10&&data_value[i]<100){
            data_value_int[i]=100;
        }else if(data_value[i]>=100&&data_value[i]<1000){
            data_value_int[i]=150; }
        else if(data_value[i]>=1000&&data_value[i]<10000){
            data_value_int[i]=200;
        }else if(data_value[i]>=10000&&data_value[i]<20000){
            data_value_int[i]=400;
        }else if(data_value[i]>=20000&&data_value[i]<50000){
            data_value_int[i]=1000;
        }else if(data_value[i]>=50000&&data_value[i]<500000){
            data_value_int[i]=5000;
        }else if(data_value[i]>=500000){
            data_value_int[i]=20000;
        }
    }
    var bit=9/360;//每份显示9度，一共有40份
    var data_arr=[];
    for(i=0;i<data_value_int.length;i++){
        sum=sum+data_value_int[i];
    }
    console.log(sum);
    console.log(data_value_int);

    if(sum!==0){
        for(i=0;i<data_value_int.length;i++){
            var bi=data_value_int[i]/sum;//所占份数
            if(bi==0){
                data_arr[i]=0;
            }else if(bi>0&&bi<bit){
                data_arr[i]=bit;
            }
            else if(bi==1){
                data_arr[i]=1;
            }else if(bi<1&&bi>=1-bit){
                data_arr[i]=(Math.floor(bi/bit))/40;
            }else
            {
                data_arr[i]=(Math.round(bi/bit))/40;
            }

        }
    }else{
        data_arr=[0,0,0,0,0];
    }
    console.log(data_arr);
    return data_arr;

}