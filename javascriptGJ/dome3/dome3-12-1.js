
// alert()
function warn_on_sunmit(){

    alert("信------------息");

}
warn_on_sunmit();

// confirm() 返回是一个用户的答案
var msg = "是否？";

if(confirm(msg)){
    location.replace("确认");
}
else{
    location.replace("取消");
}

// prompt()
n = prompt("名字");

document.write(n);