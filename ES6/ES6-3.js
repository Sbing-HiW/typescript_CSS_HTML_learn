/* 字符串扩展 */
/* 1 字符的Unicode表示法 */
"\u{20BB7}"
// "𠮷"

"\u{41}\u{42}\u{43}"
// "ABC"

let hello = 123;
hell\u{6F} // 123

'\u{1F680}' === '\uD83D\uDE80'
// true

/* 2 字符串的遍历接口 */
for (let codePoint of 'foo') {
    console.log(codePoint)
  }
  // "f"
  // "o"
  // "o"


  let text = String.fromCodePoint(0x20BB7);

for (let i = 0; i < text.length; i++) {
  console.log(text[i]);
}
// " "
// " "

for (let i of text) {
  console.log(i);
}
// "𠮷"

/* 3 直接输入U+2028和U+2029 */
'中' === '\u4e2d' // true

const json = '"\u2028"';
JSON.parse(json); // 可能报错

const PS = eval("'\u2029'");

/* 4  JSON.stringify() 的改造 */
JSON.stringify('\u{D834}') // ""\\uD834""
JSON.stringify('\uDF06\uD834') // ""\\udf06\\ud834""


/* 5 模版字符串     未理解 */

/* 6 实例：模版编译 */
let template = `
<ul>
  <% 
  for(let i=0; i < data.supplies.length; i++) 
  {
  %>
    <li><%= data.supplies[i] %></li>
  <% 
  } 
  %>
</ul>
`;
/* 7 标签模版 */
alert`123`
// 等同于
alert(123)

/* 8 模版字符串的限制 */
/*
function latex(strings) {
  // ...
}

let document = latex`
\newcommand{\fun}{\textbf{Fun!}}  // 正常工作
\newcommand{\unicode}{\textbf{Unicode!}} // 报错
\newcommand{\xerxes}{\textbf{King!}} // 报错

Breve over the h goes \u{h}ere // 报错
`
*/
// function tag(strs) {
//   strs[0] === undefined
//   strs.raw[0] === "\\unicode and \\u{55}";
// }
// tag`\unicode and \u{55}`
