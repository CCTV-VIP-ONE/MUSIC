//提取预先编译好的json格式文件中的数据 赋值给js中定义好的变量存储
var data=(function(){
	//1.创建Ajax对象
	var oAjax;
	if(window.XMLHttpRequest){//IE8以上及新标准浏览器
		oAjax=new XMLHttpRequest();
	}else if(window.ActiveXObject){//IE8以下浏览器
		oAjax=new ActiveXObject("Microsoft.XMLHTTP");
	}else{
		alert('不升级用不了 你自己看着办~_~!');
	}
	
	if(oAjax!=null){
		//2.获取json文件路径
		oAjax.open("get","json/product.json",false);//不设定异步请求		
		//3.进行数据监听判断并返回结果
		
		oAjax.onreadystatechange=function(){		
			if(oAjax.readyState==4 && oAjax.status==200){
				//responeText数据是字符串形式 所有这里需要将字符串转换成JSON数据
				//return JSON.parse(oAjax.responseText);
				data=Utils.toJSON(oAjax.responseText);				
			}
		}
		//4.发送请求
		//发送获取json数据的请求
		oAjax.send(null);
		return data;
	}	
})();

//进行动态的数据绑定
//四种方式


//1：创建网页元素
/*
oul.innerHTML="";
for(var i=0;i<data.length;i++){
	var curLi=document.createElement("li");
	//alert(data[i].img);
	curLi.innerHTML="<img src='"+data[i].img+"'><span>"+data[i].title+"</span><span>"+data[i].time+"</span>"+
	"<span>"+data[i].hot+"</span><span>"+data[i].price+"</span>";	
	oul.appendChild(curLi);
}
*/

//2.文档碎片方法
/*
oul.innerHTML="";
var frg=document.createDocumentFragment();
for(var i=0;i<data.length;i++){
	var curLi=document.createElement("li");
	curLi.innerHTML="<img src='"+data[i].img+"'><span>"+data[i].title+"</span><span>"+data[i].time+"</span>"+
	"<span>"+data[i].hot+"</span><span>"+data[i].price+"</span>";	
	frg.appendChild(curLi);
}
oul.appendChild(frg);
frg=null;
*/

//3.字符串拼接法
/*
oul.innerHTML="";
var str="";
for(var i=0;i<data.length;i++){
	str+="<li><img src='"+data[i].img+"'><span>"+data[i].title+"</span><span>"+data[i].time+"</span>"+
	"<span>"+data[i].hot+"</span><span>"+data[i].price+"</span></li>";	
}
oul.innerHTML=str;
*/

//4.es6中模板字符串
var oul=document.getElementById("list");
var str=``;
//for(var i=0;i<data.length;i++){
//	str+=`<li data-time="${data[i].time}" data-hot="${data[i].hot}" data-price="${data[i].price}">
//   <img src='${data[i].img}'><span>${data[i].title}</span><span>${data[i].time}</span>
//	<span>${data[i].hot}</span><span>${data[i].price}</span></li>`;
//}
for(var i=0;i<data.length;i++){
	str+=`
	<div class="item" data-time="${data[i].time}" data-hot="${data[i].hot}" data-price="${data[i].price}" >
						<div class="img">
							<span class="rank">
			    			      入门级
			    		    </span>
							<img src='${data[i].img}'/>
						</div>
						<a href="" class="pic"></a>
						<a class="title">
							${data[i].title}
						</a>
						<span class="navs">
			    			约<strong class="price">￥${data[i].price}</strong>
			    			<span class="oldprice">
									<em>￥</em>
									8678.00
							</span>
			    			<span class="account">${data[i].hot}人付款</span>
						</span>
						<span class="message">
			    			${data[i].time}
			    		</span>
						<a class="store">
							共有162个商家在售
						</a>
					</div>
	`;
	
}
oul.innerHTML=str;

//定义鼠标单击排序事件
//var as=document.getElementsByTagName("a");
var as=document.getElementsByClassName("sort");
for(var i=0;i<as.length;i++){
	as[i].index=i;
	as[i].flag=1;
	as[i].onclick=function(){
		sortList.call(this);
	}
}

//定义排序事件
var oList=document.getElementsByClassName("item");
function sortList(){
	var ary=Utils.toArray(oList);
	var dataAry=["data-hot","data-time","data-price"];
	var that=this;
	ary.sort(function(a,b){
		var qian=a.getAttribute(dataAry[that.index]);
		var hou=b.getAttribute(dataAry[that.index]);
		if(that.index===1){
			qian=qian.replace("-","").replace("-","");
			hou=hou.replace("-","").replace("-","");			
		}
		return (qian-hou)*that.flag;
	});
	that.flag*=-1;
	var frg=document.createDocumentFragment();
	for(var i=0;i<ary.length;i++){
		frg.appendChild(ary[i]);
	}
	oul.appendChild(frg);
	frg=null; 

}



/*
1、使用AJAX，我们必须new一个XMLHttpRequest()的实例，在IE低版本浏览器中是ActiveXObject()。使用if语句判断即可。 

2、通过判断readyState的交互状态以及status的交互状态来触发onreadystatechange事件。
这里展开介绍一下readyState的4种取值情况：
（1）值为0：请求还没有初始化，意思是还没有开始open();
（2）值为1：请求已经初始化了但是还没有发送，意思是还没有send()；
（3）值为2：请求已经发送了，后台正在处理。
（4）值为3：请求还在处理，但是部分数据可以用了，具体什么意思我现在也不是很明白。
（5）值为4：后台服务器相应完毕，也就是你现在随时可以取得请求的数据。
但是当readyState==4时我们只能知道服务器响应完毕，但还不知道服务器有没有找到我们请求的那个文件，这时就要引用status了。
这里展开介绍一下status的几种常见取值情况：
（1）200：找到了请求的文件。
（2）404：找不到请求的文件。
（3）500：服务器出错。
在同时满足了readySate==4以及status==200时我们就可以得到我们想要的value了。
3、服务器返回的值是存在responseText对象里面的。这时我们可以使用JSON.parse()来取得里面的数据。
4、我们现在把JSON文件里的一整块数据都取了出来，但如果想取到其中的某一个块值比如说：value，就必须用到遍历，比如说for循环。这里的for循环我使用了另一种形式for(var name in obj)，这里的意思是取得对象的值，存放在变量name里面。因为JSON文件的结构就是由很多对象组成的。
5、如果是使用“GET”，则send()里面的值为null。如果是POST,则需要传具体的参数比如:send(name);
*/

