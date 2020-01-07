
/* 1 let命令 */ 
// 1.1 基本用法
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10

var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6

// 1.2 不存在变量提升
// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
console.log(bar); // 报错ReferenceError
let bar = 2;

// 1.3 暂时性死区 如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错
var tmp = 123;

if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}

if (true) {
    // TDZ开始
    tmp = 'abc'; // ReferenceError
    console.log(tmp); // ReferenceError
  
    let tmp; // TDZ结束
    console.log(tmp); // undefined
  
    tmp = 123;
    console.log(tmp); // 123
}
// 隐蔽的死区  此时y未被声明
function bar(x = y, y = 2) {
    return [x, y];
  }
  
  bar(); // 报错


// 不报错
var x = x;
// 报错
let x = x;
// ReferenceError: x is not defined


// 1.4  不允许重复声明
// 报错
function func() {
    let a = 10;
    var a = 1;
  }
  
  // 报错
  function func() {
    let a = 10;
    let a = 1;
  }


  function func(arg) {
    let arg;
  }
  func() // 报错
  
  function func(arg) {
    {
      let arg;
    }
  }
  func() // 不报错



/* 2 块级作用域  */
// 2.1 为什么？
// 2.1.1 内层变量可能会覆盖外层变量
var tmp = new Date();
function f() {
  console.log(tmp);
  if (false) {
    var tmp = 'hello world';
  }
}
f(); // undefined
// 2.1.2 用来计数的循环变量泄露为全局变量
var s = 'hello';
for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}
console.log(i); // 5

// 2.2 块级作用域与函数声明
// 浏览器的 ES6 环境
function f() { console.log('I am outside!'); }

(function () {
  if (false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());
// Uncaught TypeError: f is not a function
// let只能出现在当前作用域的顶层
// 不报错
'use strict';
if (true) {
  function f() {}
}

// 报错
'use strict';
if (true)
  function f() {}

/* 3 const 命令 */
// 3.1 基本用法 const声明一个只读的常量。一旦声明，常量的值就不能改变。 const一旦声明变量，就必须立即初始化，不能留到以后赋值。
const PI = 3.1415;
PI // 3.1415

PI = 3;
// TypeError: Assignment to constant variable.


// const声明的常量，也与let一样不可重复声明。
var message = "Hello!";
let age = 25;
// 以下两行都会报错
const message = "Goodbye!";
const age = 30;

// 本质
const foo = {};

// 为 foo 添加一个属性，可以成功
foo.prop = 123;
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {}; // TypeError: "foo" is read-only

/* 4 ES6声明变量的六种方法  */
// 4.1 var 
// 4.2 function
// 4.3 let 
// 4.4 const
// 4.5 import
// 4.6 class

/* 5 globalThis 对象 */
// 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);

// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};