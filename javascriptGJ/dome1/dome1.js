
// 阶乘

document.write("<h2>阶乘</h2>");
for(i = 1,fact = 1;i < 10;i++,fact *= i){
    document.write(i + " ! = " + fact);
    document.write("<br>");
}
var fact = 1;
for(i = 1;i < 10;i++ ){
    fact *= i 
    document.write(i + "! = " + fact);
    document.write("<br>");
}

// 斐波那契数列

document.write("<h2>斐波那契数列</h2>") 
 var j = 1;
 var a = 0; 
 var c = 0;
for(i = 0;i < 50; i++){
    c = j + a;
    j = a;
    a = c;
    document.write(c + " ");
}

//    j  a  c
// 1  1  2  3  5 
// j  a  c 

for(i = 0, j =1 , a = 0, c = 0 ; i < 50 ; i++ , c = j + a, j = a , a  = c){

    // document.write ( alert( c ));
    // alert ("第"+(i+1)+"位 :"+ c);

}