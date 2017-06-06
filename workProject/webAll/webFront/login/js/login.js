/**
 * Created by facebank on 2015/11/13.
 */
function login(num){
    for(var i=1;i<=2;i++){
        if(i==num){
            document.getElementById("loginM"+i).style.display="block";
            document.getElementById("loginChoose"+i).className = "loginBlock";
        }
        else{
            document.getElementById("loginM"+i).style.display="none";
            document.getElementById("loginChoose"+i).className ="loginGray";

        }
    }
}
