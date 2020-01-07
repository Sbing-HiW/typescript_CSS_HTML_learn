/* Module（模块） */
/* 1 概述 */
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;


// ES6模块
import { stat, exists, readFile } from 'fs';




/* 2 严格模式 */
// 自动采用严格模式

// 变量必须声明后再使用
// 函数的参数不能有同名属性，否则报错
// 不能使用with语句
// 不能对只读属性赋值，否则报错
// 不能使用前缀 0 表示八进制数，否则报错
// 不能删除不可删除的属性，否则报错
// 不能删除变量delete prop，会报错，只能删除属性delete global[prop]
// eval不会在它的外层作用域引入变量
// eval和arguments不能被重新赋值
// arguments不会自动反映函数参数的变化
// 不能使用arguments.callee
// 不能使用arguments.caller
// 禁止this指向全局对象
// 不能使用fn.caller和fn.arguments获取函数调用的堆栈
// 增加了保留字（比如protected、static和interface）



/* 3 export命令 */
// export命令用于规定模块的对外接口，
// import命令用于输入其他模块提供的功能。

// profile.js
// 1
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;

// profile.js
// 2
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export { firstName, lastName, year };




// export输出的变量就是本来的名字，但是可以使用as关键字重命名。
// function v1() { ... }
// function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};



// 写法一
export var m = 1;

// 写法二
var m = 1;
export {m};

// 写法三
var n = 1;
export {n as m};



/* 4 import命令 */

// 使用export命令定义了模块的对外接口以后，其他 JS 文件就可以通过import命令加载这个模块。

// main.js
import { firstName, lastName, year } from './profile.js';

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}


// 想为输入的变量重新取一个名字，import命令要使用as关键字，将输入的变量重命名。

import { lastName as surname } from './profile.js';





/* 5 模块的整体加载 */
// circle.js

export function area(radius) {
    return Math.PI * radius * radius;
  }
  
  export function circumference(radius) {
    return 2 * Math.PI * radius;
  }
//   现在，加载这个模块。
  
  // main.js
  
  import { area, circumference } from './circle';
  
  console.log('圆面积：' + area(4));
  console.log('圆周长：' + circumference(14));
//   上面写法是逐一指定要加载的方法，整体加载的写法如下。
  
  import * as circle from './circle';
  
  console.log('圆面积：' + circle.area(4));
  console.log('圆周长：' + circle.circumference(14));





  /* 6 export default命令 */
//   export default命令，为模块指定默认输出。
  // export-default.js
  export default function () {
    console.log('foo');
  }
  // 或者写成
function foo() {
    console.log('foo');
  }
  
  export default foo;


// import-default.js
import customName from './export-default';
customName(); // 'foo'



/* 7 export与import的复合用法 */
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };



/* 8 模块的继承 */

// circleplus.js
export * from 'circle'; //*表示 输出circle模块的所有属性和方法
export var e = 2.71828182846;
export default function(x) {
  return Math.exp(x);
}


// 也可以将circle的属性或方法，改名后再输出。
// circleplus.js
export { area as circleArea } from 'circle';


// main.js
import * as math from 'circleplus';
import exp from 'circleplus';
console.log(exp(math.e));




/* 9 跨模块常量 */

// constants.js 模块
export const A = 1;
export const B = 3;
export const C = 4;

// test1.js 模块
import * as constants from './constants';
console.log(constants.A); // 1
console.log(constants.B); // 3

// test2.js 模块
import {A, B} from './constants';
console.log(A); // 1
console.log(B); // 3



// constants/db.js
export const db = {
    url: 'http://my.couchdbserver.local:5984',
    admin_username: 'admin',
    admin_password: 'admin password'
  };
  
  // constants/user.js
  export const users = ['root', 'admin', 'staff', 'ceo', 'chief', 'moderator'];

//   将这些文件输出的常量，合并在index.js里面。

  // constants/index.js
  export {db} from './db';
  export {users} from './users';
//   使用的时候，直接加载index.js就可以了。
  
  // script.js
  import {db, users} from './constants/index';





/* 10 import */

// import()返回一个 Promise 对象。下面是一个例子。

const main = document.querySelector('main');

import(`./section-modules/${someVariable}.js`)
  .then(module => {
    module.loadPageInto(main);
  })
  .catch(err => {
    main.textContent = err.message;
  });




//   如果想同时加载多个模块，可以采用下面的写法。

  Promise.all([
    import('./module1.js'),
    import('./module2.js'),
    import('./module3.js'),
  ])
  .then(([module1, module2, module3]) => {
    //  ···
  });












































































