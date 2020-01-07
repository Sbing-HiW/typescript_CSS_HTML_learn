/*2019-9-7 学习typescript第二天 export*/

//export 导出
export let A = 20;

class test
{
    public ddddddd()
    {

    }
}
export default new test;

//混用 declare 和 export
declare const name: string;
declare function getName(): string;
declare class Animal {
    constructor(name: string);
    sayHi(): string;
}
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
interface Options {
    data: any;
}

export { name, getName, Animal, Directions, Options };


// import { foo } from './hello';

// console.log(foo);
// foo.bar.baz();

