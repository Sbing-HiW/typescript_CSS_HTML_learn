/* 数组的扩展 */
/* 1 扩展运算符 */
// 扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

// [...document.querySelectorAll('div')]
// [<div>, <div>, <div>]


// 替换函数的apply方法
// ES5 的写法
function f(x, y, z) {
    // ...
  }
  var args = [0, 1, 2];
  f.apply(null, args);
  
  // ES6的写法
  function f(x, y, z) {
    // ...
  }
  let args = [0, 1, 2];
  f(...args);

// 通过push函数，将一个数组添加到另一个数组的尾部。

// ES5的 写法
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);

// ES6 的写法
let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
arr1.push(...arr2);

/* 2 Array.from()将两类对象转为真正的数组  */
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};

// ES5的写法
var arr1 = [].slice.call(arrayLike); // ['a', 'b', 'c']

// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']

Array.from([1, , 2, , 3], (n) => n || 0)
// [1, 0, 2, 0, 3]



/* 3 Array.of() 将一组值，转换为数组 */
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1



/* 4 数组实例的copyWithin()  */
// 数组实例的copyWithin()方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），
// 然后返回当前数组。也就是说，使用这个方法，会修改当前数组。

Array.prototype.copyWithin(target, start = 0, end = this.length)
// target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
// start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
// end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。
[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]

// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]

// 将3号位复制到0号位
// [].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}

// 将2号位到数组结束，复制到0号位
let i32a = new Int32Array([1, 2, 3, 4, 5]);
i32a.copyWithin(0, 2);
// Int32Array [3, 4, 5, 4, 5]

// 对于没有部署 TypedArray 的 copyWithin 方法的平台
// 需要采用下面的写法
[].copyWithin.call(new Int32Array([1, 2, 3, 4, 5]), 0, 3, 4);
// Int32Array [4, 2, 3, 4, 5]


/* 5 数组实例的find() 和 findIndex() */
// find方法，用于找出第一个符合条件的数组成员
[1, 4, -5, 10].find((n) => n < 0)
// -5
// 上面代码找出数组中第一个小于 0 的成员。

[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10
// 上面代码中，find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。


// findIndex()  返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
[1, 5, 10, 15].findIndex(function(value, index, arr) {
    return value > 9;
  }) // 2


/* 6 数组实例的fill() */
// fill方法使用给定值，填充一个数组。

['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]

// fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']


/* 7 数组实例的entries() keys() values()  */
// keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
for (let index of ['a', 'b'].keys()) {
    console.log(index);
  }
  // 0
  // 1
  
  for (let elem of ['a', 'b'].values()) {
    console.log(elem);
  }
  // 'a'
  // 'b'
  
  for (let [index, elem] of ['a', 'b'].entries()) {
    console.log(index, elem);
  }
  // 0 "a"
  // 1 "b"


/* 8 数组实例的includes()  */
// 方法返回一个布尔值，表示某个数组是否包含给定的值
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true
// 第二个参数表示搜索的起始位置，默认为0。
// 第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true



/* 9 数组实例的flat() flatMap() */
// Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。
[1, 2, [3, 4]].flat()
// [1, 2, 3, 4]

[1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]

[1, 2, [3, [4, 5]]].flat(2) //想要拉平的层数，默认为1
// [1, 2, 3, 4, 5]


// flatMap()方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()）
// ，然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组。

// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2])
// [2, 4, 3, 6, 4, 8]
// flatMap()只能展开一层数组。
// 相当于 [[[2]], [[4]], [[6]], [[8]]].flat()
[1, 2, 3, 4].flatMap(x => [[x * 2]])
// [[2], [4], [6], [8]]


/* 10 数组的空位 */
// forEach方法
// [,'a'].forEach((x,i) => console.log(i)); // 1

// filter方法
// ['a',,'b'].filter(x => true) // ['a','b']

// every方法
// [,'a'].every(x => x==='a') // true

// reduce方法
// [1,,2].reduce((x,y) => x+y) // 3

// some方法
// [,'a'].some(x => x !== 'a') // false

// map方法
// [,'a'].map(x => 1) // [,1]

// join方法
// [,'a',undefined,null].join('#') // "#a##"

// toString方法
// [,'a',undefined,null].toString() // ",a,,"

// Array.from方法会将数组的空位，转为undefined，也就是说，这个方法不会忽略空位。
Array.from(['a',,'b'])
// [ "a", undefined, "b" ]

// 扩展运算符（...）也会将空位转为undefined。
// [...['a',,'b']]
// [ "a", undefined, "b" ]

// copyWithin()会连空位一起拷贝。
// [,'a','b',,].copyWithin(2,0) // [,"a",,"a"]

// fill()会将空位视为正常的数组位置。
// new Array(3).fill('a') // ["a","a","a"]

// for...of循环也会遍历空位。
let arr = [, ,];
for (let i of arr) {
  console.log(1);
}
// 1
// 1

// entries()
// [...[,'a'].entries()] // [[0,undefined], [1,"a"]]

// keys()
// [...[,'a'].keys()] // [0,1]

// values()
// [...[,'a'].values()] // [undefined,"a"]

// find()
// [,'a'].find(x => true) // undefined

// findIndex()
// [,'a'].findIndex(x => true) // 0






















