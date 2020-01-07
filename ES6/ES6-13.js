/* Proxy */
/* 1 概括 */
// Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，
// 所以属于一种“元编程”（meta programming），即对编程语言进行编程。
var proxy = new Proxy({}, {
    get: function(target, property) {
      return 35;
    }
  });
  
  proxy.time // 35
  proxy.name // 35
  proxy.title // 35


// get(target, propKey, receiver)：拦截对象属性的读取，比如proxy.foo和proxy['foo']。
// set(target, propKey, value, receiver)：拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
// has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。
// deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值。
// ownKeys(target)：拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
// getOwnPropertyDescriptor(target, propKey)：拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
// defineProperty(target, propKey, propDesc)：拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
// preventExtensions(target)：拦截Object.preventExtensions(proxy)，返回一个布尔值。
// getPrototypeOf(target)：拦截Object.getPrototypeOf(proxy)，返回一个对象。
// isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
// setPrototypeOf(target, proto)：拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
// apply(target, object, args)：拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
// construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。


/* Proxy实例的方法 */
// 1 get()
// get方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。
var person = {
    name: "张三"
  };
  
  var proxy = new Proxy(person, {
    get: function(target, property) {
      if (property in target) {
        return target[property];
      } else {
        throw new ReferenceError("Property \"" + property + "\" does not exist.");
      }
    }
  });
  
  proxy.name // "张三"
  proxy.age // 抛出一个错误


// 2 set()
// set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。
let validator = {
    set: function(obj, prop, value) {
      if (prop === 'age') {
        if (!Number.isInteger(value)) {
          throw new TypeError('The age is not an integer');
        }
        if (value > 200) {
          throw new RangeError('The age seems invalid');
        }
      }
  
      // 对于满足条件的 age 属性以及其他属性，直接保存
      obj[prop] = value;
    }
  };
  
  let person = new Proxy({}, validator);
  
  person.age = 100;
  
  person.age // 100
  person.age = 'young' // 报错
  person.age = 300 // 报错



// 3 apply() 
// apply方法拦截函数的调用、call和apply操作。
// 三个参数，分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。
var target = function () { return 'I am the target'; };
var handler = {
  apply: function () {
    return 'I am the proxy';
  }
};

var p = new Proxy(target, handler);

p()
// "I am the proxy"



// 4 has()  
// 用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。
// has方法可以接受两个参数，分别是目标对象、需查询的属性名。
var handler = {
    has (target, key) {
      if (key[0] === '_') {
        return false;
      }
      return key in target;
    }
  };
  var target = { _prop: 'foo', prop: 'foo' };
  var proxy = new Proxy(target, handler);
  '_prop' in proxy // false



  let stu1 = {name: '张三', score: 59};
  let stu2 = {name: '李四', score: 99};
  
  let handler = {
    has(target, prop) {
      if (prop === 'score' && target[prop] < 60) {
        console.log(`${target.name} 不及格`);
        return false;
      }
      return prop in target;
    }
  }
  
  let oproxy1 = new Proxy(stu1, handler);
  let oproxy2 = new Proxy(stu2, handler);
  
  'score' in oproxy1
  // 张三 不及格
  // false
  
  'score' in oproxy2
  // true
  
  for (let a in oproxy1) {
    console.log(oproxy1[a]);
  }
  // 张三
  // 59
  
  for (let b in oproxy2) {
    console.log(oproxy2[b]);
  }
  // 李四
  // 99


// 5 construct() 
// 用于拦截new命令
var handler = {
    construct (target, args, newTarget) {
      return new target(...args);
    }
  };
// target：目标对象
// args：构造函数的参数对象
// newTarget：创造实例对象时，new命令作用的构造函数（下面例子的p）
var p = new Proxy(function () {}, {
    construct: function(target, args) {
      console.log('called: ' + args.join(', '));
      return { value: args[0] * 10 };
    }
  });
  
  (new p(1)).value
  // "called: 1"
  // 10


// 6 deleteProperty() 
// 方法用于拦截delete操作，如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。
var handler = {
    deleteProperty (target, key) {
      invariant(key, 'delete');
      delete target[key];
      return true;
    }
  };
  function invariant (key, action) {
    if (key[0] === '_') {
      throw new Error(`Invalid attempt to ${action} private "${key}" property`);
    }
  }
  
  var target = { _prop: 'foo' };
  var proxy = new Proxy(target, handler);
  delete proxy._prop
  // Error: Invalid attempt to delete private "_prop" property


