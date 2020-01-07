/* 函数的扩展 */

/* 1 函数参数的默认值*/
function log(x, y = 'World') {
    console.log(x, y);
  }
  
  log('Hello') // Hello World
  log('Hello', 'China') // Hello China
  log('Hello', '') // Hello

  function Point(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  
  const p = new Point();
  p // { x: 0, y: 0 }

//   使用参数默认值时，函数不能有同名参数。
  // 不报错
function foo(x, x, y) {
    // ...
  }
  
  // 报错
function foo(x, x, y = 1) {
    // ...
  }


// 与解构赋值默认值结合使用
// 写法一
function m1({x = 0, y = 0} = {}) {
    return [x, y];
  }
  
  // 写法二
  function m2({x, y} = { x: 0, y: 0 }) {
    return [x, y];
  }
// 函数没有参数的情况
m1() // [0, 0]
m2() // [0, 0]

// x 和 y 都有值的情况
m1({x: 3, y: 8}) // [3, 8]
m2({x: 3, y: 8}) // [3, 8]

// x 有值，y 无值的情况
m1({x: 3}) // [3, 0]
m2({x: 3}) // [3, undefined]

// x 和 y 都无值的情况
m1({}) // [0, 0];
m2({}) // [undefined, undefined]

m1({z: 3}) // [0, 0]
m2({z: 3}) // [undefined, undefined]

// 参数默认值的位置
// 例一
function f(x = 1, y) {
    return [x, y];
  }
  
  f() // [1, undefined]
  f(2) // [2, undefined])
//   f(, 1) // 报错
  f(undefined, 1) // [1, 1]
  
  // 例二
  function f(x, y = 5, z) {
    return [x, y, z];
  }
  
  f() // [undefined, 5, undefined]
  f(1) // [1, 5, undefined]
//   f(1, ,2) // 报错
  f(1, undefined, 2) // [1, 5, 2]

// 函数的length属性 
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2

(function(...args) {}).length // 0
// 如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。
(function (a = 0, b, c) {}).length // 0
(function (a, b = 1, c) {}).length // 1

// 作用域
var x = 1;
function foo(x, y = function() { x = 2; }) {
  x = 3;
  y();
  console.log(x);
}

foo() // 2
x // 1

// 应用  可以指定某一个参数不得省略，如果省略就抛出一个错误。
function throwIfMissing() {
    throw new Error('Missing parameter');
  }
  
  function foo(mustBeProvided = throwIfMissing()) {
    return mustBeProvided;
  }
  
  foo()
  // Error: Missing parameter

/* 2 rest 参数   rest 参数（形式为...变量名），用于获取函数的多余参数 */
function add(...values) {
    let sum = 0;
  
    for (var val of values) {
      sum += val;
    }
  
    return sum;
  }
  
  add(2, 5, 3) // 10

//   下面是一个 rest 参数代替arguments变量的例子。

  // arguments变量的写法
  function sortNumbers() {
    return Array.prototype.slice.call(arguments).sort();
  }
  
  // rest参数的写法
  const sortNumbers = (...numbers) => numbers.sort();

/* 3 严格模式*/
// 只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错
// 报错
function doSomething(a, b = a) {
    'use strict';
    // code
  }
  
  // 报错
  const doSomething = function ({a, b}) {
    'use strict';
    // code
  };
  
  // 报错
  const doSomething = (...a) => {
    'use strict';
    // code
  };
  
  const obj = {
    // 报错
    doSomething({a, b}) {
      'use strict';
      // code
    }
  };

//   两种方法可以规避这种限制。第一种是设定全局性的严格模式，这是合法的。

  'use strict';
  
  function doSomething(a, b = a) {
    // code
  }
//   第二种是把函数包在一个无参数的立即执行函数里面。
  
  const doSomething = (function () {
    'use strict';
    return function(value = 42) {
      return value;
    };
  }());

/* 4 name 属性*/
var f = function () {};

// ES5
f.name // ""

// ES6
f.name // "f"


/* 5 箭头函数*/
var f = () => 5;
// 等同于
var f = function () { return 5 };

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};

// 箭头函数可以与变量解构结合使用。
const full = ({ first, last }) => first + ' ' + last;
// 等同于
function full(person) {
  return person.first + ' ' + person.last;
}

// 正常函数写法
[1,2,3].map(function (x) {
    return x * x;
  });
  
  // 箭头函数写法
  [1,2,3].map(x => x * x);

// 箭头函数可以让setTimeout里面的this，绑定定义时所在的作用域，而不是指向运行时所在的作用域。
  function Timer() {
    this.s1 = 0;
    this.s2 = 0;
    // 箭头函数
    setInterval(() => this.s1++, 1000);
    // 普通函数
    setInterval(function () {
      this.s2++;
    }, 1000);
  }
  
  var timer = new Timer();
  
  setTimeout(() => console.log('s1: ', timer.s1), 3100);
  setTimeout(() => console.log('s2: ', timer.s2), 3100);
  // s1: 3
  // s2: 0

  function foo() {
    return () => {
      return () => {
        return () => {
          console.log('id:', this.id);
        };
      };
    };
  }
  
  var f = foo.call({id: 1});
  
  var t1 = f.call({id: 2})()(); // id: 1
  var t2 = f().call({id: 3})(); // id: 1
  var t3 = f()().call({id: 4}); // id: 1
// 上面代码之中，只有一个this，就是函数foo的this，所以t1、t2、t3都输出同样的结果。因为所有的内层函数都是箭头函数，都没有自己的this，它们的this其实都是最外层foo函数的this。

/* 6 尾调用优化 某个函数的最后一步是调用另一个函数  */
// 以下三种情况，都不属于尾调用。

// 情况一
function f(x){
  let y = g(x);
  return y;
}

// 情况二
function f(x){
  return g(x) + 1;
}

// 情况三
function f(x){
  g(x);
}

function factorial(n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
  }
  
  factorial(5) // 120
//   上面代码是一个阶乘函数，计算n的阶乘，最多需要保存n个调用记录，复杂度 O(n)

// 非尾递归的 Fibonacci 数列实现如下。
function Fibonacci (n) {
  if ( n <= 1 ) {return 1};

  return Fibonacci(n - 1) + Fibonacci(n - 2);
}
Fibonacci(10) // 89
Fibonacci(100) // 超时
Fibonacci(500) // 超时
// 尾递归优化过的 Fibonacci 数列实现如下。
function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
  if( n <= 1 ) {return ac2};

  return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}
Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity

/* 7 函数参数的尾逗号*/
function clownsEverywhere(
    param1,
    param2,
  ) { /* ... */ }
  
  clownsEverywhere(
    'foo',
    'bar',
  );

/* 8 Function.prototype.toString()*/

// 修改后的toString()方法，明确要求返回一模一样的原始代码。

function /* foo comment */ foo () {}

foo.toString()
// "function /* foo comment */ foo () {}"


/* 9 catch 命令的参数省略*/
try {
    // ...
  } catch {
    // ...
  }






