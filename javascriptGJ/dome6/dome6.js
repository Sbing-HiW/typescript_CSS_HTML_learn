// 第三部分 javascript核心 手册

/* 1. arguments */
// 1.1 arguments.callee 
// 一个未命名的函数直接量使用callee属性引用自己
var factoral = function(x){
    if(x<2) return 1;
    else return x*arguments.callee(x-1);
}
var y = factoral(5);
console.log(y);

// 1.2 arguments.length
// 声明了传递给当前函数的参数个数
function check(args){
    var actual = args.length; //参数实际个数
    var expect = args.callee.length;//希望的参数个数
    if(actual != expect){
        throw new Error(expect+"**"+actual);
    }
}
function f (x,y,z){
    check(arguments);
    document.write(x+y+z);
    return x+y+z;
}
f(1,2,3);

/* 2 Array */
// 2.1 Array.concat(); 给数组添加新元素
var a1 = [1,3,6];
var b1 =  a1.concat(4,6);
console.log(b1);

// 2.2 Array.join();  将数组中的所有元素都转换成字符串，然后连起来
var a2 = [2,3,4,"asd",1];
var b2 =  a2.join("+");
console.log(b2);

// 2.3 Array.pop();  从数组尾部删除一个元素并返回
var a3 = [2,5,1,2];
var b3 = a3.pop();
console.log(b3);

// 2.4 Array.push();  把一个项目添加到数组尾部并返回长度
var a4 = [2,5,6,2];
var b4 = a4.push(4,2,4)
console.log(b4);

// 2.5 Array.reverse();  在愿数组上颠倒数组中的元素的顺序
var a5 = [2,5,2,1,4,6]
var b5 = a5.reverse();
console.log(b5);

// 2.6 Array.shift();  将数组第一个元素移除数组并返回
var a6 = [5,6,5,4,8]
console.log(a6.shift());

// 2.7 Array.slice();  返回数组的一个子数组
var a7 = [5,1,2,54,2,2,1,2,1];
var b7 = a7.slice(1,3);
console.log(b7)

// 2.8 Array.sort();  在元数组上对数组元素进行排序
var a8 = [5,42,1,13,5471,3];
var b8 = a8.sort();
console.log(b8);

// 2.9 Array.splice();  察隅删除或者替换一个数组元素
var a9 = [1,2,3,4,5,6,7,8,9]
a9.splice(5,2);
console.log(a9);
a9.splice(4);
console.log(a9);
a9.splice(1,5,5,4);
console.log(a9);

// 2.10 Array.toLocaleString();  把数组转换成一个局部字符串

// 2.11 Array.tostring();  把数组转换成一个字符串

// 2.12 Array.unshift();  把数组的头部插入一个元素返回长度
var a12 = [2,5,1,6,4,5];
var b12 = a12.unshift(2,6,4);
console.log(b12);

/* 3. Boolean */
// 3.1 Boolean.toString(); 将布尔值转换成字符串

// 3.2 Boolean.valueOf(); 布尔对象的布尔值

/* 4. Date  日期和时间的对象*/

/* 5. Error 普通异常*/
// 5.1 Error.message 读取错误信息
// 5.2 Error.name 错误的类型
// 5.3 Error.toString 把Error对象转换成字符串

/* 6. escape() 对字符串编码 */
document.write( escape("hello word!"));

/* 7. eval()  执行字符串中的javascript代码*/
document.write( eval("1+2"));
// try{
//     alert("Resuls:"+eval(prompt("Enter an expressin:")));
// }
// catch(exception){
//     alert(exception);
// }
// var myeval = eval;
// document.write( myeval("1+2"));

// 7.1 EvalError 在不正确使用eval（）时抛出异常 

/* 8 Function javascript的函数 */
// 8.1 arguments[] 一个参数数组，元素是传递给函数的参数
// 8.2 caller 对调用当前函数的ffunction对象的引用
// 8.3 length 在声明函数时指定的命名参数的个数
// 8.4 prototype 一个对象 用于构造函数，这个对象定义的属性和方法有够赞函数创建的所有对象共享
// 8.5 function.apply(thisobj,args) 将函数作为一个对象的方法调用  thisobj 调用function的对象 args 一个数组
Object.prototype.toString.apply(0);
var date = [1,2,3,7,4,6];
console.log( Math.max.apply(null,date));

// 8.6 function.arguments[] 传递给函数的参数
// 8.7 function.call() 将函数作为对象的方法调用
// 8.8 function.caller 调用当前函数的函数
// 8.9 function.length 已声明的参数的个数
// 8.10 function.prototype 对象类的原型
// 8.11 function.toString() 把函数转化成字符串

/* 9 Global 全局对象 */
// 9.1 Infinity 无穷大的数字属性
// 9.2 isFinite() 判断一个数字属否有穷
// 9.3 isNaN 检测非数字值 

/* 10 Math 算数函数和常量 */
// 10.1 Math.abs() 计算绝对值
// 10.2 Math.acos() 计算反余弦值
// 10.3 Math.asin() 计算反正弦值
// 10.4 Math.atan() 计算反正切值
// 10.5 Math.atan2(y，x) 计算从X轴到一个点之间的角度
// 10.6 Math.ceil() 对一个数向上取整
// 10.7 Math.cos() 计算余弦值
// 10.8 Math.E 算数常量e：自然对数的底数 接近于2.71828
// 10.9 Math.exp() 计算e的x次方
// 10.10 Math.floor() 对一个数向下取整
// 10.11 Math.LN10 算术常量 10的自然对数 接近2.3025850929940459011
// 10.12 Math.LN2 算术常量 2的自然对数 接近0.69314718055994528623
// 10.13 Math.log() 计算一个数的对数
// 10.14 Math.LOG10E() 算术常量 以10为底e的对数 接近0.43429448190325181667
// 10.15 Math.LOG2E() 算术常量 以2为底e的对数 接近1.442695040888963387
// 10.16 Math.max() 返回最大的参数 
// 10.17 Math.min() 返回最小的参数
// 10.18 Math.PI 算术常量派 接近3.14159265358979（周长于直径之比）
// 10.19 Math.POW(x，y) 计算 x的y次方
// 10.20 Math.random() 返回一个伪随机数
// 10.21 Math.round() 四舍五入
// 10.22 Math.sin() 计算正弦值
// 10.23 Math.sqrt() 计算平方根  可计算任意数字的次方根
// 10.24 Math.SQRT1_2 算术常量 2的平方根的倒数 接近0.7071067811865476
// 10.25 Math.SQRT2 算术常量 2的平方根 接近1.414213562373098 
// 10.26 Math.tan() 计算正切值
// 10.27 NaN 非数字属性
// 10.28 Number 对数字的支持
//    10.28.1 Number.MAX_VALUE 可表示最大的数
//    10.28.2 Number.MIN_VALUE 可表示最小的数
//    10.28.3 Number.NaN 非数字值
//    10.28.4 Number.NEGATIVE_INFINITY 负无穷大
//    10.28.5 Number.POSITIVE_INFINITY 正无穷大
//    10.28.6 Number.toExponential() 用指数计数法格式化数字
//    10.28.7 Number.toFixed()采用定点基数法格式化数字
//    10.28.8 Number.toLocaleString()把数字转化成本地格式的字符串
//    10.28.9 Number.toPrecision()格式化数字的有效位
//    10.28.10 Number.toString()将一个数字转化位字符串
//    10.28.11 Number.valueOf()返回原始数值
// 10.29 toString() 把数字转换成字符串，使用指定的基数
// 10.30 toLocaleString() 把数字转换成字符串，使用本地数字格式规约
// 10.31 toFixed() 把数字转化成字符串，结果的小数点后有指定位数的数字
// 10.32 toExponenttial() 把数字转化成字符串，结果采用指数的计数法，小数点后有指定位数的数字
// 10.33 toPrecision() 把数字转化成字符串，结果中包含指定位数的有效数字

