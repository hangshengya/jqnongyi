$(function(){
	var otxt1 = document.getElementById('sname'),
		otxt2 = document.getElementById('spass'),
		ocode1 = document.getElementById('scode'),
		ocode2 = document.getElementsByClassName('icode')[0],
		ocodebtn = document.getElementById('cdchange'),
		op = document.querySelector('.sec .dl .code p'),
		obtn = document.getElementById('submit');
 
	//随机生成验证码
	ocode2.innerHTML = autoNum();
	
	//点击切换验证码
	ocodebtn.onclick = function (){
		ocode2.innerHTML = autoNum();
	}
	
	//点击登录触发事件
	obtn.onclick = function (){	
		if(!getCookie("Message")){
			alert("请先注册");
		}else{
			var itxt1 = otxt1.value,
				itxt2 = otxt2.value,
				icode = ocode1.value;
		
			//将cookie字符串转化为对象
			var obj = JSON.parse(getCookie("Message"));
			var name = obj.name;
			var pass = obj.pass;
		    
		    //若账号密码正确,登录成功
			if(itxt1 == name && itxt2 == pass && icode == ocode2){
				op.style.display = 'none';
				alert('登录成功');
			}else if(icode != ocode2.innerHTML){
				op.style.display = 'block';
			}else if(icode == ocode2.innerHTML){
				op.style.display = 'none';
				console.log(1)
				alert('用户名或者密码错误');
			}else{
				console.log(2)
				alert('用户名或者密码错误');
			}
		}
		
		
	}
	
})

