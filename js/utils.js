var Utils=(function(){
	//将字符串转换成JSON数据方法： String-->JSON
    //	JSON.parse(val)
    //  $.parseJSON(val)//JQuery的方法
    //  eval('('+val+'')') 
    
	//将JSON数据转换为字符串方法: JSON-->String
    //   var last=obj.toJSONString(); 
    //   var last=JSON.stringify(obj);
    
	function toJSON(val){
		return "JSON" in window?JSON.parse(val):eval('('+val+')');
		
	}
	function toArray(likeAry){
		var ary=[];
		for(var i=0;i<likeAry.length;i++){
			ary.push(likeAry[i]);
		}
		
		return ary;		
	}
	return{
	    toJSON:toJSON,
	    toArray:toArray
	} 
	
})();
