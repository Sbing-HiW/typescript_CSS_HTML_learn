/* Promise 对象 */
// Promise 的含义
// 里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果
// 特点
// 1 对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）
// 2 一旦状态改变，就不会再变，任何时候都可以得到这个结果。这时就称为 resolved（已定型）





// 基本用法
// const promise = new Promise(function(resolve, reject) {
//     // ... some code
//     if (/* 异步操作成功 */){
//       resolve(value);
//     } else {
//       reject(error);
//     }
//   });
// Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
// resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
// reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

// Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
promise.then(function(value) {
    // success
  }, function(error) {
    // failure
  });
// 第一个回调函数是Promise对象的状态变为resolved时调用，
// 第二个回调函数是Promise对象的状态变为rejected时调用。(可选)


function timeout(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms, 'done');
    });
  }
  
  timeout(100).then((value) => {
    console.log(value);
  });


  let promise = new Promise(function(resolve, reject) {
    console.log('Promise');
    resolve();
  });
  
  promise.then(function() {
    console.log('resolved.');
  });
  
  console.log('Hi!');
  
  // Promise
  // Hi!
  // resolved


// 异步加载图片的例子。
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    const image = new Image();

    image.onload = function() {
      resolve(image);
    };

    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };

    image.src = url;
  });
}



new Promise((resolve, reject) => {
    resolve(1);
    console.log(2);
  }).then(r => {
    console.log(r);
  });
  // 2
  // 1




// Promise.prototype.then()
// 它的作用是为 Promise 实例添加状态改变时的回调函数。前面说过，
// then方法的第一个参数是resolved状态的回调函数，第二个参数（可选）是rejected状态的回调函数。

getJSON("/post/1.json").then(function(post) {
    return getJSON(post.commentURL);
  }).then(function (comments) {
    console.log("resolved: ", comments);
  }, function (err){
    console.log("rejected: ", err);
  });
// 使用箭头函数
  getJSON("/post/1.json").then(
    post => getJSON(post.commentURL)
  ).then(
    comments => console.log("resolved: ", comments),
    err => console.log("rejected: ", err)
  );




// Promise.prototype.catch() 
// 指定发生错误时的回调函数。
getJSON('/posts.json').then(function(posts) {
    // ...
  }).catch(function(error) {
    // 处理 getJSON 和 前一个回调函数运行时发生的错误
    console.log('发生错误！', error);
  });


  // 写法一
const promise = new Promise(function(resolve, reject) {
    try {
      throw new Error('test');
    } catch(e) {
      reject(e);
    }
  });
  promise.catch(function(error) {
    console.log(error);
  });
  
  // 写法二
  const promise = new Promise(function(resolve, reject) {
    reject(new Error('test'));
  });
  promise.catch(function(error) {
    console.log(error);
  });



//   Promise 内部的错误不会影响到 Promise 外部的代码
  const someAsyncThing = function() {
    return new Promise(function(resolve, reject) {
      // 下面一行会报错，因为x没有声明
      resolve(x + 2);
    });
  };
  
  someAsyncThing().then(function() {
    console.log('everything is great');
  });
  
  setTimeout(() => { console.log(123) }, 2000);
  // Uncaught (in promise) ReferenceError: x is not defined
  // 123


  someAsyncThing().then(function() {
    return someOtherAsyncThing();
  }).catch(function(error) {
    console.log('oh no', error);
    // 下面一行会报错，因为y没有声明
    y + 2;
  }).catch(function(error) {
    console.log('carry on', error);
  });
  // oh no [ReferenceError: x is not defined]
  // carry on [ReferenceError: y is not defined]
// 第二个catch方法用来捕获前一个catch方法抛出的错误。





// Promise.prototype.finally()
// 用于指定不管 Promise 对象最后状态如何，都会执行的操作
// promise
// .then(result => {···})
// .catch(error => {···})
// .finally(() => {···});

// 服务器使用 Promise 处理请求，然后使用finally方法关掉服务器。
server.listen(port)
  .then(function () {
    // ...
  })
  .finally(server.stop);


