/* Symbol */
/* 1 概括 */
// 新的原始数据类型Symbol，表示独一无二的值。
let s = Symbol();

console.log( typeof s)
// "symbol"

let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"



// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();

s1 === s2 // false

// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');

s1 === s2 // false


/* 2 Symbol.prototype.description  */
const sym = Symbol('foo');

sym.description // "foo"


/* 3 作为属性名的Symbol */
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"



const log = {};

log.levels = {
  DEBUG: Symbol('debug'),
  INFO: Symbol('info'),
  WARN: Symbol('warn')
};
console.log(log.levels.DEBUG, 'debug message');
console.log(log.levels.INFO, 'info message');


/* 4 消除魔术字符串   在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值  */
function getArea(shape, options) {
    let area = 0;
  
    switch (shape) {
      case 'Triangle': // 魔术字符串
        area = .5 * options.width * options.height;
        break;
      /* ... more code ... */
    }
  
    return area;
  }
  
  getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串

// 常用的消除魔术字符串的方法，就是把它写成一个变量。
  const shapeType = {
    triangle: 'Triangle'
  };
  
  function getArea(shape, options) {
    let area = 0;
    switch (shape) {
      case shapeType.triangle:
        area = .5 * options.width * options.height;
        break;
    }
    return area;
  }
  
  getArea(shapeType.triangle, { width: 100, height: 100 });



/* 5 属性名的遍历 */
const obj = {};
let a = Symbol('a');
let b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

const objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols
// [Symbol(a), Symbol(b)]

// Object.getOwnPropertySymbols方法与for...in循环、Object.getOwnPropertyNames方法进行对比的例子。
const obj = {};

let foo = Symbol("foo");

Object.defineProperty(obj, foo, {
  value: "foobar",
});

for (let i in obj) {
  console.log(i); // 无输出
}

Object.getOwnPropertyNames(obj)
// []

Object.getOwnPropertySymbols(obj)
// [Symbol(foo)]


// Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
let obj = {
    [Symbol('my_key')]: 1,
    enum: 2,
    nonEnum: 3
  };
  
  Reflect.ownKeys(obj)
  //  ["enum", "nonEnum", Symbol(my_key)]





  let size = Symbol('size');

  class Collection {
    constructor() {
      this[size] = 0;
    }
  
    add(item) {
      this[this[size]] = item;
      this[size]++;
    }
  
    static sizeOf(instance) {
      return instance[size];
    }
  }
  
  let x = new Collection();
  Collection.sizeOf(x) // 0
  
  x.add('foo');
  Collection.sizeOf(x) // 1
  
  Object.keys(x) // ['0']
  Object.getOwnPropertyNames(x) // ['0']
  Object.getOwnPropertySymbols(x) // [Symbol(size)]
// 对象x的size属性是一个 Symbol 值，所以Object.keys(x)、Object.getOwnPropertyNames(x)都无法获取它。这就造成了一种非私有的内部方法的效果。




/* 6 Symbol.for() Symbol.keyFor() */

// Symbol.for() 接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。
// 如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');
s1 === s2 // true

Symbol.for("bar") === Symbol.for("bar")
// true
Symbol("bar") === Symbol("bar")
// false


// Symbol.keyFor方法返回一个已登记的 Symbol 类型值的key。
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined


/* 7 模块的Singleten模式 */
// Singleton 模式指的是调用一个类，任何时候返回的都是同一个实例。
// mod.js
const FOO_KEY = Symbol.for('foo');
function A() {
  this.foo = 'hello';
}
if (!global[FOO_KEY]) {
  global[FOO_KEY] = new A();
}
module.exports = global[FOO_KEY];


global[Symbol.for('foo')] = { foo: 'world' };

const a = require('./mod.js');



/* 8 内置的Symbol值 */

// 8.1 Symbol.hasInstance 
// 当其他对象使用instanceof运算符，判断是否为该对象的实例时，会调用这个方法。
class MyClass {
    [Symbol.hasInstance](foo) {
      return foo instanceof Array;
    }
  }
  
  [1, 2, 3] instanceof new MyClass() // true

// 8.2 Symbol.isConcatSpreadable 
// 布尔值 表示该对象用于Array.prototype.concat()时，是否可以展开。
// 数组的默认行为是可以展开
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined

let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']


// 类似数组的对象正好相反，默认不展开
let obj = {length: 2, 0: 'c', 1: 'd'};
['a', 'b'].concat(obj, 'e') // ['a', 'b', obj, 'e']

