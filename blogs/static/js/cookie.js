//cookie中增加或修改数据
function setCookie(user,value,expires, path, domain){
	//拼接name和value
	var cookieText=encodeURIComponent(user)+"="+encodeURIComponent(value);
	//判断expires, path, domain, secure  是否传参，若没有传参则为undefined转为bol值为false,若传参则直接拼接字符串
	//判断expires是否为number类型  +"" 代表是否为number类型的字符串
	if(typeof(expires)=="number"){
		var _date=new Date();
		_date.setDate(_date.getDate()+expires)
		cookieText+=";expires="+_date;
	}
	//默认为true 不写也可以
	if(path){
		cookieText+=";path="+path;
	}
	if(domain){
		cookieText+=";domain="+domain;
	}
	document.cookie=cookieText
}
//获取cookie中数据
function getCookie(user){
	var cookieName = encodeURIComponent(user) + '=';   // 查找  user=
	var cookieStart = document.cookie.indexOf(cookieName);   //返回cookieName所在位置的索引值
	var cookieValue = null;
	//判断查找内容存在
	if(cookieStart>-1){
		//从cookiename索引值开始--找到距离cookiename最近的;(分号)
		var cookieEnd=document.cookie.indexOf(";",cookieStart);
		//为空时表示在最末尾，所以只需要整个str的长度就可以  作为查找范围
		if(cookieEnd==-1){
			cookieEnd = document.cookie.length;
		}
		cookieValue=decodeURIComponent(
	document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
	}
	return cookieValue
}
//删除cookie中的数据
function delCookie(user){
	var _date=new Date();
	_date.setDate(_date.getDate()-1000)
	document.cookie=key="value;expires =" +_date
}

