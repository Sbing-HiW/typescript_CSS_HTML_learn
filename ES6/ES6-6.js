/* 数值的扩展 */
/* 1二进制和八进制表示法 */
// 二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示。
0b111110111 === 503 // true
0o767 === 503 // true
// 将0b和0o前缀的字符串数值转为十进制，要使用Number方法。
Number('0b111')  // 7  
Number('0o10')  // 8


/* 2 Number.isFinite() Number.isNaN() */
// Number.isFinite()用来检查一个数值是否为有限的（finite），即不是Infinity。
// Number.isNaN()用来检查一个值是否为NaN。

Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false


Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN('15') // false
Number.isNaN(true) // false
Number.isNaN(9/NaN) // true
Number.isNaN('true' / 0) // true
Number.isNaN('true' / 'true') // true


/* 3 Number.parseInt(),Number.paresFloat() */
// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45

// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45

/* 4 Number.isInteger()  判断一个数值是否为整数。 */
Number.isInteger(25) // true
Number.isInteger(25.1) // false

Number.isInteger(5E-324) // false
Number.isInteger(5E-325) // true


/* 5 Number.EPSILON 表示 1 与大于 1 的最小浮点数之间的差。 */
// 误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。
Number.EPSILON === Math.pow(2, -52)
// true
Number.EPSILON
// 2.220446049250313e-16
Number.EPSILON.toFixed(20)
// "0.00000000000000022204"


/* 6 安全整数和Number.isSafeInteger() */
Math.pow(2, 53) // 9007199254740992

9007199254740992  // 9007199254740992
9007199254740993  // 9007199254740992

Math.pow(2, 53) === Math.pow(2, 53) + 1
// true

Number.MAX_SAFE_INTEGER === Math.pow(2, 53) - 1
// true
Number.MAX_SAFE_INTEGER === 9007199254740991
// true

Number.MIN_SAFE_INTEGER === -Number.MAX_SAFE_INTEGER
// true
Number.MIN_SAFE_INTEGER === -9007199254740991
// true

Number.isSafeInteger('a') // false
Number.isSafeInteger(null) // false
Number.isSafeInteger(NaN) // false
Number.isSafeInteger(Infinity) // false
Number.isSafeInteger(-Infinity) // false

Number.isSafeInteger(3) // true
Number.isSafeInteger(1.2) // false
Number.isSafeInteger(9007199254740990) // true
Number.isSafeInteger(9007199254740992) // false

Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false
// 模拟环境
Math.trunc = Math.trunc || function(x) {
    return x < 0 ? Math.ceil(x) : Math.floor(x);
  };



/* 7 Nath对象的扩展 */
// 7.1 Math.trunc() 去除一个数的小数部分，返回整数部分
Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0
// 7.2 Math.sign() 判断一个数到底是正数，负数，还是0
// 参数为正数，返回+1；
// 参数为负数，返回-1；
// 参数为 0，返回0；
// 参数为-0，返回-0;
// 其他值，返回NaN。

// 模拟环境
Math.sign = Math.sign || function(x) {
    x = +x; // convert to a number
    if (x === 0 || isNaN(x)) {
      return x;
    }
    return x > 0 ? 1 : -1;
  };

// 7.3 Math.cbrt() 计算一个数的立方根
Math.cbrt(-1) // -1
Math.cbrt(0)  // 0
Math.cbrt(1)  // 1
Math.cbrt(2)  // 1.2599210498948734
// 模拟环境
Math.cbrt = Math.cbrt || function(x) {
    var y = Math.pow(Math.abs(x), 1/3);
    return x < 0 ? -y : y;
  };

// 7.4 Math.clz32() 将参数转为32位无符号正数的形式
Math.clz32(0) // 32   0 的二进制形式全为 0，所以有 32 个前导 0；
Math.clz32(1) // 31   1 的二进制形式是0b1，只占 1 位，所以 32 位之中有 31 个前导 0；
Math.clz32(1000) // 22   1000 的二进制形式是0b1111101000，一共有 10 位，所以 32 位之中有 22 个前导 0。
Math.clz32(0b01000000000000000000000000000000) // 1
Math.clz32(0b00100000000000000000000000000000) // 2

