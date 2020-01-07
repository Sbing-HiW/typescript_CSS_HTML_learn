/* Class基本语法 */
/* 1 简介 */

function Point(x, y) {
    this.x = x;
    this.y = y;
  }
  
  Point.prototype.toString = function () {
    return '(' + this.x + ', ' + this.y + ')';
  };
  
  var p = new Point(1, 2);

//   使用Class转换

  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    };
  
    toString() {
      return '(' + this.x + ', ' + this.y + ')';
    };
  }

// 类的数据类型就是函数，类本身就指向构造函数。


// 类的所有方法都定义在类的prototype属性上面。
class Point {
    constructor() {
      // ...
    }
  
    toString() {
      // ...
    }
  
    toValue() {
      // ...
    }
  }
  
  // 等同于
  
  Point.prototype = {
    constructor() {},
    toString() {},
    toValue() {},
  };



// constructor方法

默认添加一个空的constructor方法
class Point {
}

// 等同于
class Point {
  constructor() {}
}



// 类的实例
//定义类
class Point {

    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
  
  }
  
  var point = new Point(2, 3);
  
  point.toString() // (2, 3)
  
  point.hasOwnProperty('x') // true
  point.hasOwnProperty('y') // true
  point.hasOwnProperty('toString') // false  toString是原型对象的属性（因为定义在Point类上）
  point.__proto__.hasOwnProperty('toString') // true




// 取值函数（getter）和存值函数（setter）

class MyClass {
    constructor() {
      // ...
    }
    get prop() {
      return 'getter';
    }
    set prop(value) {
      console.log('setter: '+value);
    }
  }
  
  let inst = new MyClass();
  
  inst.prop = 123;
  // setter: 123
  
  inst.prop
  // 'getter'


//   属性表达式   类的属性名，可以采用表达式。
let methodName = 'getArea';

class Square {
  constructor(length) {
    // ...
  }

  [methodName]() {
    // ...
  }
}


// Class表达式
const MyClass = class Me {
    getClassName() {
      return Me.name;
    }
  };

  let person = new class {
    constructor(name) {
      this.name = name;
    }
  
    sayName() {
      console.log(this.name);
    }
  }('张三');
  
  person.sayName(); // "张三"





/* 2 静态方法 */
class Foo {
    static classMethod() {
      return 'hello';
    }
  }
  
  Foo.classMethod() // 'hello'
  
  var foo = new Foo();
  foo.classMethod()
  // TypeError: foo.classMethod is not a function

// 如果静态方法包含this关键字，这个this指的是类，而不是实例。
class Foo {
  static bar() {
    this.baz();
  }
  static baz() {
    console.log('hello');
  }
  baz() {
    console.log('world');
  }
}
Foo.bar() // hello

// 父类的静态方法，可以被子类继承。
class Foo {
    static classMethod() {
      return 'hello';
    }
  }
  
  class Bar extends Foo {
  }
  
  Bar.classMethod() // 'hello'



  /* 3 实例属性的新写法 */
//   可以定义在类的最顶层。
  class IncreasingCounter {
    constructor() {
      this._count = 0;
    }
    get value() {
      console.log('Getting the current value!');
      return this._count;
    }
    increment() {
      this._count++;
    }
  }

  class IncreasingCounter {
    _count = 0;
    get value() {
      console.log('Getting the current value!');
      return this._count;
    }
    increment() {
      this._count++;
    }
  }
//   上面代码中，实例属性_count与取值函数value()和increment()方法，处于同一个层级。这时，不需要在实例属性前面加上this。

class foo {
    bar = 'hello';
    baz = 'world';
  
    constructor() {
      // ...
    }
  }
//   上面的代码，一眼就能看出，foo类有两个实例属性，一目了然。另外，写起来也比较简洁。






/* 4 静态属性 */
// 静态属性指的是 Class 本身的属性，即Class.propName，而不是定义在实例对象（this）上的属性。
class Foo {
}

Foo.prop = 1; //为Foo类定义了一个静态属性prop。
Foo.prop // 1


class MyClass {
    static myStaticProp = 42;
  
    constructor() {
      console.log(MyClass.myStaticProp); // 42
    }
  }


  /* 5 私有方法和私有属性 */
// 私有方法和私有属性，是只能在类的内部访问的方法和属性，外部不能访问

// 提案 私有属性
// class IncreasingCounter {
//     #count = 0;
//     get value() {
//       console.log('Getting the current value!');
//       return this.#count;
//     }
//     increment() {
//       this.#count++;
//     }
//   }

// 提案 私有方法
// class Foo {
//     #a;
//     #b;
//     constructor(a, b) {
//       this.#a = a;
//       this.#b = b;
//     }
//     #sum() {
//       return #a + #b;
//     }
//     printSum() {
//       console.log(this.#sum());
//     }
//   }


/* 6 new.target属性 */
// 返回new命令作用于的那个构造函数

function Person(name) {
    if (new.target !== undefined) {
      this.name = name;
    } else {
      throw new Error('必须使用 new 命令生成实例');
    }
  }
  
  // 另一种写法
  function Person(name) {
    if (new.target === Person) {
      this.name = name;
    } else {
      throw new Error('必须使用 new 命令生成实例');
    }
  }
  
  var person = new Person('张三'); // 正确
  var notAPerson = Person.call(person, '张三');  // 报错


//   Class 内部调用new.target，返回当前 Class。

  class Rectangle {
    constructor(length, width) {
      console.log(new.target === Rectangle);
      this.length = length;
      this.width = width;
    }
  }
  
  var obj = new Rectangle(3, 4); // 输出 true
//   需要注意的是，子类继承父类时，new.target会返回子类。
  
  class Rectangle {
    constructor(length, width) {
      console.log(new.target === Rectangle);
      // ...
    }
  }
  
  class Square extends Rectangle {
    constructor(length) {
      super(length, width);
    }
  }
  
  var obj = new Square(3); // 输出 false



//   利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。

class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确

















