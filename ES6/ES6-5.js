/* 正则的扩展 */
/* 1 RegExp构造函数 */
// 1.1 参数是字符串，这时第二个参数表示正则表达式的修饰符（flag）。
var regex = new RegExp('xyz', 'i');
// 等价于
var regex = /xyz/i;

// 1.2 参数是一个正则表示式，这时会返回一个原有正则表达式的拷贝。
var regex = new RegExp(/xyz/i);
// 等价于
var regex = /xyz/i;

// new RegExp(/abc/ig, 'i').flags
// // "i"  原有正则对象的修饰符是ig，它会被第二个参数i覆盖。

/* 2 字符串的正则方法 */
// 字符串对象共有 4 个方法，可以使用正则表达式：match()、replace()、search()和split()。
// String.prototype.match 调用 RegExp.prototype[Symbol.match]
// String.prototype.replace 调用 RegExp.prototype[Symbol.replace]
// String.prototype.search 调用 RegExp.prototype[Symbol.search]
// String.prototype.split 调用 RegExp.prototype[Symbol.split]


/* 3 u修饰符 用来正确处理大于\uFFFF的 Unicode 字符。 */
// 3.1 点字符 对于码点大于0xFFFF的 Unicode 字符，点字符不能识别，必须加上u修饰符。
var s = '𠮷'; 

// /^.$/.test(s) // false
// /^.$/u.test(s) // true

// 3.2 Unicode字符表示法
/\u{61}/.test('a') // false
/\u{61}/u.test('a') // true
/\u{20BB7}/u.test('𠮷') // true

// 3.3 量词
// /a{2}/.test('aa') // true
// /a{2}/u.test('aa') // true
// /𠮷{2}/.test('𠮷𠮷') // false
// /𠮷{2}/u.test('𠮷𠮷') // true

// 3.4 预定义模式  u修饰符也影响到预定义模式，能否正确识别码点大于0xFFFF的 Unicode 字符。
// /^\S$/.test('𠮷') // false
// /^\S$/u.test('𠮷') // true

function codePointLength(text) {
    var result = text.match(/[\s\S]/gu);
    return result ? result.length : 0;
  }
  
  var s = '𠮷𠮷';
  
  s.length // 4
  codePointLength(s) // 2


// 3.5 i修饰符   不加u修饰符，就无法识别非规范的K字符。
/[a-z]/i.test('\u212A') // false
/[a-z]/iu.test('\u212A') // true

// 3.6 转义 没有u修饰符的情况下，正则中没有定义的转义（如逗号的转义\,）无效，而在u模式会报错。
// /\,/ // /\,/
// /\,/u // 报错

/* 4 RegExp.prototype.unicode属性 */
// 表示是否设置了u修饰符。
const r1 = /hello/;
const r2 = /hello/u;

r1.unicode // false
r2.unicode // true

/* 5 y修饰符 叫做“粘连”（sticky）修饰符。 */
var s = 'aaa_aa_a';
var r1 = /a+/g;
var r2 = /a+/y;

r1.exec(s) // ["aaa"]
r2.exec(s) // ["aaa"]

r1.exec(s) // ["aa"]
r2.exec(s) // null




const REGEX = /a/g;

// 指定从2号位置（y）开始匹配
REGEX.lastIndex = 2;

// 匹配成功
const match = REGEX.exec('xaya');

// 在3号位置匹配成功
match.index // 3

// 下一次匹配从4号位开始
REGEX.lastIndex // 4

// 4号位开始匹配失败
REGEX.exec('xaya') // null


const REGEXX = /a/y;

// 指定从2号位置开始匹配
REGEXX.lastIndex = 2;

// 不是粘连，匹配失败
REGEXX.exec('xaya') // null

// 指定从3号位置开始匹配
REGEXX.lastIndex = 3;

// 3号位置是粘连，匹配成功
const match = REGEXX.exec('xaya');
match.index // 3
REGEXX.lastIndex // 4



// y修饰符的一个应用，是从字符串提取 token（词元），y修饰符确保了匹配之间不会有漏掉的字符。
const TOKEN_Y = /\s*(\+|[0-9]+)\s*/y;
const TOKEN_G = /\s*(\+|[0-9]+)\s*/g;

tokenize(TOKEN_Y, '3 + 4')
// [ '3', '+', '4' ]
tokenize(TOKEN_G, '3 + 4')
// [ '3', '+', '4' ]

function tokenize(TOKEN_REGEX, str) {
  let result = [];
  let match;
  while (match = TOKEN_REGEX.exec(str)) {
    result.push(match[1]);
  }
  return result;
}

