/* 字符串的新增方法 */
/* 1 String.fromCodePoint() 可以识别大于0xFFFF的字符 */ 
String.fromCharCode(0x20BB7);

String.fromCodePoint(0x20BB7)
// "𠮷"
String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
// true


/* 2 String.raw() 返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，往往用于模板字符串的处理方法 */
String.raw`Hi\n${2+3}!`
// 实际返回 "Hi\\n5!"，显示的是转义后的结果 "Hi\n5!"

String.raw`Hi\u000A!`;
// 实际返回 "Hi\\u000A!"，显示的是转义后的结果 "Hi\u000A!"

String.raw`Hi\\n`
// 返回 "Hi\\\\n"

String.raw`Hi\\n` === "Hi\\\\n" // true

// `foo${1 + 2}bar`
// 等同于
String.raw({ raw: ['foo', 'bar'] }, 1 + 2) // "foo3bar"

String.raw = function (strings, ...values) {
    let output = '';
    let index;
    for (index = 0; index < values.length; index++) {
      output += strings.raw[index] + values[index];
    }
  
    output += strings.raw[index]
    return output;
  }

/* 3 实例方法：codePointAt() 正确处理 4 个字节储存的字符，返回一个字符的码点 */
// var s = "𠮷";

// s.length // 2
// s.charAt(0) // ''
// s.charAt(1) // ''
// s.charCodeAt(0) // 55362
// s.charCodeAt(1) // 57271

let s = '𠮷a';

s.codePointAt(0) // 134071
s.codePointAt(1) // 57271

s.codePointAt(2) // 97

s.codePointAt(0).toString(16) // "20bb7"
s.codePointAt(2).toString(16) // "61"

for (let ch of s) {
    console.log(ch.codePointAt(0).toString(16));
  }
  // 20bb7
  // 61

  let arr = [...'𠮷a']; // arr.length === 2
  arr.forEach(
    ch => console.log(ch.codePointAt(0).toString(16))
  );
  // 20bb7
  // 61

//   测试一个字符由两个字节还是由四个字节组成的最简单方法。
  function is32Bit(c) {
    return c.codePointAt(0) > 0xFFFF;
  }
  
  console.log(is32Bit("𠮷")); // true
  is32Bit("a") // false

/* 4 normalize() 用来将字符的不同表示方法统一为同样的形式，这称为 Unicode 正规化 */
// NFC，默认参数，表示“标准等价合成”,返回多个简单字符的合成字符
// NFD，表示“标准等价分解”,即在标准等价的前提下，返回合成字符分解的多个简单字符。
// NFKC，表示“兼容等价合成”,返回合成字符。
// NFKD，表示“兼容等价分解”，即在兼容等价的前提下，返回合成字符分解的多个简单字符。
'\u004F\u030C'.normalize('NFC').length // 1
'\u004F\u030C'.normalize('NFD').length // 2
// 上面代码表示，NFC参数返回字符的合成形式，NFD参数返回字符的分解形式。

/* 5 includes() startsWith() endsWith()*/
// includes()：返回布尔值，表示是否找到了参数字符串。
// startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
// endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true
// 第二个参数，表示开始搜索的位置。
s.startsWith('world', 6) // true 参数表示从 n 个
s.endsWith('Hello', 5) // true   参数表示前 n 个
s.includes('Hello', 6) // false  参数表示从 n 个

/* 6 repeat() 返回一个新字符串，表示将原字符串重复n次。 */
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""
// 参数如果是小数，会被取整。

'na'.repeat(2.9) // "nana"
// 如果repeat的参数是负数或者Infinity，会报错。

'na'.repeat(Infinity)
// RangeError
'na'.repeat(-1)
// RangeError

// 如果参数是 0 到-1 之间的小数，则等同于 0
'na'.repeat(-0.9) // ""

// 参数NaN等同于 0。
'na'.repeat(NaN) // ""

// 如果repeat的参数是字符串，则会先转换成数字。

'na'.repeat('na') // ""
'na'.repeat('3') // "nanana"

/* 7 padStart() padEnd() */
// padStart()用于头部补全
// padEnd()用于尾部补全。
// 第一个参数是字符串补全生效的最大长度，第二个参数是用来补全的字符串。

'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
// 省略第二个参数，默认使用空格补全长度
'x'.padStart(4) // '   x'
'x'.padEnd(4) // 'x   '

// padStart()的常见用途是为数值补全指定位数。下面代码生成 10 位的数值字符串。
'1'.padStart(10, '0') // "0000000001"
'12'.padStart(10, '0') // "0000000012"
'123456'.padStart(10, '0') // "0000123456"
// 另一个用途是提示字符串格式。
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"


/* 8 trimStart() trimEnd()  */
// trimStart()消除字符串头部的空格，trimEnd()消除尾部的空格。
const s = '  abc  ';

s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"

/* 9 matchAll() 返回一个正则表达式在当前字符串的所有匹配*/




