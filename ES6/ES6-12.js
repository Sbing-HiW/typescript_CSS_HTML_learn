/* Set和Map数据结构 */
/* 1 Set */
// 它类似于数组，但是成员的值都是唯一的，没有重复的值。
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 2 3 5 4


// 例一
const set = new Set([1, 2, 3, 4, 4]);
[...set]
// [1, 2, 3, 4]

// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

// 例三
const set = new Set(document.querySelectorAll('div'));
set.size // 56

// 类似于
const set = new Set();
document
 .querySelectorAll('div')
 .forEach(div => set.add(div));
set.size // 56


// Set 结构的实例有以下属性。

// Set.prototype.constructor：构造函数，默认就是Set函数。
// Set.prototype.size：返回Set实例的成员总数。
// Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。

// Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
// Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
// Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
// Set.prototype.clear()：清除所有成员，没有返回值。


s.add(1).add(2).add(2);
// 注意2被加入了两次

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false

// Set.prototype.keys()：返回键名的遍历器
// Set.prototype.values()：返回键值的遍历器
// Set.prototype.entries()：返回键值对的遍历器
// Set.prototype.forEach()：使用回调函数遍历每个成员

let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]


let set = new Set([1, 4, 9]);
set.forEach((value, key) => console.log(key + ' : ' + value))
// 1 : 1
// 4 : 4
// 9 : 9


let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}


// 方法一
let set = new Set([1, 2, 3]);
set = new Set([...set].map(val => val * 2));
// set的值是2, 4, 6

// 方法二
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set的值是2, 4, 6



/* 2 WeakSet */
// 不重复的值的集合  成员只能是对象，而不能是其他类型的值。
const ws = new WeakSet();
ws.add(1)
// TypeError: Invalid value used in weak set
ws.add(Symbol())
// TypeError: invalid value used in weak set


// 语法
const ws = new WeakSet();


const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}



// WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
// WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
// WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在 WeakSet 实例之中。

const ws = new WeakSet();
const obj = {};
const foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo);    // false

ws.delete(window);
ws.has(window);    // false

// WeakSet 不能遍历




/* 3 Map  */
// 它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false


const map = new Map([
    ['name', '张三'],
    ['title', 'Author']
  ]);
  
  map.size // 2
  map.has('name') // true
  map.get('name') // "张三"
  map.has('title') // true
  map.get('title') // "Author"



const map = new Map();

const k1 = ['a'];
const k2 = ['a'];

map
.set(k1, 111)
.set(k2, 222);

map.get(k1) // 111
map.get(k2) // 222


// 1 属性和操作方法
// size属性 size属性返回 Map 结构的成员总数。
const map = new Map();
map.set('foo', true);
map.set('bar', false);
map.size // 2

// 2 Map.prototypr.set(key,value)
// set方法设置键名key对应的键值为value，然后返回整个 Map 结构。
// 如果key已经有值，则键值会被更新，否则就新生成该键。
const m = new Map();

m.set('edition', 6)        // 键是字符串
m.set(262, 'standard')     // 键是数值
m.set(undefined, 'nah')    // 键是 undefined

// 3 Map.prototype.get(key)
// get方法读取key对应的键值，如果找不到key，返回undefined。
const m = new Map();

const hello = function() {console.log('hello');};
m.set(hello, 'Hello ES6!') // 键是函数

m.get(hello)  // Hello ES6!

// 4 Map.prototype.has(key)
// 返回一个布尔值，表示某个键是否在当前 Map 对象之中。
const m = new Map();

m.set('edition', 6);
m.set(262, 'standard');
m.set(undefined, 'nah');

m.has('edition')     // true
m.has('years')       // false
m.has(262)           // true
m.has(undefined)     // true


// 5 Map.prototype.delete(key)
// delete方法删除某个键，返回true。如果删除失败，返回false。
const m = new Map();
m.set(undefined, 'nah');
m.has(undefined)     // true

m.delete(undefined)
m.has(undefined)       // false


// 6 Map.prototype.clear()
// 清除所有成员，没有返回值。
let map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
map.clear()
map.size // 0



