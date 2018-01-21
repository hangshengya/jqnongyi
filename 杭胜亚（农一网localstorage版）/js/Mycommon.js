
//获取offsetLeft、offsetTop值
function getOffset (val){
		var obj = {};
		obj.x = val.offsetLeft;
		obj.y = val.offsetHeight;
		while(val.offsetParent){
			var val = val.offsetParent;
			obj.x += val.offsetLeft;
			obj.y += val.offsetTop;
		}
		return obj;
}

//获取元素样式
function getStyle(obj,sAttr){
	if(obj.currentStyle){
		return obj.currentStyle[sAttr];
	}else{
		return getComputedStyle(obj,false)[sAttr];
	}
}

// 时间转字符串
function DateToString (date){
		return date.getFullYear() + '/' + addZero(date.getMonth()+1) + '/' + addZero(date.getDate()) + ' ' + addZero(date.getHours()) + ':' + addZero(date.getMinutes()) + ':' + addZero(date.getSeconds());
	}
	
function addZero (num){
	num = '' + num;
	return num = num.length < 2 ? '0' + num : num;
}

//设置Cookie
function setCookie(sname,svalue,sdate){
	svalue = encodeURIComponent(svalue);
	var date = new Date();
	date.setDate(date.getDate()+sdate);
	document.cookie = sname + '=' + svalue + ';expires='+date;
}

//获取Cookie
function getCookie(sname){
	
	var str = document.cookie;
	var arr = str.split("; ");
	for(var i = 0;i < arr.length;i ++){
		var arr1 = arr[i].split("="); 
		if(arr1[0] == sname){
			return decodeURIComponent(arr1[1]);
		}
	}
}

//删除Cookie
function moveCookie(sname){
	setCookie(sname,1,-1);
}

//封装4位验证码
function autoNum(){
	var str = '';
	var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	for(var i = 0;i < 4;i ++){
		var num = Math.floor(Math.random()*62);
		str += arr[num]
	}
	return str;
}

//获取元素属性值
function getStyle(obj, sAttr) {
	if(obj.currentStyle) {
		return obj.currentStyle[sAttr];
	} else {
		return getComputedStyle(obj, false)[sAttr];
	}
}
//缓冲运动
function bufferMove(obj, target, fn) {
	clearInterval(obj.iTimer);

	obj.iTimer = setInterval(function () {
		var bBtn = true;
		for(var sAttr in target) {
			if(sAttr === 'opacity') {
				var iCur = Math.round(parseFloat(getStyle(obj, 'opacity')) * 100);
			} else {
				var iCur = Math.round(parseFloat(getStyle(obj, sAttr)));
			}

			var iSpeed = (target[sAttr] - iCur) / 8;

			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

			var iNext = iCur + iSpeed;


			if(sAttr === 'opacity') {
				obj.style.opacity = iNext / 100;
				obj.style.filter  = 'alpha(opacity=' + iNext + ')';
			} else {
				obj.style[sAttr] =  iNext + 'px';
			}


			if(iNext !== target[sAttr]) {
				bBtn = false;
			}
		}


		if(bBtn === true) {
			clearInterval(obj.iTimer);
			if(fn) {
				fn();
			}
		}
	}, 50);
}