/* 11 Object 含有所有javascript对象的超类 */
// 11.1 Object.constructor 对象的构造函数  用于判断位置对象的类型
a11_1 = new Array(1,2,3);
a11_1.constructor == Array;
function isArray(x){
    return ((typeof x == "object")&&(x.constructor == Array))
}

// 11.2 Object.hasOwnProperty(属性名) 检查属性是否被继承
var a11_2 = new Object();
a11_2.x = 3.14;
console.log( a11_2.hasOwnProperty("x"));

// 11.3 Object.isPrototypeOf() 一个对象是否是另一个对象的原型 
var a11_3 = new Object();
console.log( Object.prototype.isPrototypeOf(a11_3));

// 11.4 Object.propertyIsEnumerable()  是否可以通过for/in循环看到属性
var a11_4 = new Object();
a11_4.x = 3.14;
console.log( a11_4.propertyIsEnumerable("x"));

/* 12.1 parseFloat 把字符串转化成数字 */
/* 12.2 parselint（s，radix） 把字符串转化成整数  radix进制数*/

/* 13 RangeError 在数字超出合法范围时抛出 */

/* 14 RegRxp 用于模式匹配的正则表达式 */
//   14.1 RegExp.exec();通用的匹配模式   不理解
// var pattern = /\bjava\w*\b/g;
// var text = "javascript is more fun than java or javaBeans!";
// var result ;
// while ((result = pattern.exec(text))!=null){
//     alert(("MAtched"+result[0]+"at postion "+result.index+"next search begins at postion "+pattern.lastIndex));
// } 

// 14.2 RegExp.global 正则表达式是否全局匹配

// 14.3 RegExp.ignoreCase 正则表达式是否分大小写

// 14.4 RegExp.lastIndex 下次匹配的起始位置

// 14.5 RegExp.source 正则表达式的文本

// 14.6 RegExp.test() 检测一个字符串是否匹配某个模式 检测是否包含某文本
var patten = /java/i;
console.log( patten.test("javascript"));

// 14.7 RegExp.toString() 把正则表达式转化成字符串

/* 15 String 字符串 */
// 15.1 String.charAt() 返回字符串中第n个字符
// 15.2 String.charCodeAt() 返回第n个字符的代码
// 15.3 String.concat() 连接字符串
// 15.4 String.fromCharCode() 从字符编码创建一个字符串
  //创建字符“hello”
var s = String.fromCharCode(104,101,108,108,111) ;
console.log(s); 
// 15.5 String.indexOf(需要检索的字符串，开始位置) 检索字符串
// 15.6 String.lastIndexOf() 从后向前检索一个字符串
// 15.7 String.length() 字符串长度
// 15.8 String.localeCompare() 用本地特定的顺序来比较两个字符串
   // var strings;
   // strings.sort(function(a,b){return a.localeCompare(b)});
// 15.9 String.match() 找到一个或者多个正则表达式的匹配
// 15.10 String.replace(); 替换一个正则表达式的子串
// 15.11 String.search(); 检测与正则表达式相匹配的子串
// 15.12 String.slice(); 抽取一个子串  从第几位开始到第几位结束（不包含）
// 15.13 String.split(); 将字符串分割成字符串数组
// 15.14 String.substr(); 抽取一个子串 从第几位开始和一定长度
// 15.15 String.substring(); 返回字符串的一个子串  返回长度位 to-from
// 15.16 String.toLocaleLowerCase(); 把字符串转换成小写
// 15.17 String.toLocaleUpperCase(); 把字符串转换成大写
// 15.18 String.toString(); 返回字符串
// 15.19 String.toLowerCase(); 把字符串转换成小写
// 15.20 String.toUpperCase(); 把字符串转换成大写
// 15.21 String.valueOf(); 返回字符串

/* 16.1 SyntaxError  语法错误 */

/* 16.2 TypeError  类型错误 */

/* 17  undefined  未定义值 */

/* 18  unescape()  给转义字符串解码 */
document.write("<hr>"+unescape(escape("hello word!"))) ;

/* 19 URIError 由URIError的编码和解码方法抛出 */


/********************************************************/
/********************************************************/
/********************************************************/
/********************************************************/
/********************************************************/


// 第四部分 客户端JavaScript 手册
/* 1. Anchor 超文本连接目标 */
// document.anchors[i];
// document.anchors.length

/* 2. Applet 嵌入网页的小程序 */
// document.applets[i];
// document.appletName;

/* 3. Area 参考Link */

/* 4. Button 图形化按钮 */

/* 5. Checkbox 图形化复选框 */

/* 6. Document */
// 6.1 document.alinkColor 被激活的链接的颜色
// 6.2 document.anchors[] 一个anchor对象数组
// 6.3 document.applets[] 一个applets对象数组
// 6.4 document.bgColor 背景颜色
// 6.5 document.cookie  与文档关联在一起的cookie的值
// 6.6 document.domain  指定文档所属internet域 用于安全性方面
// 6.7 document.embeds[] 表示由<embed>标记嵌入文档的数据
// 6.8 document.fgColor 文本颜色
// 6.9 document.forms[] 代表出现在document中的表单
// 6.10 document.images[] 每个元素代表HTML标记的<img>嵌入文档的一个图像
// 6.11 document.lastModified 声明了最后一次修改文档的时间
// 6.12 document.links[] 每个元素代表文档中出现的一个超文本链接
// 6.13 document.location 含有当前文本的完整的URL
// 6.14 document.plugins[] 表示显示文档中的嵌入数据时
// 6.15 document.referrer 含有连接到当前文档的文档的URL
// 6.16 document.title 文档的标题
// 6.17 document.URL 声明文档的URL
// 6.19 document.vlinkColor 已访问过的连接的颜色

/* 7. Netscape */
// 7.1 height 文档高度
// 7.2 width 文档宽度
// 7.2 layers[] 文档中包含的表示层的所有Layer对象
// 7.4 captureEvents() 请求指定类型的事件
// 7.5 getSelection() 返回当前选中的文档文本
// 7.6 releaseEvents() 停止捕捉指定类型的文件
// 7.7 routeEvent() 根据捕捉到的事件找到下一个与之相关的元素

/* 8. Internet Explorer */
// 8.1 activeElement 引入文档中当前活动的输入元素
// 8.2 all[] 文档中包含的所有元素
// 8.3 charset 文档采用的字符集
// 8.4 children[] 元素是文档的所有直接子元素 按顺序存放
// 8.5 defaultCharset 文档采用的默认字符集
// 8.6 expando 把expando设置成false 可以阻止客户端对象的扩展
// 8.7 ParentWindow 包含文档的窗口
// 8.8 readyState 文档的装载状态
//    8.8.1 uninitialized 还没开始装载文档
//    8.8.2 loading 正在装载文档
//    8.8.3 interactive 装载文档已经足够与用户进行交互
//    8.8.4 Complete 文档已经装载完毕
// 方法
// 8.9 clear() 擦去文档内容
// 8.10 cloes() 关闭由open()打开的文档流
// 8.11 open() 打开一个客供血日文档内容的流
// 8.12 write() 将指定字符串插入当前文档
// 8.13 writeln() 输出的字符串中插入一个换行符
// 8.14 elementFromPoint() 返回位置指定地点（x，y坐标）的元素

