/* 变量的解构赋值 */
/* 1 数组的解构赋值  ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构 */
// 1.1 基本用法
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ["foo", "bar", "baz"];
third // "baz"

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []

// 1.2 默认值 ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。
let [x = 1] = [undefined];
x // 1

let [x = 1] = [null]; //null不严格等于undefined。
x // null

// 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
let [x = 1, y = x] = [];     // x=1; y=1
let [x = 1, y = x] = [2];    // x=2; y=2
let [x = 1, y = x] = [1, 2]; // x=1; y=2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined  y未声明

/* 2 对象的解构赋值 */
// 2.1 基本用法   变量必须与属性同名，才能取到正确的值。
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined   如果解构失败，变量的值等于undefined。


// 将现有对象的方法，赋值到某个变量
// 例一
let { log, sin, cos } = Math;

// 例二
const { log } = console;
log('hello') // hello

// 如果变量名与属性名不一致，必须写成下面这样。
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'


// 嵌套解构
let obj = {
    p: [
      'Hello',
      { y: 'World' }
    ]
  };
  
  let { p, p: [x, { y }] } = obj;
  x // "Hello"
  y // "World"
  p // ["Hello", {y: "World"}]

  const node = {
    loc: {
      start: {
        line: 1,
        column: 5
      }
    }
  };
  
  let { loc, loc: { start }, loc: { start: { line }} } = node;
  line // 1
  loc  // Object {start: Object}
  start // Object {line: 1, column: 5}。


const obj1 = {};
const obj2 = { foo: 'bar' };
Object.setPrototypeOf(obj1, obj2);

const { foo } = obj1;
foo // "bar"
// 上面代码中，对象obj1的原型对象是obj2。foo属性不是obj1自身的属性，而是继承自obj2的属性，解构赋值可以取到这个属性。

// 2.2 默认值 
var {x = 3} = {};
x // 3

var {x, y = 5} = {x: 1};
x // 1
y // 5

var {x: y = 3} = {};
y // 3

var {x: y = 3} = {x: 5};
y // 5

var { message: msg = 'Something went wrong' } = {};
msg // "Something went wrong"

// 默认值生效的条件是，对象的属性值严格等于undefined。

var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null

// 2.3  注意
// 2.3.1 如果要将一个已经声明的变量用于解构赋值，必须非常小心。
// 错误的写法
// let x;
// {x} = {x: 1};
// SyntaxError: syntax error
// 正确的写法
let x;
({x} = {x: 1});

// 2.3.2 解构赋值允许等号左边的模式之中，不放置任何变量名
({} = [true, false]);
({} = 'abc');
({} = []);

// 2.3.3 由于数组本质是特殊的对象 可以对数组进行对象属性的解构。
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;
first // 1
last // 3


/* 3 字符串的解构赋值 */
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"

//  数组的对象都有一个length属性，因此还可以对这个属性解构赋值。
let {length : len} = 'hello';
len // 5

/* 4 数值和布尔值的解构赋值 */
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
// 数值和布尔值的包装对象都有toString属性，因此变量s都能取到值。
// 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。
// 由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
let { prop: x } = undefined; // TypeError
let { prop: y } = null; // TypeError

/* 5 函数参数的解构赋值 */
function add([x, y]){
    return x + y;
  }
  
add([1, 2]); // 3

[[1, 2], [3, 4]].map(([a, b]) => a + b);
// [ 3, 7 ]

// 默认值
function move({x = 0, y = 0} = {}) {
    return [x, y];
  }
  
  move({x: 3, y: 8}); // [3, 8]
  move({x: 3}); // [3, 0]
  move({}); // [0, 0]
  move(); // [0, 0]

  function move({x, y} = { x: 0, y: 0 }) {
    return [x, y];
  }
  
  move({x: 3, y: 8}); // [3, 8]
  move({x: 3}); // [3, undefined]
  move({}); // [undefined, undefined]
  move(); // [0, 0]


/* 6 圆括号问题 */
// 6.1 不能使用圆括号的解构赋值
// 6.1.1 变量声明语句 


/* 7 用途  */
// 7.1 交换变量的值
let x = 1;
let y = 2;

[x, y] = [y, x];

// 7.2 从函数返回多个值
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();

// 7.3 函数参数的定义
// 参数是一组有次序的值
function f([x, y, z]) {  }
f([1, 2, 3]);

// 参数是一组无次序的值
function f({x, y, z}) {  }
f({z: 3, y: 2, x: 1});

// 7.4 提取JSON数据
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number);
// 42, "OK", [867, 5309]

// 7.5 函数参数的默认值
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};

// 7.6 遍历 Map 结构
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world

// 7.7 输入模块的指定方法
const { SourceMapConsumer, SourceNode } = require("source-map");
