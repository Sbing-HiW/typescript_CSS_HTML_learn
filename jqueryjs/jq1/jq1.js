var div = document.getElementById("testDiv");//根据id获取单个Dom对象
var divs = document.getElementsByTagName("div");//根据HTML标签名称获取Dom对象集合


// jQuery选择器直接构造jQuery包装集
$("#testDiv");

// Dom元素转换成jQuery包装集
var div = document.getElementById("testDiv");
var domToJQueryObject = $(div);


// jQuery包装集转Dom对象
// Query包装集是一个集合, 所以我们可以通过索引器访问其中的某一个元素:
var domObject = $("#testDiv")[0];

// 通过索引器返回的不再是jQuery包装集, 而是一个Dom对象!

// jQuery包装集的某些遍历方法,比如each()中, 可以传递遍历函数, 在遍历函数中的this也是Dom元素,比如:

$("#testDiv").each(function() { alert(this) })

// 如果我们要使用jQuery的方法操作Dom对象,怎么办? 用上面介绍过的转换方法即可:

$("#testDiv").each(function() { $(this).html("修改内容") })




//  //根据ID获取jQuery包装集
var jQueryObject = $("#testDiv"); //根据ID获取jQuery包装集
var jQueryObject = $("#testDiv");

//$是jQuery对象的引用:
var jQueryObject = jQuery("#testDiv");




/* jQuery选择器 */

/* 1 基础选择器 */

//#id	         根据元素Id选择	           $("divId")     选择ID为divId的元素
//element	     根据元素的名称选择,	       $("a")         选择所有<a>元素
//.class	     根据元素的css类选择	       $(".bgRed")    选择所用CSS类为bgRed的元素
//*	             选择所有元素	               $("*")         选择页面所有元素
//selector1,     可以将几个选择器用","分隔开然后再拼成一个选择器字符串.会同时选中这几个选择器匹配的内容.	$("#divId, a, .bgRed")
//selector2,
//selectorN	





/* 2 层级选择器 */

//ancestor descendant	            使用"form input"的形式选中form中的所有input元素.               	$(".bgRed div") 选择CSS类为bgRed的元素中的所有<div>元素.
//                                  即ancestor(祖先)为from, descendant(子孙)为input.

//parent > child	                选择parent的直接子节点child.                                   $(".myList>li") 选择CSS类为myList元素中的直接子节点<li>对象.
//                                  child必须包含在parent中并且父类是parent元素.	

//prev + next	                    prev和next是两个同级别的元素.                                   $("#hibiscus+img")选在id为hibiscus元素后面的img对象.
//                                  选中在prev元素后面的next元素.	

//prev ~ siblings	                选择prev后面的根据siblings过滤的元素 注:siblings是过滤器	         $("#someDiv~[title]")选择id为someDiv的对象后面所有带有title属性的元素





/* 3 基本过滤器 */

//:first	           匹配找到的第一个元素	                    查找表格的第一行:$("tr:first")

//:last	               匹配找到的最后一个元素	                查找表格的最后一行:$("tr:last")

//:not(selector)	   去除所有与给定选择器匹配的元素         	查找所有未选中的 input 元素: $("input:not(:checked)")

//:even	               匹配所有索引值为偶数的元素，从 0 开始计数	查找表格的1、3、5...行:$("tr:even")

//:odd	               匹配所有索引值为奇数的元素，从 0 开始计数	查找表格的2、4、6行:$("tr:odd")

//:eq(index)	       匹配一个给定索引值的元素                 查找第二行:$("tr:eq(1)")
                       //注:index从 0 开始计数	

//:gt(index)	       匹配所有大于给定索引值的元素              查找第二第三行，即索引值是1和2，也就是比0大:$("tr:gt(0)")
                       //注:index从 0 开始计数	

//:lt(index)	       选择结果集中索引小于 N 的 elements       查找第一第二行，即索引值是0和1，也就是比2小:$("tr:lt(2)")
                       //注:index从 0 开始计数	

//:header	           选择所有h1,h2,h3一类的header标签.	    给页面内所有标题加上背景色: $(":header").css("background", "#EEE");

//:animated	           匹配所有正在执行动画效果的元素          	只有对不在执行动画效果的元素执行一个动画特效:
                                                            //$("#run").click(function(){
                                                              //$("div:not(:animated)").animate({ left: "+=20" }, 1000);
                                                            //});


/* 4 内容过滤器 */

//:contains(text)	        匹配包含给定文本的元素	                查找所有包含 "John" 的 div 元素:$("div:contains('John')")
//:empty	                匹配所有不包含子元素或者文本的空元素	    查找所有不包含子元素或者文本的空元素:$("td:empty")
//:has(selector)	        匹配含有选择器所匹配的元素的元素	        给所有包含 p 元素的 div 元素添加一个 text 类: $("div:has(p)").addClass("test");
//:parent	                匹配含有子元素或者文本的元素 	        查找所有含有子元素或者文本的 td 元素:$("td:parent")