/* 9. Document.all[] 文档中的所有HTML元素 */

/* 10. Document.captureEvents()  请求指定类型的事件*/

/* 11. Document.clear() 清除一个文档 */

/* 12. Document.close() 关闭一个输出流 */

/* 13. Document.cookie 文档的cookie */

/* 14. Document.domain  文档的安全域 */

/* 15. Document.elementFromPoint() 判断哪个HTML元素处于指定的位置*/

/* 16. Document.getSlelction() 返回选中的文本 */

/* 17. Document.handleEvent() */

/* 18. Document.lastModified  文档的最后修改的日期 */

/* 19. Document.links[] 文档中的link对象 */

/* 20. Document.open() 打开一个新文档 */

/* 21. Document.releaseEvents()  停止捕捉指定类型的文件 */

/* 22. Document.routeEvent() 根据捕捉到的事件找到下一个与之相关的元素 */

/* 23. Document.URL 当前文档的URL */

/* 24. Document.write() 给文档添加数据 */

/* 25. Document.writeln() 给文档添加数据和换行符 */

/* 26. Element 参考input */

/* 27. Event 事件 */

/* 28. Netscape 4 属性  */
// 28.1 height 调整窗口或框架的高度
// 28.2 layerX，layerY 包容图层的X坐标和Y坐标
// 28.3 modifiers 声明了在事件发生时按下并保持住的组合健
// 28.4 pageX，pageY 时间发生的位置相对于浏览器页面的X坐标和Y坐标
// 28.5 screenX，screenY 时间发生时的位置相对与屏幕的X坐标和Y坐标
// 28.6 target 对生成时间的Window对象，Document对象，layer对象或者HTMLElement对象的引用
// 28.7 type 声明了时间的类型
// 28.8 which 声明按下或放开的健或鼠标按钮
// 28.9 width 调整窗口或框架的宽度
// 28.10 x，y  时间发生的位置的X坐标和Y坐标

/* 29 Internet Explorer 4 属性 */
// 29.1 altKey 指定时间发生时，Alt健是否被按下并保持
// 29.2 button 声明了被按下的鼠标按钮或按钮
// 29.3 cancelBubble 如果时间处理程序想阻止时间传播到包容对象，必须把该属性设为true
// 29.4 clientX，clientY 事件发生的位置相对于浏览器页面的X Y坐标
// 29.5 ctrlKey 指定事件发生时，Ctrl健是否被按下并保持
// 29.6 fromElement 引用移除鼠标的元素
// 29.7 keyCode 声明了被敲击的健生成的Unicode字符码
// 29.8 offsetX，offsetY 发汗恶搞事件的地点在事件源元素的坐标系统中的XY坐标
// 29.9 reason 0:传输成功 1:传输失败  2:说明数据传输过程中发生错误
// 29.10 returnValue 如果设置了该属性 它的值比时间处理程序真正的返回值优先级高
// 29.11 screenX，screenY 时间发生时的位置相对与屏幕的X坐标和Y坐标
// 29.12 shiftKey 声明了事件发生时，Shift健是否被按下并保持住
// 29.13 srcElement 对生成事件的Window对象 Documenrt对象或HTMLElement对象的引用
// 29.14 srcFilter 声明改变的过滤器
// 29.15 toElement 引用移入鼠标的元素
// 29.16 type 声明事件的类型
// 29.17 x，y 事件发生的位置的X坐标和Y坐标

/* 30 FileUpload 表单输入元素中的文件上载域 */

/* 31 Form 表单 */
// 31.1 action  指定不要提交的表单的URL
// 31.2 elements[] 表单中的输入元素 button checkbox hidden password radio reset select submit text textarea 
// 31.3 encoding 提交表单时传输的数据的编码形式 由enctype性质设置 
// 31.4 length 表单的元素个数
// 31.5 method 提交表单数据采用的方法  get和post
// 31.6 name 声明表单的名字 
// 31.7 target 指定了要现实提交表单的结果的窗口或者框架的名字   
//   31.7.1 _blank 重新创建一个新的窗口
//   31.7.2 _self 提交的结果显示到表单所在的窗口或框架
//   31.7.3 _parent 显示到包含表单的框架的父框架中
//   31.7.4 _top 结果显示在顶层框架中
// 31.8 reset()  把表单的所有输入的元素重置为它们的默认值
// 31.9 submit() 提交表单
// 31.10 Form.onreset 在重置表单时调用
// 31.11 Foem.onsubmit 在提交表单是调用

/* 32  Frame Window对象的一种类型 */

/* 33 getClass()  返回一个javaObject对象的javaClass */

/* 34 Hidden 用于客户端/服务端通信的隐藏数据 */

/* 35 History 浏览器的URL的历史 */
// 35.1 length 声明了浏览器列表中的URL的个数
// 35.2 History.back() 后退到以前已经访问过的URL 
// 35.3 History.forward() 前进到以前已经访问过的URL
// 35.4 History.go() 转移到以前已经访问过的URL

/* 36 HTMLElement 所有HTML元素的超类 */
// 36.1 all[] 所有元素的完整列表
// 36.2 children[] 该元素的直接子元素
// 36.3 className 声明了元素的class性质的值
// 36.4 document 包含Document对象的引用
// 36.5 id 声明了元素的id性质的值 
// 36.6 innerHTML 声明了元素含有的HTML 
// 36.7 innerText 声明了元素含有的文本
// 36.8 lang 声明了element的HTML性质lang 的值
// 36.9 offsetHeight 元素和它的内容的高度
// 36.10 offsetLeft  元素element的X坐标
// 36.11 offsetParent 声明了定义坐标系统的包容元素
// 36.12 offsetTop 元素的Y坐标
// 36.13 offsetWidth 元素和它内容的高度
// 36.14 outerHTML 声明了一个元素的HTML文本
// 36.15 outerText 声明了一个元素的纯文本
// 36.16 parentElement 当前元素的直接父元素
// 36.17 sourceIndex 元素在包容它的文档的Document.all[] 数组的下标
// 36.18 style 元素内联CSS样式性质
// 36.19 tagName 一个只读的字符串 HTML标记的名字
// 36.20 title 浏览器名字
// 36.21 contains() 判断当前的元素是否含有指定的元素
// 36.22 getAttribute() 获得一个命名性质的值
// 36.23 handleEvent() 把Event对象传递给适当的事件处理程序
// 36.24 insertAdjacentHTML() 把HTML文本插入到当前元素相邻接的文档中
// 36.24 insertAdjacentText() 把纯文本插入到当前元素相邻接的文档中
// 36.25 removeAttrinute() 从元素中删除一个性质与和它的值
// 36.26 scrollTntoView() 滚动文档 使元素出现在窗口的顶部或者底部
// 36.27 setAttribute() 设置元素的性质值
// 36.28 onclick 当用户点击该元素时调用
// 36.29 ondblclick 当用户双击该元素时调用
// 36.30 onhelp 当用户请求帮助时调用
// 36.31 onkeydown 当用户按下一个健时调用
// 36.32 onkeyparess 当用户按下一个健或者放开一个健时调用
// 36.33 onkeyup 当用户放开一个健时调用
// 36.34 onmousedown 当用户按下一个鼠标按钮时调用
// 36.35 onmousemove 当用户移动鼠标时调用
// 36.36 onmouseout 当用户鼠标移开当前元素时调用
// 36.37 onmouseover 当用户把鼠标移动过一个元素时调用
// 36.38 onmouseup 当用户放开一个鼠标按钮时调用

