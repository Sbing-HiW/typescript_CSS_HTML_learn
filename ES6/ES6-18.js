/* Generator函数的异步应用 */
/* 1 传统方法 */
// 异步编程的方法，大概有下面四种：
// 回调函数
// 事件监听
// 发布/订阅
// Promise 对象


/* 2 基本概念 */


// Promise 允许将回调函数的嵌套，改成链式调用。
fs.readFile(fileA, 'utf-8', function (err, data) {
    fs.readFile(fileB, 'utf-8', function (err, data) {
      // ...
    });
  });

//   写成：
var readFile = require('fs-readfile-promise');

readFile(fileA)
.then(function (data) {
  console.log(data.toString());
})
.then(function () {
  return readFile(fileB);
})
.then(function (data) {
  console.log(data.toString());
})
.catch(function (err) {
  console.log(err);
});

// then方法加载回调函数，catch方法捕捉执行过程中抛出的错误。





/* 3 Generator函数 */

// 协程
// 读取文件的协程写法如下。

function* asyncJob() {
  // ...其他代码
  var f = yield readFile(fileA);
  // ...其他代码
}
// 上面代码的函数asyncJob是一个协程，它的奥妙就在其中的yield命令。
// 它表示执行到此处，执行权将交给其他协程。也就是说，yield命令是异步两个阶段的分界线。

// 协程遇到yield命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。
// 它的最大优点，就是代码的写法非常像同步操作，如果去除yield命令，简直一模一样。

// 协程的Generator函数实现   需要暂停的地方用yield
function* gen(x) {
    var y = yield x + 2;
    return y;
  }
  
  var g = gen(1);
  console.log(
    g.next(), // { value: 3, done: false }
    g.next() // { value: undefined, done: true }
  )
  

// Generator函数的数据交换和错误处理

function* gen(x){
    var y = yield x + 2;
    return y;
  }
  
  var g = gen(1);
  g.next() // { value: 3, done: false }
  g.next(2) // { value: 2, done: true }
  g.throw('出错了');
  // 出错了



// 异步任务的封装
var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}

var g = gen();
var result = g.next();

result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});




/* 4 Thunk函数 */
var x = 1;

function f(m) {
  return m * 2;
}
console.log(f(x + 5));

// Thunk 函数的含义
// 编译器的“传名调用”实现，往往是将参数放到一个临时函数之中，再将这个临时函数传入函数体。这个临时函数就叫做 Thunk 函数。

function f(m) {
  return m * 2;
}

f(x + 5);

// 等同于

var thunk = function () {
  return x + 5;
};

function f(thunk) {
  return thunk() * 2;
}


// 在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，
// 将其替换成一个只接受回调函数作为参数的单参数函数。
// 正常版本的readFile（多参数版本）
fs.readFile(fileName, callback);

// Thunk版本的readFile（单参数版本）
var Thunk = function (fileName) {
  return function (callback) {
    return fs.readFile(fileName, callback);
  };
};

var readFileThunk = Thunk(fileName);
readFileThunk(callback);

// 任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式。下面是一个简单的 Thunk 函数转换器。

// ES5版本
var Thunk = function(fn){
    return function (){
      var args = Array.prototype.slice.call(arguments);
      return function (callback){
        args.push(callback);
        return fn.apply(this, args);
      }
    };
  };
  
  // ES6版本
  const Thunk = function(fn) {
    return function (...args) {
      return function (callback) {
        return fn.call(this, ...args, callback);
      }
    };
  };

  var readFileThunk = Thunk(fs.readFile);
  readFileThunk(fileA)(callback);

// 例子
  function f(a, cb) {
    cb(a);
  }
  const ft = Thunk(f);
  
  ft(1)(console.log) // 1



//   Thunkify模块  暂不看


// Grnerator函数的流程管理
var fs = require('fs');
var thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);

var gen = function* (){
  var r1 = yield readFileThunk('/etc/fstab');
  console.log(r1.toString());
  var r2 = yield readFileThunk('/etc/shells');
  console.log(r2.toString());
};
var g = gen();

var r1 = g.next();
r1.value(function (err, data) {
  if (err) throw err;
  var r2 = g.next(data);
  r2.value(function (err, data) {
    if (err) throw err;
    g.next(data);
  });
})



// Thunk函数的自动流程管理
// 可以自动执行 Generator 函数
function run(fn) {
    var gen = fn();
  
    function next(err, data) {
      var result = gen.next(data);
      if (result.done) return;
      result.value(next);
    }
  
    next();
  }
  function* g() {
    // ...
  }
  run(g);



  var g = function* (){
    var f1 = yield readFileThunk('fileA');
    var f2 = yield readFileThunk('fileB');
    // ...
    var fn = yield readFileThunk('fileN');
  };
  
  run(g);


/* 5 co模块 */
// 用于 Generator 函数的自动执行。

























