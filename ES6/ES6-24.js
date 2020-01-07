/* 编码风格 */
/* 1 块级作用域 */
// let取代var 

'use strict';

if (true) {
  let x = 'hello';
}

for (let i = 0; i < 10; i++) {
  console.log(i);
}

// 全局常量和线程安全
// 全局环境优先使用const
// 一是阅读代码的人立刻会意识到不应该修改这个值，
// 二是防止了无意间修改变量值所导致的错误。
// bad
var a = 1, b = 2, c = 3;

// good
const a = 1;
const b = 2;
const c = 3;

// best
const [a, b, c] = [1, 2, 3];



/* 2 字符串 */
// 静态字符串一律使用单引号或反引号，不使用双引号。动态字符串使用反引号。
// bad
const a = "foobar";
const b = 'foo' + a + 'bar';

// acceptable
const c = `foobar`;

// good
const a = 'foobar';
const b = `foo${a}bar`;


/* 3 解构赋值 */
// 使用数组成员对变量赋值时，优先使用解构赋值
const arr = [1, 2, 3, 4];

// bad
const first = arr[0];
const second = arr[1];

// good
const [first, second] = arr;


// 函数的参数如果是对象的成员，优先使用解构赋值。

// bad
function getFullName(user) {
    const firstName = user.firstName;
    const lastName = user.lastName;
  }
  
  // good
  function getFullName(obj) {
    const { firstName, lastName } = obj;
  }
  
  // best
  function getFullName({ firstName, lastName }) {
  }




/* 4 对象 */

// 单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，最后一个成员以逗号结尾。

// bad
const a = { k1: v1, k2: v2, };
const b = {
  k1: v1,
  k2: v2
};

// good
const a = { k1: v1, k2: v2 };
const b = {
  k1: v1,
  k2: v2,
};


// 对象尽量静态化，一旦定义，不要随意添加新的属性
// bad
const a = {};
a.x = 3;
// if reshape unavoidable
const a = {};
Object.assign(a, { x: 3 });
// good
const a = { x: null };
a.x = 3;


// 如果对象的属性名是动态的，可以在创造对象的时候，使用属性表达式定义。

// bad
const obj = {
  id: 5,
  name: 'San Francisco',
};
obj[getKey('enabled')] = true;

// good
const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};

// 对象的属性和方法，尽量采用简洁表达法，这样易于描述和书写。

var ref = 'some value';

// bad
const atom = {
  ref: ref,

  value: 1,

  addValue: function (value) {
    return atom.value + value;
  },
};

// good
const atom = {
  ref,

  value: 1,

  addValue(value) {
    return atom.value + value;
  },
};


/* 5 数组 */
// 使用扩展运算符（...）拷贝数组。

// bad
const len = items.length;
const itemsCopy = [];
let i;
for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}
// good
const itemsCopy = [...items];
// 使用 Array.from 方法，将类似数组的对象转为数组。
const foo = document.querySelectorAll('.foo');
const nodes = Array.from(foo);


/* 6 函数 */

// 立刻执行函数可以写成箭头函数的形式
(() => {
    console.log('Welcome to the Internet.');
  })();


// bad
[1, 2, 3].map(function (x) {
  return x * x;
});

// good
[1, 2, 3].map((x) => {
  return x * x;
});

// best
[1, 2, 3].map(x => x * x);
// 箭头函数取代Function.prototype.bind，不应再用 self/_this/that 绑定 this。


// 使用默认值语法设置函数参数的默认值。

// bad
function handleThings(opts) {
  opts = opts || {};
}

// good
function handleThings(opts = {}) {
  // ...
}


/* 7 Map结构 */
// 注意区分 Object 和 Map，只有模拟现实世界的实体对象时，才使用 Object。
// 如果只是需要key: value的数据结构，使用 Map 结构。因为 Map 有内建的遍历机制。

let map = new Map(arr);

for (let key of map.keys()) {
  console.log(key);
}

for (let value of map.values()) {
  console.log(value);
}

for (let item of map.entries()) {
  console.log(item[0], item[1]);
}

/* 8 Class */
// 用 Class，取代需要 prototype 的操作。因为 Class 的写法更简洁，更易于理解。
// bad
function Queue(contents = []) {
    this._queue = [...contents];
  }
  Queue.prototype.pop = function() {
    const value = this._queue[0];
    this._queue.splice(0, 1);
    return value;
  }
  
  // good
  class Queue {
    constructor(contents = []) {
      this._queue = [...contents];
    }
    pop() {
      const value = this._queue[0];
      this._queue.splice(0, 1);
      return value;
    }
  }

//   使用extends实现继承，因为这样更简单，不会有破坏instanceof运算的危险。

  // bad
  const inherits = require('inherits');
  function PeekableQueue(contents) {
    Queue.apply(this, contents);
  }
  inherits(PeekableQueue, Queue);
  PeekableQueue.prototype.peek = function() {
    return this._queue[0];
  }
  
  // good
  class PeekableQueue extends Queue {
    peek() {
      return this._queue[0];
    }
  }


/* 9 模块 */

// Module 语法是 JavaScript 模块的标准写法，坚持使用这种写法。使用import取代require。

// bad
const moduleA = require('moduleA');
const func1 = moduleA.func1;
const func2 = moduleA.func2;

// good
import { func1, func2 } from 'moduleA';

// 使用export取代module.exports。

// commonJS的写法
var React = require('react');

var Breadcrumbs = React.createClass({
  render() {
    return <nav />;
  }
});

module.exports = Breadcrumbs;

// ES6的写法
import React from 'react';

class Breadcrumbs extends React.Component {
  render() {
    return <nav />;
  }
};

export default Breadcrumbs;


























































