// 左移运算符（<<）与Math.clz32方法直接相关。
Math.clz32(0) // 32
Math.clz32(1) // 31
Math.clz32(1 << 1) // 30
Math.clz32(1 << 2) // 29
Math.clz32(1 << 29) // 2

// 7.4 Math.imul() 返回两个数以32位带符号正数形式相乘的结果 返回的也是一个32位的带符号整数
Math.imul(2, 4)   // 8
Math.imul(-1, 8)  // -8
Math.imul(-2, -2) // 4

// Math.imul方法可以返回正确的值 1。
(0x7fffffff * 0x7fffffff)|0 // 0
Math.imul(0x7fffffff, 0x7fffffff) // 1


// 7.5 Math.fround() 返回一个数的32位单精度浮点数形式。 是将64位双精度浮点数转为32位单精度浮点数。
Math.fround(0)   // 0
Math.fround(1)   // 1
Math.fround(2 ** 24 - 1)   // 16777215

// 未丢失有效精度
Math.fround(1.125) // 1.125
Math.fround(7.25)  // 7.25

// 丢失精度
Math.fround(0.3)   // 0.30000001192092896
Math.fround(0.7)   // 0.699999988079071
Math.fround(1.0000000123) // 1  

// 模拟环境
Math.fround = Math.fround || function (x) {
    return new Float32Array([x])[0];
  };
  

// 7.6 Math.hypot() 方法返回所有参数的平方和的平方根。
Math.hypot(3, 4);        // 5
Math.hypot(3, 4, 5);     // 7.0710678118654755
Math.hypot();            // 0
Math.hypot(NaN);         // NaN
Math.hypot(3, 4, 'foo'); // NaN
Math.hypot(3, 4, '5');   // 7.0710678118654755
Math.hypot(-3);          // 3


// 7.7 对数方法 Math.expm1()  Math.expm1(x)返回 ex - 1，即Math.exp(x) - 1。
Math.expm1(-1) // -0.6321205588285577
Math.expm1(0)  // 0
Math.expm1(1)  // 1.718281828459045
// 模拟环境
Math.expm1 = Math.expm1 || function(x) {
    return Math.exp(x) - 1;
  };


// 7.8 对数方法 Math.log1p() 返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN。
Math.log1p(1)  // 0.6931471805599453
Math.log1p(0)  // 0
Math.log1p(-1) // -Infinity
Math.log1p(-2) // NaN
// 模拟环境
Math.log1p = Math.log1p || function(x) {
    return Math.log(1 + x);
  };

// 7.9 对数方法 Math.log2() 返回以 2 为底的x的对数。如果x小于 0，则返回 NaN。
Math.log2(3)       // 1.584962500721156
Math.log2(2)       // 1
Math.log2(1)       // 0
Math.log2(0)       // -Infinity
Math.log2(-2)      // NaN
Math.log2(1024)    // 10
Math.log2(1 << 29) // 29
// 模拟环境
Math.log2 = Math.log2 || function(x) {
  return Math.log(x) / Math.LN2;
};

// 7.10 双曲函数方法
Math.sinh(x) //返回x的双曲正弦（hyperbolic sine）
Math.cosh(x) //返回x的双曲余弦（hyperbolic cosine）
Math.tanh(x) //返回x的双曲正切（hyperbolic tangent）
Math.asinh(x) //返回x的反双曲正弦（inverse hyperbolic sine）
Math.acosh(x) //返回x的反双曲余弦（inverse hyperbolic cosine）
Math.atanh(x) //返回x的反双曲正切（inverse hyperbolic tangent）


/* 8 指数运算符 */
2 ** 2 // 4
2 ** 3 // 8
// 这个运算符的一个特点是右结合，而不是常见的左结合。多个指数运算符连用时，是从最右边开始计算的。
// 相当于 2 ** (3 ** 2)
2 ** 3 ** 2
// 512
// 上面代码中，首先计算的是第二个指数运算符，而不是第一个。
// 指数运算符可以与等号结合，形成一个新的赋值运算符（**=）。
let a = 1.5;
a **= 2;
// 等同于 a = a * a;
let b = 4;
b **= 3;
// 等同于 b = b * b * b;

// 差异
Math.pow(99, 99)
// 3.697296376497263e+197
99 ** 99
// 3.697296376497268e+197











