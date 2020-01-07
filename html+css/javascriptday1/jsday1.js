import { stringify } from "querystring";

// document.write("你好");

// 变量声明
// var a;
// 变量赋值
// a = 100; 
// 声明赋值
// var b = 100;
// document.write(a+b);
//单一var模式
// var a = 100,
//     b = 200,
//     c = 300,
//     d,
//     e;
// document.write(a,b,c,d+e);

// 由值决定类型

//值类型
// 声明只有var
// Number
// var number = 1.1 ;
// Boolean 
// var bool = false;
// String
// var string = "wo" ;
//undefined  为赋值
// var und = undefined;
//null 空值覆盖
// var nu = null;

//引用类型
// Array 数组
// var arr = [];


// ++a 和 a++
// 赋值的顺序自右向左，计算的顺序自左向右
// var nunm1 =10;
// var bnum = ++nunm1 - 1 + nunm1++;
// document.write(bnum + " " + nunm1);

// var i = 123;
// var m = 234;

// var n = i;
// var i = m;
// var m = n;

// i = i + m;
// m = i - m;
// i = i - m;

// i += m;
// m = i - m;
// i -= m;


// document.write(i,m)




// 逻辑运算符 && || ！
//  undefined, null , NaN , "" , 0 , false => false

// &&
// 先看第一表达式转换为布尔值的结果，如果结果为真，那么它会看第二个表达式转换为布尔值的结果，然后如果只有两个表达式，只看到第二个表达式就可以返回该表达式的值
// 多表达式 看到真一直往后走  看到假就停
//短路语句
// var date = "...";
// date && document.write("存在");

// ||
 //碰到真就返回  寻找真
 
// var n = parseInt(window.prompt("input"));
 
// var m = 1;
//  for(var i = 0;i < n;i++){
//     m = m*2;
//  }
 
// document.write(m);

  

// typeof  : Number string Boolean Object undefined function 
var num = 1.2;
console.log(typeof(num));