/* 37 Image 嵌入文档中的图像 */
// 37.1 Image.onload 当图片装载完毕时调用

/* 38 Input HTML表单中的输入元素 */
// 38.1 checked 设置Checkbox或者Radio 按钮的状态
// 38.2 defaultChecked 声明了默认情况下一个Checkbox或者Radio元素是否被选中
// 38.3 defaultValue 声明了在该表单元素中出现的出事文本
// 38.4 form 引用含有该元素的Form对象
// 38.5 length 对于Select表单对象 这个属性声明的是options[]数组中存放的选择项
// 38.6 name 声明该元素的名字
// 38.7 options[] 存放option对象 表示Select对象显示的一个选项
// 38.9 seletedIndex 声明了当前选中的Select对象的选项
// 38.10 type 声明表单元素的类型
// 38.11 value 声明了表单元素的值或提交表单给服务器的值
// 38.12 blur() 将键盘焦点从元素中移开
// 38.13 click() 在表单元素上模拟鼠标点击
// 38.14 focus() 把键盘焦点赋予该元素
// 38.15 select() 选中其中出现的所有文本
// 38.16 input.onblur 当表单元素失去焦点时调用的事件吃力程序
// 38.17 input.onchange 改变表单元素的值时调用的事件处理程序
// 38.18 input.onclick 点击表单元素时调用的事件处理程序
// 38.19 input.onfocus 当表单元素获得焦点时调用事件处理程序
// 38.20 input.select() 选择表单中的文本
// 38.21 input.type 表单元素的类型 
//   38.21.1 Button  按钮
//   38.21.2 checkbox 复选框
//   38.21.3 FileUpload 文件选择
//   38.21.4 hidden 隐藏信息
//   38.21.5 password 密码框
//   38.21.6 radio 单选框
//   38.21.7 reset 重置
//   38.21.8 select 下拉框
//   38.21.9 selsct-multiple 是否循序多项选择
//   38.21.10 submit 提交
//   38.21.11 Text 文本输入框
//   38.21.12 Textarea 多行文本输入框
// 38.22 input.value 显示的值或者提交的值

/* 39  java的javascript表示 */
// 39.1 JavaArray java数组的javascript表示
// 39.2 JavaClass java类的javascript表示
// 39.3 JavaObject java对象的javascript表示
// 39.4 JavaPackage java包的javascript表示

/* 40 JSObject javascript对象的java表示 */
// 40.1 JSObject.call(调用的js方法名字，作为参数传递给该方法的java对象数组) 调用javascript对象的方法
// 40.2 JSObject.eval(任意js代码) 在javascript对象环境中执行一个javascript代码串
// 40.3 JSObject.getMember(读取属性名字) 获取javascript对象的一个属性值
// 40.4 JSObject.getSlot(要读取的数组的下标) 获取javascript对象的一个数组元素的值
// 40.5 JSObject.getWindow() 获取一个‘根’JSObject对像，表示javaScript中代表浏览器窗口的Window对象
// 40.6 JSObject.removeMember(要从JSObject对象中删除的属性的名字) 删除javascript对象的一个属性
// 40.7 JSObject.setMember(要设置属性的名字，给指定的属性设置的值) 设置javascript对象的一个属性的值
// 40.8 JSObject.setSlot(设置的数组元素的下标，指定数组元素设置的值) 设置javascript对象的一个数组元素的值
// 40.9 JSObject.toString() 调用javascript对象的tostring()方法 并返回该方法执行的结果

/* 41 Layer HTML文档中的一个独立层 */
// 41.1 Layer.caputureEvents() 
// 41.2 Layer.handleEvent()
// 41.3 Layer.load(指定转载进Layer的文档的URL，指定Layer的宽度 ) 改变层的内容和宽度
// 41.4 Layer.moveAbove(对Layer对象的引用，层Layer将移动到这个层上) 把一个层移动到另一个层上
// 41.5 Layer.moveBelow(对Layer对象的引用，层Layer将移动到这个层下) 把一个层移动到另一个层之下
// 41.6 Layer.moveBy(把层右移的像素数，把层下移的像素数) 把层移动到一个相对的位置
// 41.7 Layer.moveTo(移动到位置的X坐标，移动到位置的Y坐标) 移动层
// 41.8 Layer.moveToAbsolute(移动到位置的X坐标，移动到位置的Y坐标) 把该层移动到相对与页面的坐标处
// 41.9 Layer.offset(把层右移的像素数，把层下移的像素数) 把该层移动一个相对的位置
// 41.10 Layer.releaseEvents() 
// 41.11 Layer.resizieBy(将窗口宽度加大的像素数，将窗口高度加大的像素数) 以相对的数量调整层
// 41.12 Layer.resizeTo(要调整到的层宽度，要调整到的层高度) 调整层大小
// 41.13 Layer.routeEvent()

/* 42 Link 超文本链接 */
// 42.1 hash 指定了Link对象的URL的锚部分  只链接在文档中引用的位置
// 42.2 host 指定了Link的URL中的主机名和端口部分，例如 www.oreilly.com:1234
// 42.3 hostname 指定了Link的URL中的主机名部分 例如 www.oreilly.com
// 42.4 href 指定了Link完整URL 
// 42.5 pathname 指定了Link的URL路径部分 
// 42.6 prot 声明了Link中的端口部分
// 42.7 portocol 声明了Link的URL的协议部分
// 42.8 search 声明了Link的URL的查询部分
// 42.9 target 指定了显示链接文档的Window对象 即本页打开或者重新打开一个
// 42.10 text 声明了出现在链接标记的纯文本
// 42.11 onclick 用户点击链接是调用的处理程序
// 42.12 onmouseout 当用户把鼠标移出链接时调用的事件处理程序
// 42.13 onmouseover 当用户把鼠标移动到链接上时调用的事件处理程序 

/* 43 Location 控制浏览器的位置 */
// 43.1 location.reload() 重新装载当前文档
// 43.2 location.replace(url) 用另一个文档替换当前显示的文档

/* 44 MimeType MIME数据类型 */
// 44.1 description 提供了由MimeTyoe对象描述的数据类型的英文描述
// 44.2 enabledPlugin 对已安装的Plugin的对象的引用并启动了处理指定类型的插件
// 44.3 suffixes 存放的是一个文件名后缀的列表
// 44.4 type 声明了MIME类型的名称

/* 45 Navigtor 正在使用的浏览器的信息 */
// 45.1 appCodeName 声明了浏览器的代码名
// 45.2 appName 声明了浏览器的名字
// 45.3 appVersion 声明了浏览器的平台和版本信息
// 45.4 cookieEnabled 如果浏览器启动cookie 值为true 否则为false
// 45.5 language 声明了浏览器的版本使用的默认语言
// 45.6 mimeTypes[] 每个元素代表浏览器支持的一种MIME类型（如‘text/html’和‘image/gif’）
// 45.7 platform 声明了运行浏览器的操作系统和硬件平台
// 45.8 plugins[] 元素代表浏览器已经安装的插件
// 45.9 systemLanguage 指定了操作系统使用的默认语言
// 45.10 userAgent 声明了浏览器用于HTTP请求的用户代理头的值 
// 45.11 userLanguage 声明了用户想要使用的语言
// 45.12 navigator.javaEnabled() 检测当前的浏览器是否支持并启用了java 
// 45.13 navigator.plugins.refresh() 检测一个新安装的插件，把它插入数组plugins[] 并使用这些插件有选择的重新装载文档

