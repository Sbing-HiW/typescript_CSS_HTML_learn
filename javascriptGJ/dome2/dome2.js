



// var p = new Object ();
// p.x = 0;
// p.we = 1;
// alert(p.we);


// var a1 = [1,2,3];
// var a2 = [4,5,6];
// var a3 = [7,8,9];

// var c = [a1,a2,a3];

// alert(c[1][2]);

// function test (o){
//    var i = 0;
//    if ( o == 1){
//        var j = 0;
//        for(var k = 0;k < 10;k++){
//         //  document.write(k);
//          document.write(j);
//        }
//     // document.write(k+"***");
//     // document.write(j);
//    }
// // document.write(k+"====");
// // document.write(j);
// }
// // document.write(k+"-----");
// test(1);



// var soc = "globle";

// function f(){
//     alert(soc);
//     var soc = "globle";
//     alert(soc);
//     // parent.test(1);
// }
// f();


// var ss = "hello";
// var u = ss.toUpperCase();//转为大写
// ss = u;
// alert(ss);

//  b = 1;
//  a = ++b;

// alert( -6 >> 6)


// function facto(x){
// if(x < 0 ) throw new Error ("错误");
// }

// facto(-1);



// call()和apply()  不理解

// function f (o){
//    console.log(o);
// }

// f.apply( 1 ,[1,7,4,6]);



// 对象和原型对象
// function cir (x,y,z){
 
//     this.x = x;
//     this.y = y;
//     this.z = z;
// }

// new  cir (0,0,0);

// cir.prototype.pi = 3.14159;

// function cir_cir (){return 2*this.pi*this.z};

// cir.prototype.cir1 = cir_cir;

// cir.prototype.air = function () {return this.pi*this.z*this.z};

// var c = new cir (0 ,0 ,1)

// var a = c.air();

// var p =  c.cir1 ();

// console.log(p)

var arr = [1,2,3,4,5,6,7,8,9];
// 数组依次打印
document.write(arr.join("<hr>"));
// 数组倒叙打印
document.write("<hr>"+arr.reverse());
// 删除数组元素并返回新数组（x，y） x从第几位，y到第几位 返回 x-y
document.write("<hr>"+arr.splice(2,1));
// 替换数组元素
arr.splice(2,7,"a","c")
document.write("<hr>"+arr);

var arr_two = ["bac","ac","cd",5,3,6];
// 按字母或者数字大小顺序排序
document.write("<hr>"+arr_two.sort());
// 创建并返回一个数组
document.write("<hr>"+arr_two.concat(6,8,[5,2],[5,2,3],[5,[4,[5,6]]]));
// 返回指定数组片段(x,y) 从x位到y
document.write("<hr>"+arr_two.slice(2,8))
// 添加数组元素至数组尾部并返回新长度
document.write("<hr>"+arr_two.push(1,23,1))
// 删除数组最末元素并返回被删除元素
document.write("<hr>"+arr_two.pop())
// 添加数组元素至数组开头并返回新长度
document.write("<hr>"+arr_two.unshift(1,23,1))
// 删除数组最开头元素并返回被删除元素
document.write("<hr>"+arr_two.shift())
//将数组转化为一个字符串
document.write("<hr>"+arr_two.toString());

