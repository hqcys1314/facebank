/**
 * Created by facebank on 2016/11/7.
 */
//绘制整体效果图
function cirleAll(canvasId, data_arr, color_arr,value){
    var c = document.getElementById(canvasId);
    var ctx = c.getContext("2d");
    var radius = c.width /3 - 1.5*value; //大圆半径
    var radiusSmall = c.width / 3 - 3.5*value; //小圆半径
    var ox = c.width /2, oy = c.height /2; //圆心
    var data_arr_sum=0;
    var num_ling=0;
    var num_no_ling=0;
    for(var i=0;i<data_arr.length;i++){
        data_arr_sum=data_arr_sum+data_arr[i];
        if(data_arr[i]==0) num_ling++;//算出数组中0的个数
    }
    if(data_arr_sum!=0){//如果数组值不全为0
        bigCircle(canvasId,ox,oy,radius);
        smallCircle(canvasId,ox,oy,radiusSmall);
        if(num_ling==4){//只有一个值不为0时
            for(var i=0;i<data_arr.length;i++){
                if(data_arr[i]!=0) num_no_ling=i;//算出数组中非0的值的位置
            }
            ctx.beginPath();
            ctx.strokeStyle=color_arr[num_no_ling];
            ctx.lineWidth=2*value;
            ctx.arc(ox, oy, radiusSmall+value, 0, Math.PI*2, false); //这里的圆心坐标要和cirle的保持一致
            ctx.stroke();
            ctx.closePath();
        }else{
            drawCircle(canvasId,ox,oy,radiusSmall,data_arr, color_arr,value);
        }

    }else{//如果数组值全部为0，不显示动态统计图
        bigCircle(canvasId,ox,oy,radius);
        smallCircle(canvasId,ox,oy,radiusSmall);
    }
}

//绘制动态统计图
function drawCircle(canvasId,ox,oy,radiusSmall,data_arr, color_arr,value)
{
    var c = document.getElementById(canvasId);
    var ctx = c.getContext("2d");
    var i= 0;
    var startAngledt=0,endAngledt=Math.PI * 2/720;
    //绘制饼图
    function digui(){
        var count=0;
        var per=data_arr[i];
        var color=color_arr[i];
        var goAngle =per * Math.PI * 2;
        var anglePerSec = Math.PI * 2/480; // 每个间隔滑动的弧度
        var handle= setInterval(function() {
            ctx.beginPath();
            ctx.strokeStyle=color;
            ctx.lineWidth=2*value;
            ctx.arc(ox, oy, radiusSmall+value, startAngledt, endAngledt, false); //这里的圆心坐标要和cirle的保持一致
            ctx.stroke();
            ctx.closePath();
            startAngledt=startAngledt+anglePerSec;
            endAngledt = endAngledt+anglePerSec;
            count++;

            if(goAngle==0){
                clearInterval(handle);
                i++;
                if(i<data_arr.length){
                    startAngledt=startAngledt-anglePerSec;
                    endAngledt = endAngledt-anglePerSec;
                    digui();
                }else{
                    return null;
                }
            }else if((count*anglePerSec).toFixed(4)==goAngle.toFixed(4)){
                clearInterval(handle);
                i++;
                if(i<data_arr.length){
                    digui();
                }else{
                    return null;
                }
            }
        }, 1); // 这里定义每1ms绘制一次
    }
   digui();
}

/*间隔白线*/
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
function bigCircle(canvasId,ox,oy,radius){
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
function smallCircle(canvasId,ox,oy,radiusSmall){
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
    var bit=9/360;
    var sum_arr=0;
    var data_arr=[0,0,0,0,0];
    for(i=0;i<data_value.length;i++){
        sum=sum+data_value[i];
    }
    if(sum!==0){
        for(i=0;i<data_value.length;i++){
            var bi=data_value[i]/sum;
            if(bi==0){
                data_arr[i]=0;
            }else if(bi==1){
                data_arr[i]=1;
            }else if(bi<1&&bi>1-bit){
                data_arr[i]=(Math.floor(bi*40))/40;
            }else if(bi>0&&bi<bit){
                data_arr[i]=bit;
            }
            else{
                data_arr[i]=(Math.floor(bi*40))/40;
            }
            sum_arr=sum_arr+data_arr[i];
        }
        var dis=sum_arr-1;//data_arr数组内值的和与“1”作比较
        var maxpos=data_arr.indexOf(Math.max.apply(Math,data_arr));//求出数组data_arr中最大值的索引
        data_arr[maxpos]=(data_arr[maxpos]-dis).toFixed(3);//对最大的值进行调整

    }else{
        data_arr=[0,0,0,0,0];
    }
    console.log(data_arr);
    return data_arr;

}