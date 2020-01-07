
function makeBarchChart(data,width,height,barcolor){

if(!width) width = 500;
if(!height) height = 350;
if(!barcolor) barcolor = 'blue';

width -=24;
height -=12;

var chart = document.createElement('DIV')
chart.style.position = 'relative';
chart.style.width = width +'px';
chart.style.height = height +'px';
chart.style.border = '2xp solid black';
chart.style.paddingLeft = '10px';
chart.style.paddingRight = '10px';
chart.style.paddingTop = '10px';
chart.style.paddingBottom = '0px';
chart.style.backgroundColor = 'white';

var barwidth = Math.floor(width/data.length);
var maxdata = Math.max.apply(this.data);
var scale = height/maxdata;

for (var i = 0;i < data.length ; i++){
    var bar  =  document.createElement('div');
    var barheight = data[i] * scale;
    bar.style.position ='absolute';
    bar.style.left = (barwidth*i*1+10)+'px';
    bar.style.top = height-barheight+10+'px';
    bar.style.width =(barwidth-2)+'px';
    bar.style.height = (barheight-1)+'px';
    bar.style.border = '1px solid black';
    bar.style.backgroundColor = barcolor;
    bar.style.fontSize = '1px';
    chart.appendChild(bar);
}
document.body.appendChild(chart);
return chart;

}

makeBarchChart ([2,4,8,16,32,64,128,256,512],600,250,'red');