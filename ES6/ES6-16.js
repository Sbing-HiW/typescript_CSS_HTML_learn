/* Iterator和for...of循环 */

/* 1 Iterator遍历器的概念 */
// 为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}


// interface Iterable {
//     [Symbol.iterator]() : Iterator,
//   }
  
//   interface Iterator {
//     next(value?: any) : IterationResult,
//   }
  
//   interface IterationResult {
//     value: any,
//     done: boolean,
//   }



/* 2 默认Iterator接口 */

const obj = {
    [Symbol.iterator] : function () {
      return {
        next: function () {
          return {
            value: 1,
            done: true
          };
        }
      };
    }
  };


  let arr = ['a', 'b', 'c'];
  let iter = arr[Symbol.iterator]();
  
  iter.next() // { value: 'a', done: false }
  iter.next() // { value: 'b', done: false }
  iter.next() // { value: 'c', done: false }
  iter.next() // { value: undefined, done: true }



  function Obj(value) {
    this.value = value;
    this.next = null;
  }
  
  Obj.prototype[Symbol.iterator] = function() {
    var iterator = { next: next };
  
    var current = this;
  
    function next() {
      if (current) {
        var value = current.value;
        current = current.next;
        return { done: false, value: value };
      } else {
        return { done: true };
      }
    }
    return iterator;
  }
  
  var one = new Obj(1);
  var two = new Obj(2);
  var three = new Obj(3);
  
  one.next = two;
  two.next = three;
  
  for (var i of one){
    console.log(i); // 1, 2, 3
  }




/* 3 调用Iterator 接口的场合 */

// 1 解构赋值
// 对数组和Set结构进行赋值时默认使用Symbol.iterator方法
let set = new Set().add('a').add('b').add('c');

let [x,y] = set;
// x='a'; y='b'

let [first, ...rest] = set;
// first='a'; rest=['b','c'];

// 2 扩展运算符
// 例一
var str = 'hello';
[...str] //  ['h','e','l','l','o']

// 例二
let arr = ['b', 'c'];
['a', ...arr, 'd']
// ['a', 'b', 'c', 'd']

// 3 yield*

// yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
let generator = function* () {
    yield 1;
    yield* [2,3,4];
    yield 5;
  };
  
  var iterator = generator();
  
  iterator.next() // { value: 1, done: false }
  iterator.next() // { value: 2, done: false }
  iterator.next() // { value: 3, done: false }
  iterator.next() // { value: 4, done: false }
  iterator.next() // { value: 5, done: false }
  iterator.next() // { value: undefined, done: true }

//   4 其他场合
// 由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。

// for...of
// Array.from()
// Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
// Promise.all()
// Promise.race()




/* 4 字符串的Iterator接口 */
var someString = "hi";
typeof someString[Symbol.iterator]
// "function"

var iterator = someString[Symbol.iterator]();

iterator.next()  // { value: "h", done: false }
iterator.next()  // { value: "i", done: false }
iterator.next()  // { value: undefined, done: true }




var str = new String("hi");

[...str] // ["h", "i"]

str[Symbol.iterator] = function() {
  return {
    next: function() {
      if (this._first) {
        this._first = false;
        return { value: "bye", done: false };
      } else {
        return { done: true };
      }
    },
    _first: true
  };
};

[...str] // ["bye"]
str // "hi"



/* 5 Iterator接口与Generator函数 */

// let myIterable = {
//     [Symbol.iterator]: function* () {
//       yield 1;
//       yield 2;
//       yield 3;
//     }
//   }
//   [...myIterable] // [1, 2, 3]
  
//   // 或者采用下面的简洁写法
  
//   let obj = {
//     * [Symbol.iterator]() {
//       yield 'hello';
//       yield 'world';
//     }
//   };
  
//   for (let x of obj) {
//     console.log(x);
//   }
  // "hello"
  // "world"




/* 6 遍历对象的return() throw() */
function readLinesSync(file) {
    return {
      [Symbol.iterator]() {
        return {
          next() {
            return { done: false };
          },
          return() {
            file.close();
            return { done: true };
          }
        };
      },
    };
  }


// 情况一
for (let line of readLinesSync(fileName)) {
    console.log(line);
    break;
  }
  
  // 情况二
  for (let line of readLinesSync(fileName)) {
    console.log(line);
    throw new Error();
  }



/* 7 for...of 循环 */
// 数组
const arr = ['red', 'green', 'blue'];

for(let v of arr) {
  console.log(v); // red green blue
}

const obj = {};
obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);

for(let v of obj) {
  console.log(v); // red green blue
}




var arr = ['a', 'b', 'c', 'd'];

for (let a in arr) {
  console.log(a); // 0 1 2 3
}

for (let a of arr) {
  console.log(a); // a b c d
}



let arr = [3, 5, 7];
arr.foo = 'hello';

for (let i in arr) {
  console.log(i); // "0", "1", "2", "foo"
}

for (let i of arr) {
  console.log(i); //  "3", "5", "7"
}



// set和map结构

var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
for (var e of engines) {
  console.log(e);
}
// Gecko
// Trident
// Webkit

var es6 = new Map();
es6.set("edition", 6);
es6.set("committee", "TC39");
es6.set("standard", "ECMA-262");
for (var [name, value] of es6) {
  console.log(name + ": " + value);
}
// edition: 6
// committee: TC39
// standard: ECMA-262


// 计算生成的数据结构

let arr = ['a', 'b', 'c'];
for (let pair of arr.entries()) {
  console.log(pair);
}
// [0, 'a']
// [1, 'b']
// [2, 'c']



// 类似数组的对象
// 字符串
let str = "hello";

for (let s of str) {
  console.log(s); // h e l l o
}

// DOM NodeList对象
let paras = document.querySelectorAll("p");

for (let p of paras) {
  p.classList.add("test");
}

// arguments对象
function printArgs() {
  for (let x of arguments) {
    console.log(x);
  }
}
printArgs('a', 'b');
// 'a'
// 'b'




// 对象
// 对于普通的对象，for...of结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用。
// 但是，这样情况下，for...in循环依然可以用来遍历键名。
let es6 = {
  edition: 6,
  committee: "TC39",
  standard: "ECMA-262"
};

for (let e in es6) {
  console.log(e);
}
// edition
// committee
// standard

for (let e of es6) {
  console.log(e);
}
// TypeError: es6[Symbol.iterator] is not a function



// 与其他遍历语法的比较
for (var n of fibonacci) {
  if (n > 1000)
    break;
  console.log(n);
}
// 上面的例子，会输出斐波纳契数列小于等于 1000 的项。如果当前项大于 1000，就会使用break语句跳出for...of循环。



