// Map.prototype.keys()：返回键名的遍历器。
// Map.prototype.values()：返回键值的遍历器。
// Map.prototype.entries()：返回所有成员的遍历器。
// Map.prototype.forEach()：遍历 Map 的所有成员。
const map = new Map([
    ['F', 'no'],
    ['T',  'yes'],
  ]);
  
  for (let key of map.keys()) {
    console.log(key);
  }
  // "F"
  // "T"
  
  for (let value of map.values()) {
    console.log(value);
  }
  // "no"
  // "yes"
  
  for (let item of map.entries()) {
    console.log(item[0], item[1]);
  }
  // "F" "no"
  // "T" "yes"
  
  // 或者
  for (let [key, value] of map.entries()) {
    console.log(key, value);
  }
  // "F" "no"
  // "T" "yes"
  
  // 等同于使用map.entries()
  for (let [key, value] of map) {
    console.log(key, value);
  }
  // "F" "no"
  // "T" "yes"




// 与其他数据结构的互相转换
// 1 map转为数组
// 使用扩展运算符（...）
const myMap = new Map()
  .set(true, 7)
  .set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]

// 2 数组转为map
// 将数组传入 Map 构造函数，就可以转为 Map。
new Map([
    [true, 7],
    [{foo: 3}, ['abc']]
  ])
  // Map {
  //   true => 7,
  //   Object {foo: 3} => ['abc']
  // }

// 3 map转为对象
// 如果所有 Map 的键都是字符串，它可以无损地转为对象。
function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
      obj[k] = v;
    }
    return obj;
  }
  
  const myMap = new Map()
    .set('yes', true)
    .set('no', false);
  strMapToObj(myMap)
  // { yes: true, no: false }

// 4 对象转为map
function objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
      strMap.set(k, obj[k]);
    }
    return strMap;
  }
  
  objToStrMap({yes: true, no: false})
  // Map {"yes" => true, "no" => false}


// 5 map转为json
// 一种情况是，Map 的键名都是字符串，这时可以选择转为对象 JSON。
function strMapToJson(strMap) {
    return JSON.stringify(strMapToObj(strMap));
  }
  
  let myMap = new Map().set('yes', true).set('no', false);
  strMapToJson(myMap)
  // '{"yes":true,"no":false}'
// 一种情况是，Map 的键名有非字符串，这时可以选择转为数组 JSON。
function mapToArrayJson(map) {
    return JSON.stringify([...map]);
  }
  
  let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
  mapToArrayJson(myMap)
  // '[[true,7],[{"foo":3},["abc"]]]'


//   6 json转为map
// 正常情况下，所有键名都是字符串。
function jsonToStrMap(jsonStr) {
    return objToStrMap(JSON.parse(jsonStr));
  }
  
  jsonToStrMap('{"yes": true, "no": false}')
// Map {'yes' => true, 'no' => false}

//  有一种特殊情况，整个 JSON 就是一个数组，且每个数组成员本身，又是一个有两个成员的数组。这时，它可以一一对应地转为 Map。这往往是 Map 转为数组 JSON 的逆操作。
function jsonToMap(jsonStr) {
    return new Map(JSON.parse(jsonStr));
  }
  
  jsonToMap('[[true,7],[{"foo":3},["abc"]]]')
  // Map {true => 7, Object {foo: 3} => ['abc']}



/* 4 WeakMap */
// WeakMap结构与Map结构类似，也是用于生成键值对的集合。
// WeakMap 可以使用 set 方法添加成员
const wm1 = new WeakMap();
const key = {foo: 1};
wm1.set(key, 2);
wm1.get(key) // 2

// WeakMap 也可以接受一个数组，
// 作为构造函数的参数
const k1 = [1, 2, 3];
const k2 = [4, 5, 6];
const wm2 = new WeakMap([[k1, 'foo'], [k2, 'bar']]);
wm2.get(k2) // "bar"

// WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。
const map = new WeakMap();
map.set(1, 2)
// TypeError: 1 is not an object!
map.set(Symbol(), 2)
// TypeError: Invalid value used as weak map key
map.set(null, 2)
// TypeError: Invalid value used as weak map key


// WeakMap的键名所指向的对象，不计入垃圾回收机制。
const e1 = document.getElementById('foo');
const e2 = document.getElementById('bar');
const arr = [
  [e1, 'foo 元素'],
  [e2, 'bar 元素'],
];




const wm = new WeakMap();

const element = document.getElementById('example');

wm.set(element, 'some information');
wm.get(element) // "some information"


// WeakMap的语法
// get()、set()、has()、delete()。


