// 7 defineProperty() 
// 方法拦截了Object.defineProperty操作。
var handler = {
    defineProperty (target, key, descriptor) {
      return false;
    }
  };
  var target = {};
  var proxy = new Proxy(target, handler);
  proxy.foo = 'bar' // 不会生效



// 8 getOwnPropertyDescriptor() 
// 方法拦截Object.getOwnPropertyDescriptor()，返回一个属性描述对象或者undefined。

var handler = {
    getOwnPropertyDescriptor (target, key) {
      if (key[0] === '_') {
        return;
      }
      return Object.getOwnPropertyDescriptor(target, key);
    }
  };
  var target = { _foo: 'bar', baz: 'tar' };
  var proxy = new Proxy(target, handler);
  Object.getOwnPropertyDescriptor(proxy, 'wat')
  // undefined
  Object.getOwnPropertyDescriptor(proxy, '_foo')
  // undefined
  Object.getOwnPropertyDescriptor(proxy, 'baz')
  // { value: 'tar', writable: true, enumerable: true, configurable: true }



// 9 getPrototypeOf()
// 拦截获取对象原型。
// Object.prototype.__proto__
// Object.prototype.isPrototypeOf()
// Object.getPrototypeOf()
// Reflect.getPrototypeOf()
// instanceof

var proto = {};
var p = new Proxy({}, {
  getPrototypeOf(target) {
    return proto;
  }
});
Object.getPrototypeOf(p) === proto // true



// 10 isExtensible() 
// 拦截Object.isExtensible操作。
var p = new Proxy({}, {
    isExtensible: function(target) {
      console.log("called");
      return true;
    }
  });
  
  Object.isExtensible(p)
  // "called"
  // true


// 11 ownKeys() 
// 拦截对象自身属性的读取操作
// Object.getOwnPropertyNames()
// Object.getOwnPropertySymbols()
// Object.keys()
// for...in循环
let target = {
    a: 1,
    b: 2,
    c: 3
  };
  
  let handler = {
    ownKeys(target) {
      return ['a'];
    }
  };
  
  let proxy = new Proxy(target, handler);
  
  Object.keys(proxy)
  // [ 'a' ]

// 12 preventExtensions() 
// 方法拦截Object.preventExtensions()。该方法必须返回一个布尔值，否则会被自动转为布尔值
// 这个方法有一个限制，只有目标对象不可扩展时（即Object.isExtensible(proxy)为false）
// ，proxy.preventExtensions才能返回true，否则会报错。
var proxy = new Proxy({}, {
    preventExtensions: function(target) {
      console.log('called');
      Object.preventExtensions(target);
      return true;
    }
  });
  
  Object.preventExtensions(proxy)
  // "called"
  // Proxy {}



// 13 setPrototypeOf()
// 用来拦截Object.setPrototypeOf方法。

var handler = {
    setPrototypeOf (target, proto) {
      throw new Error('Changing the prototype is forbidden');
    }
  };
  var proto = {};
  var target = function () {};
  var proxy = new Proxy(target, handler);
  Object.setPrototypeOf(proxy, proto);
  // Error: Changing the prototype is forbidden

/* 3 Proxy.revocable() */
// 返回一个可取消的 Proxy 实例。
let target = {};
let handler = {};

let {proxy, revoke} = Proxy.revocable(target, handler);

proxy.foo = 123;
proxy.foo // 123

revoke();
proxy.foo // TypeError: Revoked


/* 4 this问题 */

// Proxy 代理的情况下，目标对象内部的this关键字会指向 Proxy 代理。
const target = {
    m: function () {
      console.log(this === proxy);
    }
  };
  const handler = {};
  
  const proxy = new Proxy(target, handler);
  
  target.m() // false
  proxy.m()  // true

  const _name = new WeakMap();

class Person {
  constructor(name) {
    _name.set(this, name);
  }
  get name() {
    return _name.get(this);
  }
}

const jane = new Person('Jane');
jane.name // 'Jane'

const proxy = new Proxy(jane, {});
proxy.name // undefined


/* 5 web服务的客户端 */

// Proxy 可以拦截这个对象的任意属性，所以不用为每一种数据写一个适配方法，只要写一个 Proxy 拦截就可以了。


const service = createWebService('http://example.com/data');

service.employees().then(json => {
  const employees = JSON.parse(json);
  // ···
});


function createWebService(baseUrl) {
    return new Proxy({}, {
      get(target, propKey, receiver) {
        return () => httpGet(baseUrl + '/' + propKey);
      }
    });
  }










