/* 对象新增方法 */

/* 1 Object.is() 严格比较运算符（===）的行为基本一致。 */ 
Object.is('foo', 'foo')
// true
Object.is({}, {})
// false

+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true

/* 2 Object.assign() */
// 用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）

const target = { a: 1 };

const source1 = { b: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2); //第一个参数是目标对象，后面的参数都是源对象。
target // {a:1, b:2, c:3}

// 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
const target = { a: 1, b: 1 };

const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}


let obj = {a: 1};
Object.assign(obj, undefined) === obj // true
Object.assign(obj, null) === obj // true


const v1 = 'abc';
const v2 = true;
const v3 = 10;

const obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
// 只有字符串的包装对象，会产生可枚举属性。

Object.assign({b: 'c'},
  Object.defineProperty({}, 'invisible', {
    enumerable: false,
    value: 'hello'
  })
)
// { b: 'c' }


/* 3 Object.getOwnPropertyDescriptore() */
// 返回指定对象所有自身属性（非继承属性）的描述对象。
const obj = {
    foo: 123,
    get bar() { return 'abc' }
  };
  
  console.log( Object.getOwnPropertyDescriptors(obj));
  // { foo:
  //    { value: 123,
  //      writable: true,
  //      enumerable: true,
  //      configurable: true },
  //   bar:
  //    { get: [Function: get bar],
  //      set: undefined,
  //      enumerable: true,
  //      configurable: true } }

//   主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。

  const source = {
    set foo(value) {
      console.log(value);
    }
  };
  
  const target1 = {};
  Object.assign(target1, source);
  
  Object.getOwnPropertyDescriptor(target1, 'foo')
  // { value: undefined,
  //   writable: true,
  //   enumerable: true,
  //   configurable: true }


/* 4  __proto__属性，Object.setPrototypeOf() Object.getPrototypeOf() */
// __proto__属性 用来读取或设置当前对象的prototype对象。
// es5 的写法
// const obj = {
//     method: function() { ... }
//   };
//   obj.__proto__ = someOtherObj;
  
  // es6 的写法
//   var obj = Object.create(someOtherObj);
//   obj.method = function() { ... };


// Object.setPrototypeOf() 用来设置一个对象的prototype对象，返回参数对象本身
// 格式
Object.setPrototypeOf(object, prototype)

// 用法
const o = Object.setPrototypeOf({}, null);



let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);

proto.y = 20;
proto.z = 40;

obj.x // 10
obj.y // 20
obj.z // 40

// Object.getPrototypeOf() 用于读取一个对象的原型对象。

function Rectangle() {
    // ...
  }
  
  const rec = new Rectangle();
  
  Object.getPrototypeOf(rec) === Rectangle.prototype
  // true
  
  Object.setPrototypeOf(rec, Object.prototype);
  Object.getPrototypeOf(rec) === Rectangle.prototype
  // false



/* 5 Object.keys() Object.values() Object.entries() */
// Object.keys() 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。
var obj = { foo: 'bar', baz: 42 };
Object.keys(obj)
// ["foo", "baz"]

let {keys, values, entries} = Object;
let obj = { a: 1, b: 2, c: 3 };

for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}

for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}

for (let [key, value] of entries(obj)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}

//  Object.values() 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。

const obj = { foo: 'bar', baz: 42 };
Object.values(obj)
// ["bar", 42]


// Object.entries() 返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。
const obj = { foo: 'bar', baz: 42 };
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]


/* 6 Object.fromEntries() 用于将一个键值对数组转为对象。 */
Object.fromEntries([
    ['foo', 'bar'],
    ['baz', 42]
  ])
  // { foo: "bar", baz: 42 }


// 例一
const entries = new Map([
    ['foo', 'bar'],
    ['baz', 42]
  ]);
  
  Object.fromEntries(entries)
  // { foo: "bar", baz: 42 }
  
  // 例二
  const map = new Map().set('foo', true).set('bar', false);
  Object.fromEntries(map)
  // { foo: true, bar: false }





