/* Module的加载实现 */
/* 1 浏览器加载 */
// // 两种异步加载的语法。
// <script src="path/to/myModule.js" defer></script>
// <script src="path/to/myModule.js" async></script>
// defer要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行；
// async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。

// 一句话defer是“渲染完再执行”，async是“下载完就执行”



// <script type="module" src="./foo.js"></script>
// // <!-- 等同于 -->
// <script type="module" src="./foo.js" defer></script>



// import utils from 'https://example.com/js/utils.js';

// const x = 1;

// console.log(x === window.x); //false
// console.log(this === undefined); // true
// 利用顶层的this等于undefined这个语法点，可以侦测当前代码是否在 ES6 模块之中。

// const isNotModuleScript = this !== undefined;





/* 2 ES6模块与CommonJS模块的差异 */

// 两个差异
// CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
// CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。




/* 3  Node加载 */
// ES6模块加载CommonJS模块

// a.js
module.exports = {
    foo: 'hello',
    bar: 'world'
  };
  
  // 等同于
  export default {
    foo: 'hello',
    bar: 'world'
  };
//   三种写法，可以拿到 CommonJS 模块的module.exports。

  // 写法一
  import baz from './a';
  // baz = {foo: 'hello', bar: 'world'};
  
  // 写法二
  import {default as baz} from './a';
  // baz = {foo: 'hello', bar: 'world'};
  
  // 写法三
  import * as baz from './a';
  // baz = {
  //   get default() {return module.exports;},
  //   get foo() {return this.default.foo}.bind(baz),
  //   get bar() {return this.default.bar}.bind(baz)
  // }


// 正确的写法一
import * as express from 'express';
const app = express.default();

// 正确的写法二
import express from 'express';
const app = express();



// CommomJS模块加载ES6模块





/* 4 循环加载 */

// “循环加载”（circular dependency）指的是，
// a脚本的执行依赖b脚本，而b脚本的执行又依赖a脚本。
// a.js
var b = require('b');
// b.js
var a = require('a');




// CommonJS模块的加载原理
// {
//     id: '...',
//     exports: { ... },
//     loaded: true,
//     ...
//   }
// d属性是模块名，
// exports属性是模块输出的各个接口，
// loaded属性是一个布尔值，表示该模块的脚本是否执行完毕。




// CommonJS模块的就循环加载

// a.js
exports.done = false;
var b = require('./b.js');
console.log('在 a.js 之中，b.done = %j', b.done);
exports.done = true;
console.log('a.js 执行完毕');
// 上面代码之中，a.js脚本先输出一个done变量，然后加载另一个脚本文件b.js。注意，此时a.js代码就停在这里，等待b.js执行完毕，再往下执行。

// b.js
exports.done = false;
var a = require('./a.js');
console.log('在 b.js 之中，a.done = %j', a.done);
exports.done = true;
console.log('b.js 执行完毕');
// b.js执行到第二行，就会去加载a.js，这时，就发生了“循环加载”。系统会去a.js模块对应对象的exports属性取值，
// 可是因为a.js还没有执行完，从exports属性只能取回已经执行的部分，而不是最后的值。

// main.js
var a = require('./a.js');
var b = require('./b.js');
console.log('在 main.js 之中, a.done=%j, b.done=%j', a.done, b.done);


// // 结果
// 在 b.js 之中，a.done = false
// b.js 执行完毕
// 在 a.js 之中，b.done = true
// a.js 执行完毕
// 在 main.js 之中, a.done=true, b.done=true



// ES6模块的循环加载
// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar);
export let foo = 'foo';

// b.mjs
import {foo} from './a';
console.log('b.mjs');
console.log(foo);
export let bar = 'bar';
// 上面代码中，a.mjs加载b.mjs，b.mjs又加载a.mjs，构成循环加载。执行a.mjs，结果如下。

// $ node --experimental-modules a.mjs
b.mjs
// ReferenceError: foo is not defined

// 首先，执行a.mjs以后，引擎发现它加载了b.mjs，因此会优先执行b.mjs，然后再执行a.mjs。接着，执行b.mjs的时候，
// 已知它从a.mjs输入了foo接口，这时不会去执行a.mjs，而是认为这个接口已经存在了，继续往下执行。
// 执行到第三行console.log(foo)的时候，才发现这个接口根本没定义，因此报错。


// 解决
// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar());
function foo() { return 'foo' }
export {foo};

// b.mjs
import {foo} from './a';
console.log('b.mjs');
console.log(foo());
function bar() { return 'bar' }
export {bar};
//结果
b.mjs
foo
a.mjs
bar 







/* 5 ES6模块的转码 */