/* 46 Option Select框中的一个选项 */

/* 47 Password 用于敏感数据的文本输入框 */

/* 48 Plugin 描述已安装的插件 */
// 48.1 description 包含人们可以读懂的插件说明
// 48.2 filename 声明了赢哦岸上存放插件程序的文件名
// 48.3 length 声明了该插件支持的数据格式
// 48.4 name 声明了插件的名字 

/* 49 Radio 单选框按钮 */
// 49.1 Radio.onclick 点击复选框回调

/* 50 Reset 重置表单值的按钮 */
// 50.1 Reset.onclick 点击reset按钮时调用的事件处理程序

/* 51 Screen 显示器的信息 */
// 51.1 availHeight web浏览器的屏幕的可用高度
// 51.2 availLeft 屏幕最左侧的X坐标
// 51.3 availTop 屏幕最顶部的Y坐标
// 51.4 availWidth web浏览器的屏幕的可用宽度
// 51.5 colorDepth 声明了浏览器分配的颜色数的以2为底的对数 可用于显示图像
// 51.6 height web浏览器的屏幕的高度
// 51.7 width web浏览器的屏幕的宽度
// 51.8 pixelDepth 显示浏览器的屏幕的颜色深度

/* 52 Select 图形化选项列表 */
// 52.1 length 声明了options[] 数组中的元素的个数
// 52.2 options Select元素中显示的选项
// 52.3 selectedIndex 是否被选中   seleted
// 52.4 type 声明元素类型
// 52.5 Select.onchange 改变选择时调用事件处理程序
// 52.6 Select.options[] select对象中的选项

/* 53 Style 级联样式表性质 */

/* 54 Subimt 提交表单的按钮 */
// 54.1 value 按钮上的文本
// 54.2 onclick 点击时调用

/* 55 Text 图形化文本输入框 */

/* 56 Textarea 多行本文输入框 */

/* 57 URL 参考Link Location Document.URL */

/* 58 Window web浏览器窗口或框架 */
// 58.1 closed 声明了窗口是否已经关闭 
// 58.2 defaultStatus 声明了显示在状态栏中的默认消息
// 58.3 document 对描述窗口或框架中含有的文档的Document对象的引用
// 58.4 farmes[] 每个Window对象在窗口中含有的一个框架
// 58.5 history 对窗口或框架的History对象的只读引用
// 58.6 length 窗口或框架包含的框架个数
// 58.7 location 声明了当前装载进来的文档的URL 
// 58.8 对一个对西那个的引用 包含了算术函数和常量
// 58.9 name 存放了窗口的名字 名字实在opena() 方法创建窗口时指定的
// 58.10 navigator 提供web浏览器的版本你信息和配置信息
// 58.11 opener 是对一个Window对象的引用 该对西那个含有调用了open() 方法的脚本打开顶级浏览器窗口的脚本
// 58.12 parent 包含当前的窗口或框架
// 58.13 screen 存放与屏幕有关的信息
// 58.14 self 对窗口自身的引用
// 58.15 status 声明了浏览器状态栏的当前内容
// 58.16 top 存放窗口自身的引用 
// 58.17 window 等价于self 代表自身
// Netscape属性
// 58.18 innerHeight，innerWidth 窗口的文档显示去的高度和宽度
// 58.19 java 对一个javaPackage对象的引用
// 58.20 locationbar.visible 声明窗口是否显示地址栏
// 58.21 menubar.visible 声明了窗口是否显示菜单栏
// 58.22 netscape 对一个javaPackage对象的引用
// 58.23 outerHeight，outerWidth 声明整个窗口的高度和宽度
// 58.24 Packages 对一个javapackage对象的引用
// 58.25 pageXOffset，pageYOffset 声明了当前文档想有或向下魂动过的像素数
// 58.26 Personalbar.visible 声明了窗口是否显示数千的“个人签”
// 58.27 screenX，screenY 声明了窗口左上角在屏幕上的X坐标和Y坐标
// 58.28 scrollbars.visilbe 声明窗口的滚动条是否可见
// 58.29 statusbar.visilble 声明了窗口是否有状态栏
// 58.30 sun 对一个kavaPackage对象的引用
// 58.31 toolbar.visible 声明了窗口是否显示工具栏
// Internet Explorer 属性
// 58.32 clientInformation 引用Navigator对象
// 58.33 event 存放窗口Window中最新放生的事件的详细信息
// 58.34 alert() 对话框显示细信息
// 58.35 blur() 把键盘焦点从顶层浏览器窗口中移走 
// 58.36 clearInterval() 取消周期性执行的代码
// 58.37 clearTimeout() 取消刮起超时操作
// 58.38 close() 关闭窗口
// 58.39 confirm() 用对话框询问一个问题为是或为否的问题
// 58.40 focus() 把键盘焦点给予顶层浏览器窗口
// 58.41 moveBy(右移的像素，下移的像素) 把窗口移动一个相对的数量
// 58.42 moveTo() 把窗口移动到一个绝对的位置
// 58.43 open(声明了新窗口显示的URL，新窗口的名字，显示的标准浏览器窗口的特征，声明了是在窗口的浏览历史中给装载到新页面的URL创建一个新条目) 创建并打开一个新窗口
// 58.44 print() 模拟浏览器的print按钮的点击 打印文档
// 58.45 prompt() 用对话框请求输入一个简单的字符串
// 58.46 resizeBy() 把窗口大小调整指定的数量
// 58.47 resizeTo() 把窗口大小调整到指定的大小
// 58.48 scroll() 滚动窗口中显示的文档
// 58.49 scrollBy() 让窗口滚动到指定数量
// 58.50 scrollTo() 把窗口滚动到指定的位置
// 58.51 setInterval(周期性执行的js代码/函数，执行间隔/执行间隔，/参数) 周期性执行指定的代码
// 58.52 setTimeout(要执行的js代码，延迟的事件) 在经过指定的事件后执行代码
// Netscape 方法
// 58.53 back() 同用户点击back按钮
// 58.54 captureEvent() 指定直接送该窗口的事件类型
// 58.55 forward() 模拟对浏览器的forward按钮的点击 前进到下一文档
// 58.56 handleEvent() 为给定的Event对西那个调用合适的事件处理程序
// 58.57 home() 显示浏览器主页
// 58.58 releaseEvent() 指定不再捕捉的事件类型
// 58.59 routeEvent() 将Event对象传递给下一个对它感兴趣的对象的合适的处理程序
// 58.60 stop() 模拟对浏览器的Stop按钮的点击
// Internet Explorer 方法
// 58.61 navigate() 装载并显示处指定的URL
// 58.62 onblur 当窗口失去焦点时调用的事件处理程序
// 58.63 onerror(声明了发生的错误的信息，声明了发生错误文档的URL，声明了发生错误的代码行号) 当发生javaScript错误时调用的事件处理程序
// 58.64 onfocus 当窗口获得焦点是调用的事件处理程序
// 58.65 onload 当文档完全装载进来时调用的事件处理程序
// 58.66 onmove 当移动窗口时调用的事件处理程序
// 58.67 onresize 当调整窗口大小事调用的事件处理程序
// 58.68 onunload 当浏览器离开当前文档或框架是调用的事件处理程序



/********************************************************/
/********************************************************/
/********************************************************/
/********************************************************/
/********************************************************/



// 第五部分 W3C DOM  手册

