/* Class的继承 */
/* 1 简介 */
// Class 可以通过extends关键字实现继承
class Point {
}

class ColorPoint extends Point {
    constructor(x, y, color) {
        super(x, y); // 调用父类的constructor(x, y)
        this.color = color;
      }
    
      toString() {
        return this.color + ' ' + super.toString(); // 调用父类的toString()
      }
}
// super关键字，它在这里表示父类的构造函数，用来新建父类的this对象。
// 子类必须在constructor方法中调用super方法，否则新建实例时会报错。



// 在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。
// 这是因为子类实例的构建，基于父类实例，只有super方法才能调用父类实例。

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color; // ReferenceError
    super(x, y);
    this.color = color; // 正确
  }
}


// 父类的静态方法，也会被子类继承。

class A {
  static hello() {
    console.log('hello world');
  }
}

class B extends A {
}

B.hello()  // hello world
// 上面代码中，hello()是A类的静态方法，B继承A，也继承了A的静态方法。





/* 2 Object.getPrototypeOf() */
// 从子类上获取父类   判断一个类是否继承了另一个类
Object.getPrototypeOf(ColorPoint) === Point
// true


/* 3 super关键字 */
// 1 作为函数调用  代表父类的构造函数  规定子类的构造函数必须执行一次super函数
class A {}

class B extends A {
  constructor() {
    super(); //super内部的this指的是B的实例
  }
}




// 2 作为对像时，  普通方法指向父类的原型对象   静态方法指向父类

class A {
    p() {
      return 2;
    }
  }
  
  class B extends A {
    constructor() {
      super();
      console.log(super.p()); // 2
    }
  }
  
  let b = new B();




// 普通方法 父类的原型对象。

  class A {
    constructor() {
      this.x = 1;
    }
    print() {
      console.log(this.x);
    }
  }
  
  class B extends A {
    constructor() {
      super();
      this.x = 2;
    }
    m() {
      super.print();
    }
  }
  
  let b = new B();
  b.m() // 2
// super.print()虽然调用的是A.prototype.print()，
// 但是A.prototype.print()内部的this指向子类B的实例，导致输出的是2，而不是1。
// 也就是说，实际上执行的是super.print.call(this)。



// 在静态方法之中，这时super将指向父类，而不是父类的原型对象。
// 方法内部的this指向当前的子类，而不是子类的实例。
class Parent {
  static myMethod(msg) {
    console.log('static', msg);
  }

  myMethod(msg) {
    console.log('instance', msg);
  }
}

class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg);
  }

  myMethod(msg) {
    super.myMethod(msg);
  }
}

Child.myMethod(1); // static 1

var child = new Child();
child.myMethod(2); // instance 2




class A {
    constructor() {
      this.x = 1;
    }
    static print() {
      console.log(this.x);
    }
  }
  
  class B extends A {
    constructor() {
      super();
      this.x = 2;
    }
    static m() {
      super.print();
    }
  }
  
  B.x = 3;
  B.m() // 3




  /* 4 类的prototype属性和__proto__属性 */

//   （1）子类的__proto__属性，表示构造函数的继承，总是指向父类。

//   （2）子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。

class A {
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true



// 子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。也就是说，子类的原型的原型，是父类的原型。

var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');

p2.__proto__ === p1.__proto__ // false
p2.__proto__.__proto__ === p1.__proto__ // true




/* 5 原生构造函数的继承 */

class MyArray extends Array {
    constructor(...args) {
      super(...args);
    }
  }
  
  var arr = new MyArray();
  arr[0] = 12;
  arr.length // 1
  
  arr.length = 0;
  arr[0] // undefined



/* 6 Mixin模式的实现 */

// 多个对象合成一个新的对象，新对象具有各个组成成员的接口

const a = {
    a: 'a'
  };
  const b = {
    b: 'b'
  };
  const c = {...a, ...b}; // {a: 'a', b: 'b'}



  function mix(...mixins) {
    class Mix {
      constructor() {
        for (let mixin of mixins) {
          copyProperties(this, new mixin()); // 拷贝实例属性
        }
      }
    }
  
    for (let mixin of mixins) {
      copyProperties(Mix, mixin); // 拷贝静态属性
      copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
    }
  
    return Mix;
  }
  
  function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
      if ( key !== 'constructor'
        && key !== 'prototype'
        && key !== 'name'
      ) {
        let desc = Object.getOwnPropertyDescriptor(source, key);
        Object.defineProperty(target, key, desc);
      }
    }
  }
//   上面代码的mix函数，可以将多个对象合成为一个类。使用的时候，只要继承这个类即可。
  
  class DistributedEdit extends mix(Loggable, Serializable) {
    // ...
  }
















































