tokenize(TOKEN_Y, '3x + 4')
// [ '3' ]
tokenize(TOKEN_G, '3x + 4')
// [ '3', '+', '4' ]

/* 6 RegExp.prototype.sticky属性 */
// 与y修饰符相匹配，ES6 的正则实例对象多了sticky属性，表示是否设置了y修饰符。
var r = /hello\d/y;
r.sticky // true

/* 7 RegExp.prototype.flags属性 */
// 返回正则表达式的修饰符。
// ES5 的 source 属性
// 返回正则表达式的正文
/abc/ig.source
// "abc"

// ES6 的 flags 属性
// 返回正则表达式的修饰符
/abc/ig.flags
// 'gi'


/* 8 s修饰符：dotAll模式 */
// 以下四个字符属于“行终止符”。
// U+000A 换行符（\n）
// U+000D 回车符（\r）
// U+2028 行分隔符（line separator）
// U+2029 段分隔符（paragraph separator）

// /foo.bar/.test('foo\nbar')// false
// /foo[^]bar/.test('foo\nbar')// true
// 引入s修饰符，使得.可以匹配任意单个字符。
// /foo.bar/s.test('foo\nbar') // true
// 这被称为dotAll模式，即点（dot）代表一切字符


/* 9 后行断言 */
// “先行断言”指的是，x只有在y前面才匹配，必须写成/x(?=y)/。比如，只匹配百分号之前的数字，要写成/\d+(?=%)/。
// “先行否定断言”指的是，x只有不在y前面才匹配，必须写成/x(?!y)/。比如，只匹配不在百分号之前的数字，要写成/\d+(?!%)/。
// /\d+(?=%)/.exec('100% of US presidents have been male')  // ["100"]
// /\d+(?!%)/.exec('that’s all 44 of them')                 // ["44"]

// “后行断言”正好与“先行断言”相反，x只有在y后面才匹配，必须写成/(?<=y)x/。
// /(?<=\$)\d+/.exec('Benjamin Franklin is on the $100 bill')  // ["100"]
// /(?<!\$)\d+/.exec('it’s is worth about €90')                // ["90"]


/* 10 Unicode 属性类 */
// 匹配所有空格
// \p{White_Space}

// // 匹配各种文字的所有字母，等同于 Unicode 版的 \w
// [\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]

// // 匹配各种文字的所有非字母的字符，等同于 Unicode 版的 \W
// [^\p{Alphabetic}\p{Mark}\p{Decimal_Number}\p{Connector_Punctuation}\p{Join_Control}]

// // 匹配 Emoji
// /\p{Emoji_Modifier_Base}\p{Emoji_Modifier}?|\p{Emoji_Presentation}|\p{Emoji}\uFE0F/gu

// // 匹配所有的箭头字符
// const regexArrows = /^\p{Block=Arrows}+$/u;
// regexArrows.test('←↑→↓↔↕↖↗↘↙⇏⇐⇑⇒⇓⇔⇕⇖⇗⇘⇙⇧⇩') // true

/* 11 具名组匹配 */
// const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;

// const matchObj = RE_DATE.exec('1999-12-31');
// const year = matchObj[1]; // 1999
// const month = matchObj[2]; // 12
// const day = matchObj[3]; // 31


const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
// 模式的头部添加“问号 + 尖括号 + 组名”（?<year>）
const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj.groups.year; // 1999
const month = matchObj.groups.month; // 12
const day = matchObj.groups.day; // 31

const RE_OPT_A = /^(?<as>a+)?$/;
const matchObj = RE_OPT_A.exec('');

matchObj.groups.as // undefined
'as' in matchObj.groups // true
// 上面代码中，具名组as没有找到匹配，那么matchObj.groups.as属性值就是undefined，并且as这个键名在groups是始终存在的。


/* 12 String.prototype.matchAll */
// 如果一个正则表达式在字符串里面有多个匹配，现在一般使用g修饰符或y修饰符，在循环里面逐一取出。
var regex = /t(e)(st(\d?))/g;
var string = 'test1test2test3';

var matches = [];
var match;
while (match = regex.exec(string)) {
  matches.push(match);
}

matches
// [
//   ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"],
//   ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"],
//   ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]
// ]

for (const match of string.matchAll(regex)) {
    console.log(match);
  }
  // ["test1", "e", "st1", "1", index: 0, input: "test1test2test3"]
  // ["test2", "e", "st2", "2", index: 5, input: "test1test2test3"]
  // ["test3", "e", "st3", "3", index: 10, input: "test1test2test3"]

// 转为数组方法一
[...string.matchAll(regex)]

// 转为数组方法二
Array.from(string.matchAll(regex));