obj[Symbol.isConcatSpreadable] = true;
['a', 'b'].concat(obj, 'e') // ['a', 'b', 'c', 'd', 'e']


// 8.3 Symbol.species
// 指向一个构造函数。创建衍生对象时，会使用该属性。
class MyArray extends Array {
    static get [Symbol.species]() { return Array; }
}

const a = new MyArray(1, 2, 3);
const b = a.map(x => x);
const c = a.filter(x => x > 1);

b instanceof MyArray // true
c instanceof MyArray // true


// 8.4 Symbol.match
// 指向一个函数。当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值。
String.prototype.match(regexp)
// 等同于
regexp[Symbol.match](this)

class MyMatcher {
  [Symbol.match](string) {
    return 'hello world'.indexOf(string);
  }
}

'e'.match(new MyMatcher()) // 1



// 8.5 Symbol.replace
// 指向一个方法，当该对象被String.prototype.replace方法调用时，会返回该方法的返回值。
String.prototype.replace(searchValue, replaceValue)
// 等同于
searchValue[Symbol.replace](this, replaceValue)



// 8.6 Symbol.search
// 指向一个方法，当该对象被String.prototype.search方法调用时，会返回该方法的返回值。
String.prototype.search(regexp)
// 等同于
regexp[Symbol.search](this)

class MySearch {
  constructor(value) {
    this.value = value;
  }
  [Symbol.search](string) {
    return string.indexOf(this.value);
  }
}
'foobar'.search(new MySearch('foo')) // 0



// 8.7 Symbol.split
// 指向一个方法，当该对象被String.prototype.split方法调用时，会返回该方法的返回值。
String.prototype.split(separator, limit)
// 等同于
separator[Symbol.split](this, limit)


// 8.8 Symbol.iterator
// 指向该对象的默认遍历器方法。
const myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]



class Collection {
    *[Symbol.iterator]() {
      let i = 0;
      while(this[i] !== undefined) {
        yield this[i];
        ++i;
      }
    }
  }
  
  let myCollection = new Collection();
  myCollection[0] = 1;
  myCollection[1] = 2;
  
  for(let value of myCollection) {
    console.log(value);
  }
  // 1
  // 2


// 8.9 Symbol.toPrimitive
// 指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。
// Number：该场合需要转成数值
// String：该场合需要转成字符串
// Default：该场合可以转成数值，也可以转成字符串
let obj = {
  [Symbol.toPrimitive](hint) {
    switch (hint) {
      case 'number':
        return 123;
      case 'string':
        return 'str';
      case 'default':
        return 'default';
      default:
        throw new Error();
     }
   }
};

2 * obj // 246
3 + obj // '3default'
obj == 'default' // true
String(obj) // 'str'



// 8.10 Symbol.toStringTag
// 指向一个方法。在该对象上面调用Object.prototype.toString方法时，如果这个属性存在，
// 它的返回值会出现在toString方法返回的字符串之中，表示对象的类型。
// 也就是说，这个属性可以用来定制[object Object]或[object Array]中object后面的那个字符串。
// 例一
({[Symbol.toStringTag]: 'Foo'}.toString())
// "[object Foo]"

// 例二
class Collection {
  get [Symbol.toStringTag]() {
    return 'xxx';
  }
}
let x = new Collection();
Object.prototype.toString.call(x) // "[object xxx]"



// 8.11 Symbol.unsocpables
// 指向一个对象。该对象指定了使用with关键字时，哪些属性会被with环境排除。
Array.prototype[Symbol.unscopables]
// {
//   copyWithin: true,
//   entries: true,
//   fill: true,
//   find: true,
//   findIndex: true,
//   includes: true,
//   keys: true
// }

Object.keys(Array.prototype[Symbol.unscopables])
// ['copyWithin', 'entries', 'fill', 'find', 'findIndex', 'includes', 'keys']




// 没有 unscopables 时
class MyClass {
    foo() { return 1; }
  }
  
  var foo = function () { return 2; };
  
  with (MyClass.prototype) {
    foo(); // 1
  }
  
  // 有 unscopables 时
  class MyClass {
    foo() { return 1; }
    get [Symbol.unscopables]() {
      return { foo: true };
    }
  }
  
  var foo = function () { return 2; };
  
  with (MyClass.prototype) {
    foo(); // 2
  }











