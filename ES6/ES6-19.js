/* async函数  Generator 函数的语法糖  */

// Generator 函数，依次读取两个文件。

const fs = require('fs');

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

// 上面代码的函数gen可以写成async函数，就是下面这样。

const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab');
  const f2 = await readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};

// 1 内置执行器 函数执行与普通函数一样
asyncReadFile();

// 2 更好的语义
// async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。


// 3 适用性
// co模块约定，yield命令后面只能是 Thunk 函数或 Promise 对象，
// 而async函数的await命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时会自动转成立即 resolved 的 Promise 对象）。


// 4 返回值是Promise
// async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。



/* 2 基本用法 */
// async函数返回一个 Promise 对象，可以使用then方法添加回调函数
// 当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。
function timeout(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  
  async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
  }
  
  asyncPrint('hello world', 50);
//   上面代码指定 50 毫秒以后，输出hello world。

async function timeout(ms) {
    await new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  
  async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
  }
  
  asyncPrint('hello world', 50);
  



  // 函数声明
async function foo() {}

// 函数表达式
const foo = async function () {};

// 对象的方法
let obj = { async foo() {} };
// obj.foo().then(...)

// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
// storage.getAvatar('jake').then(…);

// 箭头函数
const foo = async () => {};



/* 3 语法 */
//  返回Promise对象
// async函数返回一个 Promise 对象。
// async函数内部return语句返回的值，会成为then方法回调函数的参数。

async function f() {
    return 'hello world';
  }
  
  f().then(v => console.log(v))
  // "hello world"


// Promise对象的状态变化
// 只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。
async function getTitle(url) {
    let response = await fetch(url);
    let html = await response.text();
    return html.match(/<title>([\s\S]+)<\/title>/i)[1];
  }
  getTitle('https://tc39.github.io/ecma262/').then(console.log)
  // "ECMAScript 2017 Language Specification"


//  await命令
// await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。
async function f() {
    // 等同于
    // return 123;
    return await 123;
  }
  
  f().then(v => console.log(v))
  // 123

// await命令后面是一个thenable对象（即定义then方法的对象），那么await会将其等同于 Promise 对象。
class Sleep {
    constructor(timeout) {
      this.timeout = timeout;
    }
    then(resolve, reject) {
      const startTime = Date.now();
      setTimeout(
        () => resolve(Date.now() - startTime),
        this.timeout
      );
    }
  }
  
  (async () => {
    const sleepTime = await new Sleep(1000);
    console.log(sleepTime);
  })();
  // 1000


//   错误处理
// 如果有多个await命令，可以统一放在try...catch结构中。

async function main() {
  try {
    const val1 = await firstStep();
    const val2 = await secondStep(val1);
    const val3 = await thirdStep(val1, val2);

    console.log('Final: ', val3);
  }
  catch (err) {
    console.error(err);
  }
}
// 下面的例子使用try...catch结构，实现多次重复尝试。

const superagent = require('superagent');
const NUM_RETRIES = 3;

async function test() {
  let i;
  for (i = 0; i < NUM_RETRIES; ++i) {
    try {
      await superagent.get('http://google.com/this-throws-an-error');
      break;
    } catch(err) {}
  }
  console.log(i); // 3
}

test();



/* 4 async函数的实现原理 */
// 将 Generator 函数和自动执行器，包装在一个函数里。
async function fn(args) {
    // ...
  }
  
  // 等同于
  
  function fn(args) {
    return spawn(function* () {
      // ...
    });
  }

// spawn实现原理：
function spawn(genF) {
    return new Promise(function(resolve, reject) {
      const gen = genF();
      function step(nextF) {
        let next;
        try {
          next = nextF();
        } catch(e) {
          return reject(e);
        }
        if(next.done) {
          return resolve(next.value);
        }
        Promise.resolve(next.value).then(function(v) {
          step(function() { return gen.next(v); });
        }, function(e) {
          step(function() { return gen.throw(e); });
        });
      }
      step(function() { return gen.next(undefined); });
    });
  }



/* 5 与其他异步处理的方法比较 */

// Promise写法
function chainAnimationsPromise(elem, animations) {

    // 变量ret用来保存上一个动画的返回值
    let ret = null;
  
    // 新建一个空的Promise
    let p = Promise.resolve();
  
    // 使用then方法，添加所有动画
    for(let anim of animations) {
      p = p.then(function(val) {
        ret = val;
        return anim(elem);
      });
    }
  
    // 返回一个部署了错误捕捉机制的Promise
    return p.catch(function(e) {
      /* 忽略错误，继续执行 */
    }).then(function() {
      return ret;
    });
  
  }


// Generator写法
function chainAnimationsGenerator(elem, animations) {

    return spawn(function*() {
      let ret = null;
      try {
        for(let anim of animations) {
          ret = yield anim(elem);
        }
      } catch(e) {
        /* 忽略错误，继续执行 */
      }
      return ret;
    });
  
  }


//   asyuc函数写法
async function chainAnimationsAsync(elem, animations) {
    let ret = null;
    try {
      for(let anim of animations) {
        ret = await anim(elem);
      }
    } catch(e) {
      /* 忽略错误，继续执行 */
    }
    return ret;
  }





/* 6 按顺序完成异步操作 */

async function logInOrder(urls) {
    // 并发读取远程URL
    const textPromises = urls.map(async url => {
      const response = await fetch(url);
      return response.text();
    });
  
    // 按次序输出
    for (const textPromise of textPromises) {
      console.log(await textPromise);
    }
  }




  /* 7顶层await */
  // awaiting.js
const dynamic = import(someMission);
const data = fetch(url);
export const output = someProcess((await dynamic).default, await data);
  // usage.js
import { output } from "./awaiting.js";
function outputPlusValue(value) { return output + value }
console.log(outputPlusValue(100));
setTimeout(() => console.log(outputPlusValue(100), 1000));


























