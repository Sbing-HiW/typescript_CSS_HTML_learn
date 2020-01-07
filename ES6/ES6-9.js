/* 对象的扩展 */
/* 1 属性的简洁表示法 */
const foo = 'bar';
const baz = {foo};
baz // {foo: "bar"}

// 等同于
const baz = {foo: foo};

function f(x, y) {
    return {x, y};
  }
  
  // 等同于
  
  function f(x, y) {
    return {x: x, y: y};
  }
  
  f(1, 2) // Object {x: 1, y: 2}


  let user = {
    name: 'test'
  };
  
  let foo = {
    bar: 'baz'
  };
  
  console.log(user, foo)
  // {name: "test"} {bar: "baz"}
  console.log({user, foo})
  // {user: {name: "test"}, foo: {bar: "baz"}}


  /* 2 属性名表达式 */
// 方法一
obj.foo = true;

// 方法二
obj['a' + 'bc'] = 123;



let lastWord = 'last word';

const a = {
  'first word': 'hello',
  [lastWord]: 'world'
};

a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"



/* 3方法的name属性 */
const person = {
    sayName() {
      console.log('hello!');
    },
  };
  
  person.sayName.name   // "sayName"

  const obj = {
    get foo() {},
    set foo(x) {}
  };
  
  obj.foo.name
  // TypeError: Cannot read property 'name' of undefined
  
  const descriptor = Object.getOwnPropertyDescriptor(obj, 'foo');
  
  descriptor.get.name // "get foo"
  descriptor.set.name // "set foo"


//   如果对象的方法是一个 Symbol 值，那么name属性返回的是这个 Symbol 值的描述。
  const key1 = Symbol('description');
  const key2 = Symbol();
  let obj = {
    [key1]() {},
    [key2]() {},
  };
  obj[key1].name // "[description]"
  obj[key2].name // ""
//   上面代码中，key1对应的 Symbol 值有描述，key2没有。
  
  

/* 4 属性的可枚举性和遍历 */

// 可枚举性
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }

// 属性遍历
// （1）for...in

// for...in循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

// （2）Object.keys(obj)

// Object.keys返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

// （3）Object.getOwnPropertyNames(obj)

// Object.getOwnPropertyNames返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

// （4）Object.getOwnPropertySymbols(obj)

// Object.getOwnPropertySymbols返回一个数组，包含对象自身的所有 Symbol 属性的键名。

// （5）Reflect.ownKeys(obj)

// Reflect.ownKeys返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// ['2', '10', 'b', 'a', Symbol()]


/* 5 super关键字   指向当前对象的原型对象。 */
const proto = {
    foo: 'hello'
  };
  
  const obj = {
    foo: 'world',
    find() {
      return super.foo;
    }
  };
  
  Object.setPrototypeOf(obj, proto);
  obj.find() // "hello"



  const proto = {
    x: 'hello',
    foo() {
      console.log(this.x);
    },
  };
  
  const obj = {
    x: 'world',
    foo() {
      super.foo();
    }
  }
  
  Object.setPrototypeOf(obj, proto);
  
  obj.foo() // "world"
//   super.foo指向原型对象proto的foo方法，但是绑定的this却还是当前对象obj，因此输出的就是world。


/* 6 对象的扩展运算符 */

const o = Object.create({ x: 1, y: 2 });
o.z = 3;

let { x, ...newObj } = o;
let { y, z } = newObj;
x // 1
y // undefined
z // 3


// 扩展运算符
// 写法一
const clone1 = {
    __proto__: Object.getPrototypeOf(obj),
    ...obj
  };
  
  // 写法二
  const clone2 = Object.assign(
    Object.create(Object.getPrototypeOf(obj)),
    obj
  );
  
  // 写法三
  const clone3 = Object.create(
    Object.getPrototypeOf(obj),
    Object.getOwnPropertyDescriptors(obj)
  )


  let newVersion = {
    ...previousVersion,
    name: 'New Name' // Override the name property
  };



// 并不会抛出错误，因为 x 属性只是被定义，但没执行
let aWithXGetter = {
    ...a,
    get x() {
      throw new Error('not throw yet');
    }
  };
  
  // 会抛出错误，因为 x 属性被执行了
  let runtimeError = {
    ...a,
    ...{
      get x() {
        throw new Error('throw now');
      }
    }
  };
















