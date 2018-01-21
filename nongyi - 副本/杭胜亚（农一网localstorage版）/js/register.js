$(function(){
	
	var 	
		otel = document.getElementById('tel'),
		ocode = document.getElementById('imgcode'),
		oscode = document.getElementsByClassName('codes')[0],
		otelcode = document.getElementById('telcode'),
		oscode2 = document.getElementById('scode2'),	
		opass1 = document.getElementById('pass1'),
		opass2 = document.getElementById('pass2'),
		obtn1 = document.getElementById('exchange'),
		obtn2 = document.getElementById('put');
	
	var bg1 = document.getElementsByClassName('zc1')[0].getElementsByTagName('span')[0];
	var bg2 = document.getElementsByClassName('zc4')[0].getElementsByTagName('span')[0];
	var p1 = document.getElementsByClassName('zc1')[0].getElementsByTagName('p')[0];
	var p2 = document.getElementsByClassName('zc2')[0].getElementsByTagName('p')[0];
	var p3 = document.getElementsByClassName('zc3')[0].getElementsByTagName('p')[0];
	var p4 = document.getElementsByClassName('zc5')[0].getElementsByTagName('p')[0];
	console.log(bg1);
	console.log(bg2);
	console.log(p1);
	console.log(p2);

	//封装账号密码验证
	function verify(arr){
		//用于判断注册是否成功
		var obtn = true;
		//用于判断所有的注册信息是否规范
		for(var i = 0;i < arr.length;i ++){
			switch(i){
				case 0:	
					var reg = /^1[34578]\d{9}$/;//1,34578开头的11位号码
					if(!reg.test(arr[0])){
						bg1.style.display = 'inline-block';
						p1.style.display = 'block';
						obtn = false;
					};
					break;
				case 1:
					if(arr[1]!=oscode.innerHTML){
						p2.style.display = 'block';
						obtn = false;
					}
					break;
					
				case 2:
					if(arr[2]!=oscode2.innerHTML){
						p3.style.display = 'block';
						obtn = false;
					};
					break;
					
				case 3:
					var reg = /^[\w]{6,12}$/;//6-12位字母、数字和下划线
					if(!reg.test(arr[3])){
						bg2.style.display = 'inline-block';
						obtn = false;
					};
					break;
				case 4:
					if(arr[4]!=arr[3]){
						p4.style.display = 'block';
						obtn = false;
					};
					break;
			}
		}
		//若所有注册信息正确，则执行
		if(obtn){
			var name = arr[0],
				pass = arr[3],
				obj = {};//将账户密码转成对象格式
			obj.name = name,
			obj.pass = pass;
			var str = JSON.stringify(obj);//再将对象装成JSON字符串格式
			setCookie('Message',str,1);
			alert('注册成功');
		}	
	}
	//刷新页面即生成验证码
	console.log(autoNum())
	console.log(oscode)
	oscode.innerHTML = autoNum();
	
	//点击生成验证码
	obtn1.onclick = function (){
		oscode.innerHTML = autoNum();
	}
	
	//点击生成手机验证码
	oscode2.onclick = function(ev){
		var e = ev || window.event;
		e.preventDefault?e.preventDefault():e.returnValue = false;
		oscode2.innerHTML = autoNum();
	}
	
	//点击提交注册信息
	obtn2.onclick = function(ev){
		var e = ev || window.event;
		e.preventDefault?e.preventDefault():e.returnValue = false;
		//将注册信息转成数组，传入封装函数
		var arr = [otel.value,ocode.value,otelcode.value,opass1.value,opass2.value];
		verify(arr);
	}
	
})