/* 1 AbstractView 显示文档的窗口 */
// 1.1 AbastractView.getComputedStyle() 或许用于渲染一个元素的CSS样式
// CSSStyleDeclaration getComputedStyle(想获取样式信息的文档的元素，CSS伪元素)

/* 2 Attr 文档元素的性质 */
// 2.1 readonly String name 性质的名字
// 2.2 readonly Element ownerElement 如果Attr对象当前没有关联到任何Element对象 值为null
// 2.3 readonly boolean specified 声明或设置 值为true 没有声明但文档的DTD设置了默认值 值为fales
// 2.4 String value 性质的值

/* 3 CDATASection XML文档中的CDATA节 */

/* 4 CharacterDate Text和Comment节点的常用功能 */
// 4.1 String data  该节点包含的文本
// 4.2 readonly unsigned long length 该节点包含的字符数
// 4.3 appendData() 将指定的字符串添加到该节点包含的文本上
// 4.4 deleteData() 从该节点删除指定的文本 指定位开始 指定数量的文本
// 4.5 insertData() 将指定字符串插入指定位置
// 4.6 replaceData() 用指定的字符串替换从指位置 指定数量的字符
// 4.7 substringData() 返回指定位置 指定数量的文本

/* 5 Comment HTML或XML注释 */

/* 6 Counter CSS counter()或 counters 规约 */
// 6.1 readonly String identifier 计算器的名字 
// 6.2 readonly String listStyle 计算器的列表样式
// 6.3 redaonly String separator 嵌套计算器的分割符字符传

/* 7 CSS2Properties 所有CSS2性质的快捷属性 */

/* 8 CSSCharsetRule  CSS样式表中的 @charset 规则 */
// 8.1 String encoding @charset规定指定的字符编码

/* 9 CSSFontFaceRule CSS样式表中的 @font-face 规则 */
// 9.1 readonly CSSStyleDeclaration style  该规则的样式集合

/* 10 CSSImportRule CSS样式表中的 @import 规则 */
// 10.1 readonly String href 导入的样式表的URL 
// 10.2 readonly MediaList media 导入的样式表应用的没提类型列表
// 10.3 readonly CSSStyleSheet styleSheet 表示导入的样式表的CSSStyleSheet对象

/* 11 CSSMediaRule CSS样式表中的 @media 规则 */
// 11.1 readonly CSSRuleList cssRules @media规则快中嵌套的所有规则的数组
// 11.2 readonly MediaList media 嵌套规则使用的媒体类型
// 11.3 deleteRule() 删除指定位置的嵌套规则
// 11.4 insertRule() 在@media规则块的指定位置插入新规则

/* 12 CSSMediaRule.deleteRule() 删除@media块中的规则 */
// index 要删除的规则在@media规则块中的位置

/* 13 CSSMediaRule.insertRule() 在@media块中插入新规则 */

/* 14 CSSPageRule CSS样式表中的@page规则 */
// 14.1 String selector Text 该规则的页选择器文本
// readonly CSSStyleDeclaration style 该规则的样式集合

/* 15 CSSPrimitiveValue 一个CSS样式值 */
// 15.1 readonly unsigned short primitiveType  该值的类型
// 15.2 getCounterValue() 对于CSS_COUNTER类型的值，返回表示该值的Counter对象
// 15.3 getFloatValue() 返回一个数字值 
// 15.4 getRectValue() 对于CSS_RECT类型的值 返回表示该值的Rect对象
// 15.5 getRGBColorValue() 对于CSS_RGBCOLOR类型的值 返回表示该值的RGBColor对象
// 15.6 getStringValue() 返回一个字符串值
// 15.7 setFloatValue() 把一个数字值设置为具体指定单位的指定数字
// 15.8 setStringValue() 把一个字符串值设置为具有指定类型的指定字符串

/* 16 CSSRule CSS样式表中的规则 */
// 16.1 String cssText 设置该属性由下列原因抛出异常
// 16.2 readonly CSSRule parentRule 包含该规则的规则
// 16.3 readonly CSSStyleSheet parentStyleSheet 包含该规则的CSSStyleSheet对象
// 16.4 readonly unsigned short type 表示CSS规则的类型

/* 17 CSSRuleList CSSRule对象的数组 */
// 17.1 readonly unsigned long length CSSRuleList数组中的CSSRule对象数
// 17.2 item() 返回指定位置的CSSRule对象 

/* 18 CSSStyleDeclaration CSS样式性质和他们值的集合 */
// 18.1 String cssText 样式性质和他们的值的文本表示
// 18.2 readonly unsigned long length 样式声明中样式性质的个数
// 18.3 readonly CSSRule parentRule 包含这个CSSStyleDeclaration对象的CSSRule对象
// 18.4 getPropertyCSSValue() 返回表示指定的CSS性质的值的CSSValue对象
// 18.5 getPropertyPriority() 声明快中明确设置了指定的CSS性质并设置了！important有限级限制符则返回“important”
// 18.6 getPropertyValue() 以字符串性质返回指定的CSS性质的值
// 18.7 item() 返回样式声明块中指定位置的CSS性质的名字 
// 18.8 removeProperty() 从声明块中删除指定的CSS性质
// 18.9 setProperty()指定的CSS性质设置为指定的字符串值并为声明块设置优先级

/* 19 CSSStyleRule CSS样式表中的一条样式规则 */
// 19.1 String selectorText 指定了样式规则的文档元素
// 19.2 readonly CSSStyleDeclaration style 应该应用到selectorText指定的元素的样式值

/* 20 CSSStyleSheet CSS样式表 */
// 20.1 readonly CSSRuleList cssRules 构成样式表的CSSRule对象的数组
// 20.2 readonly CSSRule ownerRule 
// 20.3 deleteRule() 删除指定位置的规则
// 20.4 insertRule() 在指定位置charity一个新规则

/* 21 CSSUnknownRule CSS样式表中未被承认的规则 */

/* 22 CSSValue CSS样式性质的值 */

/* 23 CSSValueList 存放CSSvalue对象的数组的CSSValue对象 */
// 23.1 readonly unsigned long length 该数组中的CSSValue对象的个数
// 23.2 item() 返回位数数组指定位置的CSSValue对象

/* 24 Document HTML文档 */
// 24.1 Document.createAttribute(新创建的性质的名字) 创建新的Attr节点
// 24.2 Document.createAttributeNS(Attr的名字空间的唯一标示符，性质的限定名) 创建具有指定名字或命名空间的Attr节点
// 24.3 Document.createCDATASection(要创建的文本)  创建新的CDATASection 节点
// 24.4 Document.createComment(要穿件的文本) 创建新的Comment节点
// 24.5 Document.createDocumentFragment(要创建的Element的标记名) 创建新的空的DocumentFragment节点
// 24.6 Document.createElementNS(新的Element的名字空间的唯一标示符，新的Element的限定名) 要创建使用指定的名字空间的新Element节点
// 24.7 Document.createEntityReference(被引用的实体的名字) 创建新的EnyityReference节点
// 24.8 Document.createEvent(获取的Event对象的事件模块名) 创建新的Event对象
// 24.9 Document.createNodelterator(便利的子树的跟节点，一个或多个NodeFilter标志的位掩码，一个可选的节点过滤函数，扩展实体的引用) 为该文档创建Nodelterator节点
// 24.10 Document.createProcessingInstruction(处理指令的目标，处理指定的内容文本) 创建ProcessingIntruction节点
// 24.11 Document.createRange() 创建Range对象
// 24.12 Document.createTextNode() 创建新的Text节点
// 24.13 Document.createTreeWalker() 为文档创建TreeWalker节点
// 24.14 Document.getElementByld(想获取的元素的ID性质的值) 查找具有指定的唯一ID的元素
// 24.15 Document.getElementsByTagName(要返回的Element节点的标记名或通配符) 返回具有指定名字的Element节点
// 24.16 Document.getElementsByTagNameNS() 返回所有具有指定名字和命名空间的Element节点
// 24.17 Document.getOverrideStyle(想要获取覆盖样式的元素，elt的伪元素) 获取指定元素的覆盖样式
// 24.18 Document.importNode() 把一个节点从另外一个文档复制到该文档以便应用

