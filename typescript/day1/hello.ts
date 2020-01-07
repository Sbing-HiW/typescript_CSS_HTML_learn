/*2019-9-6  学习typescript第一天*/

/*
第一个打印
*/
console.log("hello");

/*
布尔值类型  boolean
*/
let isDone:boolean = false;
if(!isDone){
    console.log("isDone=false");
}

/*
数值类型  number
*/
let decliteralone:number = 6;//数值类型定义
console.log("decliteralone="+decliteralone);

/*
字符型  string
*/
let myName:string = "雨安晴";
console.log("myNmae:"+myName);

/*
空值  void
*/
let nunsable:void = undefined;
console.log("nunsable ="+nunsable );

/*
Null 和 Undefined
*/
let u :null= null;
let n :undefined = undefined;

let num:number = undefined;

let w :undefined;
let m:number = w;
console.log(u,n,num,w,m)

/*
任意值类型 any
*/
let myFiretName:string = "雨安晴";
//myFiretName = 7;//赋值过程中无法改变类型

let myTwoName : any= "seven";
myTwoName = 7; //类型为any类型可以在赋值时转换类型

/*
任意值的属性和方法//了解即可
*/
// let anyThing: any = 'hello';//了解即可
// console.log(anyThing.myName);
// console.log(anyThing.myName.firstName);

// let anyThing: any = 'Tom'; //允许调用任何方法
// anyThing.setName('Jerry');
// anyThing.setName('Jerry').sayHello();
// anyThing.myName.setFirstName('Cat');

/*
未声明类型变量
*/
let something;//未定义具体类型可赋值为任意类型
something = "some";
something = 1;
something = false;

/*
类型推论  TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。
*/
// let myFavoriteNumber = 'seven';
// myFavoriteNumber = 7;
//等价于
// let myFavoriteNumber: string = 'seven';
// myFavoriteNumber = 7;
//如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：
// let myFavoriteNumber;
// myFavoriteNumber = 'seven';
// myFavoriteNumber = 7;

/* 
联合类型  表示取值可以为多种类型中的一种。
*/
let many: string|number ;//string | number 的含义是，允许 many 的类型是 string 或者 number，但是不能是其他类型。
many = "first";
many = 1;  
//错误赋值
// many  = false;

/*
访问联合类型的属性或方法
*/
// function get1 (somes:string|number):number{
// return somes.length;//只能访问此联合类型的所有类型里共有的属性或方法：
// };

function get2 (somes:string|number):string{
return somes.toString();//共有属性可以访问
};

let somesTwo :string | number;
somesTwo = "Two";
console.log(somesTwo.length);
somesTwo = 1;
//console.log(somesTwo.length)//无法编译 因为类型被推断为number  number中无length属性

/*
对象的类型  -  接口Interfaces：
*/
//定义了接口IOne 定义变量Wom 则Wom的类型就是IOne Wom有IOne的所有属性 并且不能缺少接口里的任意属性   
interface IOne{//
    name : string;
    age : number;
};
let Wom:IOne ={//赋值的时候，变量的形状必须和接口的形状保持一致
   name : "雨安晴",
   age :20   
};
console.log(Wom.age)
// let Mow:IOne ={ //定义的变量必须和接口定义的属性数量相同
//     name :"诗冰"
// }
// let Mom:IOne = {//多一些属性也是不允许的
//     name:"觉",
//     age:18,
//     gender:"male"
// };

//可选属性
interface ITwo{
    name:string;
    age?:number;
};
let Wow:ITwo={//可选属性可以不存在，但仍不允许添加未定义属性
    name:"恋"
};

//任意属性
interface IThree{//接口允许出现任意的属性
    name:string;
    age?:number;
    [Nmae:string]:any;//定义了任意属性取 string 类型的值
};
//一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集：
// interface IFor{
//     name:string;
//     age?:number;//age?:string
//     [NMe:string]:string;//如果已确定类型为string，但是age的值却是 number，number 不是 string 的子属性
// };