// finally方法总是会返回原来的值。
// resolve 的值是 undefined
Promise.resolve(2).then(() => {}, () => {})

// resolve 的值是 2
Promise.resolve(2).finally(() => {})

// reject 的值是 undefined
Promise.reject(3).then(() => {}, () => {})

// reject 的值是 3
Promise.reject(3).finally(() => {})




// Promise.all()
// 将多个 Promise 实例，包装成一个新的 Promise 实例。

const p = Promise.all([p1, p2, p3]);
// （1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
// （2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

// 生成一个Promise对象的数组
const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
    return getJSON('/post/' + id + ".json");
  });
  
  Promise.all(promises).then(function (posts) {
    // ...
  }).catch(function(reason){
    // ...
  });


  const p1 = new Promise((resolve, reject) => {
    resolve('hello');
  })
  .then(result => result)
  .catch(e => e);
  
  const p2 = new Promise((resolve, reject) => {
    throw new Error('报错了');
  })
  .then(result => result)
  .catch(e => e);
  
  Promise.all([p1, p2])
  .then(result => console.log(result))
  .catch(e => console.log(e));
  // ["hello", Error: 报错了]











// Promise.race() 将多个 Promise 实例，包装成一个新的 Promise 实例。
// const p = Promise.race([p1, p2, p3]);
// 只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。
// 那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

const p = Promise.race([
    fetch('/resource-that-may-take-a-while'),
    new Promise(function (resolve, reject) {
      setTimeout(() => reject(new Error('request timeout')), 5000)
    })
  ]);
  
  p
  .then(console.log)
  .catch(console.error);








// Promise.resolve()  将现有对象转为 Promise 对象
Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))

// 1 参数是一个Promise实例
// 如果参数是 Promise 实例，那么Promise.resolve将不做任何修改、原封不动地返回这个实例。

// 2 参数是一个thenable对象
// thenable对象指的是具有then方法的对象
let thenable = {
    then: function(resolve, reject) {
      resolve(42);
    }
  };

  let p1 = Promise.resolve(thenable);
  p1.then(function(value) {
    console.log(value);  // 42
  });

// 3 参数不是具有then方法的对象或根本不是对象
//  如果参数是一个原始值，或者是一个不具有then方法的对象，
// 则Promise.resolve方法返回一个新的 Promise 对象，状态为resolved。
const p = Promise.resolve('Hello');

p.then(function (s){
  console.log(s)
});
// Hello


// 4 不带任何参数
// 允许调用时不带参数，直接返回一个resolved状态的 Promise 对象。

setTimeout(function () {
    console.log('three');
  }, 0);
  
  Promise.resolve().then(function () {
    console.log('two');
  });
  
  console.log('one');
  
  // one
  // two
  // three











// Promise.reject()
// 返回一个新的 Promise 实例，该实例的状态为rejected。
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了













// 应用

// 1 加载图片
const preloadImage = function (path) {
    return new Promise(function (resolve, reject) {
      const image = new Image();
      image.onload  = resolve;
      image.onerror = reject;
      image.src = path;
    });
  };


// 2 Generator函数与Promise的结合
// 使用 Generator 函数管理流程，遇到异步操作的时候，通常返回一个Promise对象。
function getFoo () {
    return new Promise(function (resolve, reject){
      resolve('foo');
    });
  }
  
  const g = function* () {
    try {
      const foo = yield getFoo();
      console.log(foo);
    } catch (e) {
      console.log(e);
    }
  };
  
  function run (generator) {
    const it = generator();
  
    function go(result) {
      if (result.done) return result.value;
  
      return result.value.then(function (value) {
        return go(it.next(value));
      }, function (error) {
        return go(it.throw(error));
      });
    }
  
    go(it.next());
  }
  
  run(g);








// Promise.try()

const f = () => console.log('now');
Promise.resolve().then(f);
console.log('next');
// next
// now


const f = () => console.log('now');
Promise.try(f);
console.log('next');
// now
// next