/* 25 DocumentCSS */

/* 26 DocumentEvent */

/* 27 DocumentFragemnt 邻接节点和他们的子树 */

/* 28 DocumentRange */

/* 29 DocumentStyle  */

/* 30 DocumentTraversal */

/* 31 DocumentType XML文档的DTD */

/* 32 DocumentView  */

/* 33 DOMException  通知核心DOM对象的异常或错误 */

/* 34 DOMImplementation 独立于任何特殊文档的方法 */

/* 35 DOMImpelementation.createCSSStyleSheet(样式表的标题，要应用样式表的媒体类型列表) 创建一个CSSStyleSheet对象 */

/* 36 DOMImpelementation.createDocument 创建一个新Document对象和指定的跟元素 */

/* 37 DOMImplementation.areateDocumentType() 创建一个DocumengTyoe节点 */

/* 38 DOMImplementation.createHTMLDocument() 创建提纲式的HTML文档 */

/* 39 DOMImpelmentation.hasFeature(特性名，版本号) 确定实现是否支持某个特性 */

/* 40 DOMImeplementationCSS  */

/* 41 Element 一个HTML元素或XML元素 */
// 41.1 Element.getAttribute(返回值的性质的名字) 返回指定性质的字符串值 
// 获取文档中所有图像
// var images =  document.body.getElementsByTagName("img");
// 获取第一个图像的SRC性质
// var arc0 = images[0].getAttribute("SRC");
// 通过读取属性获取第二个图像的SRC性质
// var src1 = images[1].src;
// 41.2 Element.getAttributeNode(想获取性质的名字) 返回指定性质的Attr节点
// 41.3 Element.getAttributeNodeNs(唯一标示性质) 返回具有名字空间性质的Attr节点
// 41.4 Element.getAttributeNS() 获取使用指定名字空间的性质的值
// 41.5 Element.getElementsByTagName() 找到具有指定标记名的子孙元素
// 41.6 Element.getElementsByTagNameNS() 返回具有指定名字和名字空间的子孙元素
// 41.7 Element.hasAttribute(要使用的性质的名字) 判断当前元是否具有指定的性质
// 41.8 Element.hasAttributeNS() 判断当前元素是否具有指定的性质
// 41.9 Element.removeAttribute(要删除性质的名字) 从元素中删除指定的性质
// 41.10 Element.removeAttributeNode() 从元素中删除一个Attr节点
// 41.11 Element.removeAttributeNS() 删除由名字和名字空间指定的性质 
// 41.12 Element.setAttribute() 创建或改变元素的某个性质
// 41.13 Element.setAttribuuteNode() 给元素添加新的Attr节点
// 41.14 Element.setAttrbuteNodeNS() 给Element节点添加具有名字空间的Attr节点
// 41.15 Element.setAttributeNS() 创建或改变具有名字空间的性质

/* 42 ElementCSSInlineStyle   */

/* 43 Entity XML DTD中的一个实体 */

/* 44 EntityReference 对XML DTD中定义的实体的引用 */

/* 45 Event 一个事件的信息 */
// 45.1 Event.initEvent() 初始化新Event对象的属性
// 45.2 Event.preventDefault() 取消事件的默认动作
// 45.3 Event.stopPropagation() 不再分派事件

/* 46 EventException 通知一个事件特有的异常或错误 */

/* 47 EventListener 一个事件处理函数 */
// function sunbmitHand(e){
//     if(!ValidityState(e.target)){
//         e.preventDafault();
//     }
// }
// document.forms[0].addEventListener('submit',sunbmitHand,false);

/* 48 EventTarget 事件监听器的注册方法 */
// 48.1 EventTarget.addEventListener() 注册一个事件处理程序
// 48.2 EventTarget.dispatchEvent(要分派的Event对象) 给该节点分派一个合成事件
// 48.3 EventTarget.removeEventListener() 删除一个事件监听器

/* 49 HTMLAnchorElement HTML文档中的超链接或锚 */
// 49.1 HTMLAnchorElement.blur() 把键盘焦点从超链接上移开
// 49.2 HTMLAnchorElement.focus() 使链接或锚可见，并给予它键盘焦点 

/* 50 HTMLBodyElement HTML文档的<body>标记 */

/* 51 HTMLCollection 通过位置或名字访问的HTML元素的数组 */
// 51.1 HTMLCollection.item(元素的位置) 根据位置获取元素
// 51.2 HTMLCollection.namedltem(元素的名字) 根据名字获取元素

/* 52 HTMLDocument HTML文档树的根 */
// 52.1 HTMLDocument.close() 关闭一个打开的文档，并显示它
// 52.2 HTMLDocument.getElementByld() 查找具有指定的唯一ID的元素
// 52.3 HTMLDocument.getElementByName(name性质的期望值) 找到具有指定name性质的元素
// 52.4 HTMLDocument.open() 打开一个新文档，抹去当前文档的内容
// var w = window.open(" ");
// var d = w.document;
// d.open();
// d.write("<h1>Hello world</h1>");
// d.close();
// 52.5 HTMLDocument.write() 向打开的文档加HTML文本
// 52.6 HTMLDocument.writeln() 把HTML文本和换行符添加到新打开的文档

/* 53 HTMLDOMImplementation  */

/* 54 HTMLElement 所有HTML元素的基础接口 */

/* 55 HTMLFormElement HTML文档中的<form>元素 */
// 55.1 acceptcharset 服务器可以接受的字符集
// 55.2 action 表单处理程序的URL
// 55.3 enctype 表单的编码
// 55.4 method 用于提交表单的HTTP方法
// 55.5 name 表单的名字
// 55.6 target 显示提交表单的结果的框架或窗口
// 55.7 HTMLFormElement.reset() 重置表单
// 55.8 HTMLFormElement.submit() 提交表单

/* 56 HTMLInputElement HTML表单中的输入元素 */
// 56.1 HTMLInputElement.blur() 把键盘焦点从该元素移开
// 56.2 HTMLInputElement.click() 模拟鼠标在表单元素上的点击
// 56.3 HTMLInputElement.focus() 给予该元素键盘焦点
// 56.4 HTMLInputElement.select() 选择Text元素的内容

/* 57 HTMLOptionElement HTML表单中的<select>元素中的<option>元素 */

/* 58 HTMLSelectElement HTML表单中的<select>元素 */
// 58.1 HTMLSelectElement.add() 插入一个<option>元素
// 58.2 HTMLSelectElement.blur() 把键盘焦点从该元素移走
// 58.3 HTMLSelectElement.focus() 给予元素键盘焦点
// 58.4 HTMLSelectElement.remove() 删除一个<option>元素

/* 59 HTMLTableCaptionElement HTML表中的<caption>元素 */

/* 60 HTMLTableCellElement HTML表中的<td><th>元素 */
// <td> 标签定义 HTML 表格中的标准单元格。 
// HTML 表格有两种单元格类型：
// 表头单元格 - 包含头部信息（由 <th> 元素创建）
// 标准单元格 - 包含数据（由 <td> 元素创建）
// <th> 元素中的文本通常呈现为粗体并且居中。
// <td> 元素中的文本通常是普通的左对齐文本。

