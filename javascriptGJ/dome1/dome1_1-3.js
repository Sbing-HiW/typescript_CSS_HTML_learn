function calculate(){  
    //贷款总额  
    //把年利率从百分比转换成十进制，并转换成月利率。  
    //还款月数  
          var principal = document.loandata.principal.value;  
          var interest = document.loandata.interest.value/100/12;  
          var payments = document.loandata.years.value*12;  

   //计算月支付额，使用了相关的数学函数。  
          var x=Math.pow(1+interest,payments);  
          var monthly=(principal*x*interest)/(x-1)  

   //检查结果是否是无穷大的数。如果不是，就显示出结果。  
          if(!isNaN(monthly)&&(monthly!=Number.POSITIVE_INFINITY)&&(monthly!=Number.NEGATIVE_INFINITY)){  
                       document.loandata.payment.value=round(monthly);  
                       document.loandata.total.value=round(monthly*payments);  
                       document.loandata.totalinterest.value=round((monthly*payments)-principal);  
               }  
          //否则，用户输入的数据是无效的，因此什么都不显示。  
           else{  
               document.loandata.payment.value="";  
               document.loandata.total.value="";  
               document.loandata.totalinterest.value="";  
           }  
   }  

   //把数字舍入成两位小数的形式。  
   function round(x){  
        return Math.round(x*100)/100;  
   }  