/* Reflect */
/* 1 概括 */
// 1 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。
// 2 修改某些Object方法的返回结果，让其变得更合理

// 老写法
try {
    Object.defineProperty(target, property, attributes);
    // success
  } catch (e) {
    // failure
  }
  
  // 新写法
  if (Reflect.defineProperty(target, property, attributes)) {
    // success
  } else {
    // failure
  }

// 3 让Object操作都变成函数行为。
// 老写法
'assign' in Object // true
// 新写法
Reflect.has(Object, 'assign') // true

// 4 Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法
Proxy(target, {
    set: function(target, name, value, receiver) {
      var success = Reflect.set(target, name, value, receiver);
      if (success) {
        console.log('property ' + name + ' on ' + target + ' set to ' + value);
      }
      return success;
    }
  });


  // 老写法
Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1

// 新写法
Reflect.apply(Math.floor, undefined, [1.75]) // 1





/* 2 静态方法 */
// 1 查找并返回target对象的name属性，如果没有该属性，则返回undefined。
Reflect.get(target, name, receiver)

var myObject = {
    foo: 1,
    bar: 2,
    get baz() {
      return this.foo + this.bar;
    },
  }
  
  Reflect.get(myObject, 'foo') // 1
  Reflect.get(myObject, 'bar') // 2
  Reflect.get(myObject, 'baz') // 3

 
// 2 设置target对象的name属性等于value。
Reflect.set(target, name, value, receiver)

var myObject = {
    foo: 1,
    set bar(value) {
      return this.foo = value;
    },
  }
  
  myObject.foo // 1
  
  Reflect.set(myObject, 'foo', 2);
  myObject.foo // 2
  
  Reflect.set(myObject, 'bar', 3)
  myObject.foo // 3


// 3 等同于new target(...args)，这提供了一种不使用new，来调用构造函数的方法。
Reflect.construct(target, args)

function Greeting(name) {
    this.name = name;
  }
  
  // new 的写法
  const instance = new Greeting('张三');
  
  // Reflect.construct 的写法
  const instance = Reflect.construct(Greeting, ['张三']);


// 4 等同于Function.prototype.apply.call(func, thisArg, args)，用于绑定this对象后执行给定函数。
Reflect.apply(target, thisArg, args)

const ages = [11, 33, 12, 54, 18, 96];

// 旧写法
const youngest = Math.min.apply(Math, ages);
const oldest = Math.max.apply(Math, ages);
const type = Object.prototype.toString.call(youngest);

// 新写法
const youngest = Reflect.apply(Math.min, Math, ages);
const oldest = Reflect.apply(Math.max, Math, ages);
const type = Reflect.apply(Object.prototype.toString, youngest, []);




// 5 基本等同于Object.defineProperty，用来为对象定义属性
Reflect.defineProperty(target, name, desc)

function MyDate() {
    /*…*/
  }
  
  // 旧写法
  Object.defineProperty(MyDate, 'now', {
    value: () => Date.now()
  });
  
  // 新写法
  Reflect.defineProperty(MyDate, 'now', {
    value: () => Date.now()
  });



// 6 等同于delete obj[name]，用于删除对象的属性。
Reflect.deleteProperty(target, name)

const myObj = { foo: 'bar' };
// 旧写法
delete myObj.foo;
// 新写法
Reflect.deleteProperty(myObj, 'foo');


// 7 对应name in obj里面的in运算符。
Reflect.has(target, name)

var myObject = {
    foo: 1,
  };
  // 旧写法
  'foo' in myObject // true
  // 新写法
  Reflect.has(myObject, 'foo') // true



// 8 用于返回对象的所有属性
Reflect.ownKeys(target)

var myObject = {
    foo: 1,
    bar: 2,
    [Symbol.for('baz')]: 3,
    [Symbol.for('bing')]: 4,
  };
  
  // 旧写法
  Object.getOwnPropertyNames(myObject)
  // ['foo', 'bar']
  
  Object.getOwnPropertySymbols(myObject)
  //[Symbol(baz), Symbol(bing)]
  
  // 新写法
  Reflect.ownKeys(myObject)
  // ['foo', 'bar', Symbol(baz), Symbol(bing)]


// 9 对应Object.isExtensible，返回一个布尔值，表示当前对象是否可扩展。
Reflect.isExtensible(target)

const myObject = {};
// 旧写法
Object.isExtensible(myObject) // true
// 新写法
Reflect.isExtensible(myObject) // true


// 10 对应Object.preventExtensions方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。
Reflect.preventExtensions(target)

var myObject = {};
// 旧写法
Object.preventExtensions(myObject) // Object {}
// 新写法
Reflect.preventExtensions(myObject) // true



// 11 等同于Object.getOwnPropertyDescriptor，用于得到指定属性的描述对象
Reflect.getOwnPropertyDescriptor(target, name)

var myObject = {};
Object.defineProperty(myObject, 'hidden', {
  value: true,
  enumerable: false,
});
// 旧写法
var theDescriptor = Object.getOwnPropertyDescriptor(myObject, 'hidden');
// 新写法
var theDescriptor = Reflect.getOwnPropertyDescriptor(myObject, 'hidden');



// 12 读取对象的__proto__属性，对应Object.getPrototypeOf(obj)。
Reflect.getPrototypeOf(target)

const myObj = new FancyThing();
// 旧写法
Object.getPrototypeOf(myObj) === FancyThing.prototype;
// 新写法
Reflect.getPrototypeOf(myObj) === FancyThing.prototype;


// 13 设置目标对象的原型（prototype），对应Object.setPrototypeOf(obj, newProto)方法。它返回一个布尔值，表示是否设置成功。
Reflect.setPrototypeOf(target, prototype)

const myObj = {};
// 旧写法
Object.setPrototypeOf(myObj, Array.prototype);
// 新写法
Reflect.setPrototypeOf(myObj, Array.prototype);
myObj.length // 0





/* 3 使用Proxy实现观察者模式 */
// 观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行。

const person = observable({
    name: '张三',
    age: 20
  });
  
  function print() {
    console.log(`${person.name}, ${person.age}`)
  }
  
  observe(print);
  person.name = '李四';
  // 输出
  // 李四, 20



  
  const queuedObservers = new Set();

const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, {set});

function set(target, key, value, receiver) {
  const result = Reflect.set(target, key, value, receiver);
  queuedObservers.forEach(observer => observer());
  return result;
}





