/* 61 HTMLTableColElement HTML表中的<col><cokgroup>元素 */

/* 62 HTMLTableElement HTML文档中的<table> */
// 62.1 createCaption()  返回表现有的<caption>元素
// 62.2 createTFoot() 返回表现有的<tfoot>元素
// 62.3 createTHead() 返回表现有的<thead>元素
// 62.4 deleteCaption() 删除表的<caption>元素
// 62.5 deletRow() 删除表中指定位置的一行
// 62.6 deleteTFoot()删除表中的<tfoot>元素
// 62.7 deleteTHead() 删除表的<thead>元素
// 62.8 insertRow() 在表的指定位置插入一个新的空<tr>元素

/* 63 HTMLTableRowElement HTML表中的<tr>元素 */
// 63.1 deleteCell() 删除行中指定的表元 
// 63.2 insertCell() 在HTML表的一行的指定位置插入一个空的<td>元素

/* 64 HTMLTableSectionElement 表的头，脚注，主体段 */
// 64.1 deleteRow() 删除段中指定位置的列
// 64.2 inserRow() 在段的指定位置插入一个空行

/* 65 HTMLTextAreaElement HTML表单中的<textarea>元素 */
// 65.1 blur() 把键盘焦点从该元素上移开
// 65.2 focus() 把键盘焦点转移到该元素
// 65.3 select() 选中文本框的完整内容

/* 66 LinkStylr 与节点关联的样式表 */

/* 67 MediaList 样式表的媒体类型列表 */
// 67.1 appendMedium() 在列表尾部添加新的媒体类型
// 67.2 deleteMedium() 从列表中删除指定的媒体类型
// 67.3 item() 返回列表中指定位置的媒体类型 

/* 68 MouseEvent 鼠标事件的详细情况 */
// 68.1 initMouseEvent() 初始化新创建的MouseEvent对象的属性

/* 69 MutationEvent 文档变化的详细情况  */
// 69.1 initMuataionEvent() 初始化新创建的MutationEvent对象的属性

/* 70 NamedNodeMap 根据名字和位置索引的节点的集合 */
// 70.1 NamedNodeMap.getNamedltem() 根据名字查找节点
// 70.2 NamedNodeMap.getNamedltemNS() 根据名字和名字空间查找节点
// 70.3 NamedNodeMap.item() 根据位置返回NmaeNodeMap中的一个元素
// 70.4 NamedNodeMap.removeNamedltem() 根据名字删除指定的节点
// 70.5 NamaeNodeMap.removeNamedltemNS() 删除由名字空间和名字指定的节点
// 70.6 NamedNodeMap.setNamedltem() 在NameNodeMap中添加或替换一个节点
// 70.7 NamedNodeMap.setNamedltemNS() 用命名空间给NamedNodeMap添加一个节点

/* 71 Node 文档树中的一个节点 */
// 71.1 appendChild() 通过把一个节点附加到当前节点的childNodes[]数组，给文档树添加节点
// 71.2 cloneNode() 复制当前节点 
// 71.3 hasAttributes() 如果当前节点是Element节点 而且有性质 则返回true
// 71.4 hasChildNodes() 如果当前节点具有子节点则返回true
// 71.5 insetBefore() 在文档树中插入一个节点，插入到当前节点的指定子节点之前
// 71.6 isSupported() 如果当前节点支持指定特性的特定版本 则返回true
// 71.7 normalize() 通过删除当前节点的所有空Text节点合并相邻的Text节点 
// 71.8 removeChild()从文档中删除并返回指定的子节点
// 71.9 replaceChild() 从文档树中删除并返回指定的子节点 用另一个节点替换它

/* 72 NodeFilter 过滤文档书的节点的函数 */
// 72.1 acceptNode() 

/* 73 Nodelterator 遍历Document节点过滤后的序列 */
// 73.1 detach() 把当前的NodeIterator对象从它的文档中分离出来
// 73.2 nextNode() 返回NodeIterator表示的过滤后的节点序列中的下一个节点
// 73.3 previousNode() 返回NodeIterator表示的过滤后的节点序列中的前一个节点 

/* 74 NodeList 节点的只读数组 */
// 74.1 item() 返回数组的指定元素

/* 75 Notation XML DTD中的符号 */

/* 76 Processinginstruction XML文档中的处理指令 */
// 76.1 cloneContents() 返回新的DocumentFragment对象 
// 76.2 cloneRange() 创建一个新RAnge对象 表示与当前的Range对象相同的文档区域
// 76.3 collapse() 折叠该范围 使它的边界点重合 
// 76.4 compareBoundaryPoints() 比较指定范围的边界点和当前范围的边界点
// 76.5 deleteContents() 删除当前Range对象表示的文档区域
// 76.6 detach() 通知实现不再使用当前的返回，可以停止跟踪它
// 76.7 extractContents() 删除当前范围表示的文档区域
// 76.8 insertNode() 把指定的节点插入文档范围的开始点
// 76.9 selectNode() 设置该范围的边界点 是它包含指定的节点和它的所有子孙节点
// 76.10 selectNodeContents() 设置该范围的边界点 使它包含指定节点的子孙节点 但不包含指定的节点自身
// 76.11 setEnd() 把该范围的结束点设置为指定的节点和偏移量
// 76.12 setEndAfter() 把该范围的结束点设置为紧邻指定节点的节点之后
// 76.13 setEndBefore() 把该范围的结束点设置为紧邻指定节点之前
// 76.14 setStart() 把该范围的开始点设置为指定的节点中的指定偏移量
// 76.15 setStartAfter() 把该范围的开始点设置到紧邻指定节点的节点之后
// 76.16 setStartBefore() 把该范围的开始点设置到紧邻指定节点之前
// 76.17 surroundContents() 把指定的节点插入到文档范围的开始点
// 76.18 toString() 返回该范围表示的文档的文档区域的纯文本内容

/* 77 RangeException 通知发生了范围特有的异常 */

/* 78 RGBColor 一个CSS颜色值 */

/* 79 StyleSheet 任意类型的样式表 */

/* 80 StyleSheetList 样式表的数组 */
// 80.1 item() 返回数组中指定位置的StyleSheet对象

/* 81 Text HTML或XML 文档中的一系列文本 */
// 81.1 splitText() 在指定字符位置把一个Text节点分割成两个 并返回新的Text节点

/* 82 TreeWalker 遍历过滤后的文档子树 */
// 82.1 TreeWalker.firstChild() 返回没有被过滤掉的第一个子节点
// 82.2 TreeWalker.lastChild() 返回没有被过滤掉的最后一个子节点
// 82.3 TreeWalker.nextChild() 返回没有被过滤掉的下一个子节点
// 82.4 TreeWalker.nextSibling() 返回没有被过滤掉的下一个兄弟节点
// 82.5 TreeWalker.parentNode() 返回没有过滤掉的节点的最近的祖先节点
// 82.6 TreeWalker.previousNode() 返回没有被过来不掉的前一个节点
// 82.6 TreeWalker.previousSibling() 返回没有被过来不掉的前一个兄弟节点

/* 83 UIEvent 用户事件的详细情况 */
// 83.1 initUIEvent() 初始化创建的UIEvent对象的属性 

/* 84 ViewCSS  */


/********************************************************/
/********************************************************/
/********************************************************/
/********************************************************/
/********************************************************/

// 第六部分 