/* 5 可见性过滤器 */ 
 
//:hidden                   匹配所有的不可见元素                   查找所有不可见的 tr 元素:$("tr:hidden")
//                          注:在1.3.2版本中, hidden匹配自身或者父类在文档中不占用空间的元素.如果使用CSS visibility属性让其不显示但是占位,则不输入hidden.

//:visible	                匹配所有的可见元素	                    查找所有可见的 tr 元素:$("tr:visible")



/* 6 属性过滤器 */

//[attribute]	               匹配包含给定属性的元素	                查找所有含有 id 属性的 div 元素:
//                                                                  $("div[id]")

//[attribute=value]	           匹配给定的属性是某个特定值的元素	        查找所有 name 属性是 newsletter 的 input 元素:
//                                                                  $("input[name='newsletter']").attr("checked", true);

//[attribute!=value]	       匹配给定的属性是不包含某个特定值的元素	    查找所有 name 属性不是 newsletter 的 input 元素:
//                                                                  $("input[name!='newsletter']").attr("checked", true);
 
//[attribute^=value]	       匹配给定的属性是以某些值开始的元素	        $("input[name^='news']")

//[attribute$=value]	       匹配给定的属性是以某些值结尾的元素	        查找所有 name 以 'letter' 结尾的 input 元素:
//                                                                  $("input[name$='letter']")

//[attribute*=value]	       匹配给定的属性是以包含某些值的元素         查找所有 name 包含 'man' 的 input 元素:
//                                                                  $("input[name*='man']")

//[attributeFilter1]           复合属性选择器，需要同时满足多个条件时使用。	找到所有含有 id 属性，并且它的 name 属性是以 man 结尾的:
//[attributeFilter2]                                                $("input[id][name$='man']")
//[attributeFilterN]	


/* 7 子元素过滤器 */

//:nth-child(index/even/odd/equation)                                在每个 ul 查找第 2 个li: $("ul li:nth-child(2)")
//匹配其父元素下的第N个子或奇偶元素
//':eq(index)' 只匹配一个元素，而这个将为每一个父元素匹配子元素。
//:nth-child从1开始的，而:eq()是从0算起的！
//可以使用:
//nth-child(even)
//:nth-child(odd)
//:nth-child(3n)
//:nth-child(2)
//:nth-child(3n+1)
//:nth-child(3n+2)

//:first-child                 匹配第一个子元素                                              在每个 ul 中查找第一个 li:
//                             ':first' 只匹配一个元素，而此选择符将为每个父元素匹配一个子元素      $("ul li:first-child")


//:last-child	               匹配最后一个子元素                                             在每个 ul 中查找最后一个 li:
//                             ':last'只匹配一个元素，而此选择符将为每个父元素匹配一个子元素        $("ul li:last-child")


//:only-child                  如果某个元素是父元素中唯一的子元素，那将会被匹配                    在 ul 中查找是唯一子元素的 li:
//                             如果父元素中含有其他元素，那将不会被匹配。                         $("ul li:only-child")



/* 8 表单选择器 */
//:input	                   匹配所有 input, textarea, select 和 button 元素	               查找所有的input元素:
//                                                                                         $(":input")

//:text	                       匹配所有的文本框	                                           查找所有文本框:
//                                                                                         $(":text")

//:password	                   匹配所有密码框	                                               查找所有密码框:
//                                                                                         $(":password")

//:radio	                   匹配所有单选按钮	                                           查找所有单选按钮

//:checkbox	                   匹配所有复选框	                                               查找所有复选框:
//                                                                                         $(":checkbox")

//:submit	                   匹配所有提交按钮	                                           查找所有提交按钮:
//                                                                                         $(":submit")

//:image	                   匹配所有图像域                                                 匹配所有图像域:
//                                                                                          $(":image")

//:reset	                   匹配所有重置按钮	                                            查找所有重置按钮:
//                                                                                          $(":reset")

//:button	                   匹配所有按钮	                                                查找所有按钮:
//                                                                                          $(":button")

//:file	                       匹配所有文件域	                                                查找所有文件域:
//                                                                                          $(":file")



/* 9 表单过滤器 */

//:enabled	                   匹配所有可用元素                                                查找所有可用的input元素:
//                                                                                          $("input:enabled")

//:disabled	                   匹配所有不可用元素	                                            查找所有不可用的input元素:
//                                                                                          $("input:disabled")

//:checked	                   匹配所有选中的被选中元素(复选框、单选框等，不包括select中的option)	查找所有选中的复选框元素:
//                                                                                          $("input:checked")