//只读属性  用readonly定义只读属性
interface IFire{
    readonly id :number;
    name :string;
    age?:number;
    [Nme:string]:any;
};
let Momone = {
    id:401201,
    name:"雨安晴",
    love:"觉"
};
//Momone.id = 123;//只读属性无法赋值
console.log(Momone.id)

/*
数组的类型 
*/
//【类型+方括号】表示法
let fibon:number[] = [];
let fibonTwo: number[] = [1,3,5];
//let fibonThree :number [] =[1,3,'5']//数组中不允许出现其他的类型
// fibonTwo.push('9')// push 向数组中传入参数（只能传入同类型）
fibonTwo.push(6);
console.log(fibonTwo.length+"*****"+fibonTwo);

//数组泛型  Array<elemType> 来表示数组  
let fibonacci: Array<number> = [1, 1, 2, 3, 5];
//关于泛型后续补充

//接口表示数组   不推荐使用
// interface NumberArray {
//     [index: number]: number;
// };
// let fibonacciTwo: NumberArray = [1, 1, 2, 3, 5];

//类数组 
// function sum(){
//     let args:number [] = arguments
// };
//arguments 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口：
// function sun(){
//     let args:{
//         [index:number]:number;
//         length:number;
//         callee:Function;
//     }=arguments;
// };
// //类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等：
// function sum() {
//     let args: IArguments = arguments;
// };
// interface IArguments {
//     [index: number]: any;
//     length: number;
//     callee: Function;
// };

//any类型数组
let list :any[] = ['觉',18,{website:'http://**.com'}]//数组内参数可以为任意类型
console.log(list);

/*
函数
*/
//函数声明  1.函数声明 2.函数表达式

//1.函数声明
function sun(x:number,y:number):number{
return x+y;
};
console.log( sun(5,6));
//2.函数表达式    => 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。
let sunTwo:(x:number,y:number)=>number = function(x:number,y:number):number{
    return x+y;
};
console.log(sunTwo(5,6));

//接口定义函数  暂时不理解
// interface SearchFunc {
//     (source: string, subString: string): boolean;
// };

// let mySearch: SearchFunc;
// mySearch = function(source: string, subString: string) {
//     return source.search(subString) !== -1;
// };

//可选参数 用？表示
function nameList (firstName:string,nextName?:number){//可选参数必须跟在 必需参数后面 并且 可选参数后不可出现 必需参数
    if(nextName){
        console.log(firstName+"**"+nextName);
    }
    else{
        console.log(firstName);
    }
}
nameList("觉");

//默认参数  在 ES6 中，我们允许给函数的参数添加默认值，TypeScript 会将添加了默认值的参数识别为可选参数：   
  //不理解
// function buildName(firstName: string, lastName: string = 'Cat') {
//     return firstName + ' ' + lastName;
// }
// let tomcat = buildName('Tom', 'Cat');
// let tom = buildName('Tom');
// console.log(tom);
// //此时不受「可选参数必须接在必需参数后面」的限制
// function buildNameOme(firstName: string = 'Tom', lastName: string) {
//     return firstName + ' ' + lastName;
// }
// let tomcatOne = buildName('Tom', 'Cat');
// let cat = buildName(undefined, 'Cat');
// console.log(cat)

//剩余参数  ...rest
function push(array, ...items) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a = [];
push(a, 1, 2, 3);
console.log(a)

//重载
// function reverse(x: number | string): number | string {
//     if (typeof x === 'number') {
//         return Number(x.toString().split('').reverse().join(''));
//     } else if (typeof x === 'string') {
//         return x.split('').reverse().join('');
//     }
// }
//使用重载定义多个 reverse 的函数类型：
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}