//:selected	                   匹配所有选中的option元素                                      	查找所有选中的选项元素:
//                                                                                          $("select option:selected")




    // var select = document.createElement("select");
    // select.options[0] = new Option("加载项1", "value1");
    // select.options[1] = new Option("加载项2", "value2");
    // select.size = "2";
    // var object = testDiv.appendChild(select);


  //  $("<div style=\"border:solid 1px #FF0000\">动态创建的div</div>")





/* jQuery包装集元素 */
/* 1 过滤 */

//eq( index )           获取第N个元素                                                                     获取匹配的第二个元素: $("p").eq(1)

//filter( expr )        筛选出与指定表达式匹配的元素集合。                                                    保留带有select类的元素: $("p").filter(".selected")
 
//filter( fn )          筛选出与指定函数返回值匹配的元素集合                                                  保留子元素中不含有ol的元素: 
//                      这个函数内部将对每个对象计算一次 (正如 '$.each').                                     $("div").filter(function(index)                        
//                      如果调用的函数返回false则这个元素被删除，否则就会保留。                                 {return $("ol", this).size()== 0;});


//is( expr )            用一个表达式来检查当前选择的元素集合，如果其中至少有一个元素符合这个给定的表达式就返回true。   由于input元素的父元素是一个表单元素，所以返回true:
//                      如果没有元素符合，或者表达式无效，都返回'false'. 'filter' 内部实际也是在调用这个函数，      $("input[type='checkbox']").parent().is("form")  
//                      所以，filter()函数原有的规则在这里也适用。


//map( callback )	    将一组元素转换成其他数组（不论是否是元素数组）                                          把form中的每个input元素的值建立一个列表:
//                      你可以用这个函数来建立一个列表，不论是值、属性还是CSS样式，                               $("p").append($("input").map(function(){ return $(this).val();}).get().join(", ") );
//                      或者其他特别形式。这都可以用'$.map()'来方便的建立

//not( expr )           删除与指定表达式匹配的元素                                                           从p元素中删除带有 select 的ID的元素:
//                                                                                                       $("p").not( $("#selected")[0] )
                  
//slice( start, end )   选取一个匹配的子集                                                                  选择第一个p元素:$("p").slice(0, 1);



/* 2 查找 */

//add( expr )	        把与表达式匹配的元素添加到jQuery对象中。这个函数可以用于连接分别与两个表达式匹配的元素结果集。  动态生成一个元素并添加至匹配的元素中:
//                                                                                                       $("p").add("<span>Again</span>")

//children( [expr] )    取得一个包含匹配的元素集合中每一个元素的所有子元素的元素集合。                              查找DIV中的每个子元素:
//                      可以通过可选的表达式来过滤所匹配的子元素。注意：parents()将查找所有祖辈元素，                $("div").children()
//                      而children()只考虑子元素而不考虑所有后代元素。
     
//closest( [expr] )     取得与表达式匹配的最新的父元素                                                         为事件源最近的父类li对象更换样式:
//                                                                                                        $(document).bind("click", function (e) {
//                                                                                                           $(e.target).closest("li").toggleClass("hilight");
//                                                                                                        });


//contents( )           查找匹配元素内部所有的子节点（包括文本节点）。如果元素是一个iframe，则查找文档内容             查找所有文本节点并加粗:
//                                                                                                        $("p").contents().not("[nodeType=1]").wrap("<b/>");


//find( expr )          搜索所有与指定表达式匹配的元素。这个函数是找出正在处理的元素的后代元素的好方法                  从所有的段落开始，进一步搜索下面的span元素。与$("p span")相同:
//                      所有搜索都依靠jQuery表达式来完成。这个表达式可以使用CSS1-3的选择器语法来写。                  $("p").find("span")
    

//next( [expr] )        取得一个包含匹配的元素集合中每一个元素紧邻的后面同辈元素的元素集合。                          找到每个段落的后面紧邻的同辈元素：
//                      这个函数只返回后面那个紧邻的同辈元素，而不是后面所有的同辈元素（可以使用nextAll）。             $("p").next()
//                      可以用一个可选的表达式进行筛选。


//nextAll( [expr] )     查找当前元素之后所有的同辈元素。可以用表达式过滤                                            给第一个div之后的所有元素加个类:
//                                                                                                          $("div:first").nextAll().addClass("after");

//offsetParent( )       返回第一个有定位的父类(比如(relative或absolute)).

//parent( [expr] )      取得一个包含着所有匹配元素的唯一父元素的元素集合。                                          查找每个段落的父元素: $("p").parent()
//                      你可以使用可选的表达式来筛选。

//prev( [expr] )        取得一个包含匹配的元素集合中每一个元素紧邻的前一个同辈元素的元素集合。                          找到每个段落紧邻的前一个同辈元素:
//                      可以用一个可选的表达式进行筛选。只有紧邻的同辈元素会被匹配到，而不是前面所有的同辈元素。           $("p").prev()
 