/*
类型断言  可以手动指定一个值的类型
*/
// 语法
// <类型>值
// 或
// 值 as 类型
// 在 tsx 语法（React 的 jsx 语法的 ts 版）中必须用后一种。
function getLength(something: string | number): number {
    if ((<string>something).length) {
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}
// function toBoolean(something: string | number): boolean {//类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的
//     return <boolean>something;
// }

/*
声明文件  当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能。
*/

   // declare var 声明全局变量   无法理解

   // declare function 声明全局方法

   // declare class 声明全局类

   // declare enum 声明全局枚举类型

   // declare namespace 声明（含有子属性的）全局对象

   // interface 和 type 声明全局类型

   // export 导出变量

   // export namespace 导出（含有子属性的）对象

   // export default ES6 默认导出

   // export = commonjs 导出模块

   // export as namespace UMD 库声明全局变量

   // declare global 扩展全局变量

   // declare module 扩展模块

   // /// <reference /> 三斜线指令


//declare var    定义全局变量

   // src/jQuery.d.ts

// declare var jQuery: (selector: string) => any;
// // src/index.ts

// jQuery('#foo');

// // 使用 declare let 定义的 jQuery 类型，允许修改这个全局变量
// jQuery = function(selector) {
//     return document.querySelector(selector);
// };

// declare const jQuery: (selector: string) => any;

// jQuery('#foo');
// // 使用 declare const 定义的 jQuery 类型，禁止修改这个全局变量
// jQuery = function(selector) {
//     return document.querySelector(selector);
// };

//declare function 定义全局函数 

declare function lew(one:string):string; //定义全局函数的时候不能有 具体的实现

//declare class 定义全局类

declare class Anim{
    name:string;
    comt(name:string);
    syH():string;
}

//declare enum  定义全局枚举 

declare enum Dir {
    Up,
    Down,
    Left,
    Right
}

let Dire = [Dir.Down,Dir.Left];

//declare namespace 定义命名空间

// declare namespace jQuery {
//     function ajax(url: string, settings?: any): void;
// }
// // src/index.ts

// jQuery.ajax('/api/get_something');

//在 declare namespace 内部，我们直接使用 function ajax 来声明函数，而不是使用 declare function ajax。类似的，也可以使用 const, class, enum 等语句

// declare namespace jQuery {
//     function ajax(url: string, settings?: any): void;
//     const version: number;
//     class Event {
//         blur(eventType: EventType): void
//     }
//     enum EventType {
//         CustomClick
//     }
// }
// // src/index.ts

// jQuery.ajax('/api/get_something');
// console.log(jQuery.version);
// const e = new jQuery.Event();
// e.blur(jQuery.EventType.CustomClick);

//嵌套的命名空间   暂不理解

//防止命名冲突   暴露在最外层的 interface 或 type 会作为全局类型作用于整个项目中，我们应该尽可能的减少全局变量或全局类型的数量。故最好将他们放到 namespace

declare namespace jQueryTow {
    interface AjaxSettings {
        method?: 'GET' | 'POST'
        data?: any;
    }
    function ajax(url: string, settings?: AjaxSettings): void;
}

//声明合并   jQuery 既是一个函数，可以直接被调用 jQuery('#foo')，又是一个对象，拥有子属性 jQuery.ajax()（事实确实如此），那么我们可以组合多个声明语句，它们会不冲突的合并起来
declare function jQueryThree(selector: string): any;
declare namespace jQueryThree {
    function ajax(url: string, settings?: any): void;
    interface nm{
        name:string,
        age?:number;
    }
}
// src/index.ts

jQueryThree('#foo');
jQueryThree.ajax('/api/get_something');
let su:jQueryThree.nm={
    name:"觉"
}


//npm包  暂不理解
// export 导出变量
// export namespace 导出（含有子属性的）对象
// export default ES6 默认导出
// export = commonjs 导出模块


//export namespace  暂不理解
// export namespace foo {
//     const lex: string;
//     namespace bar {
//         function baz(): string;
//     }
// }

//export default 默认导出
// // types/foo/index.d.ts

// export default function foo(): string;
// // src/index.ts

// import foo from 'foo';

// foo();

//只有 function、class 和 interface 可以直接默认导出，其他的变量需要先定义出来，再默认导出
// types/foo/index.d.ts

// declare enum Directions {
//     Up,
//     Down,
//     Left,
//     Right
// }

// export default Directions;
//一般写成下面这样：
// // types/foo/index.d.ts

// export default Directions;

// declare enum Directions {
//     Up,
//     Down,
//     Left,
//     Right
// }

//export = 暂不理解

//UMD 库 暂不理解

//export as namespace 暂不理解

//声明文件这一部分需要详细查看