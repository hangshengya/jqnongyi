define(['jquery','mycommon'],function(){
	function index(){
		alert('只有后面的商品设置了购物车功能，请点击《更多商品》里的商品,在页面的最后，谢谢');
		//点击转到购物车
		$('.cart').click(function(){
			window.location.href = "html/shopping_cart.html";
		})
		//二级菜单
		ajax({
			url: 'http://localhost:8001/homelist3',
			success: function (res) {
				var Arr3 = JSON.parse(res);
				console.log(Arr3[0])
				data("data1",".ls1");
				data("data2",".ls2");
	
				function data(data,ls){
	//				console.log(res)
					var arr = Arr3[0][data].map(function(v){
		//				console.log(v);
		
						var odd ='';
						var oul = '';
						var oli = '';
						for(var i = 0;i < v.s.length;i ++){
							var str1 = '';		
							var oa = '';
							for(var j = 0;j < v.s[i].t.length;j ++){
								var otxt = v.s[i].t[j];
		//						console.log(otxt);
								oa += `<a href="##">${otxt}</a>`
							}
							
							str1 = `<span> ${v.s[i].s}</span>`;
							oli += `<li>${str1}<i>${oa}</i></li>`;
		//					console.log(oli)
						}
						oul += `<ul class="menu">${oli}</ul>`;
						odd += `<dd><a href="##">${v.r}</a>${oul}</dd>`;
	//					console.log(odd)
						$(ls).append(odd)				
					})
			
				}
			}
		})
		
		//轮播图
		var obox = document.querySelector('.nav_r'),
			oview = document.querySelector('.view'),
			conbtn = document.querySelector('.con-btn'),
			leftbtn = document.querySelector('.leftbtn'),
			rightbtn = document.querySelector('.rightbtn'),
			botbtn = document.querySelector('.bot-btn'),
			oa = botbtn.children,
			oli = oview.children;
		var index = 0;
		var sindex = 0;
		var WIDTH = 1010;
		var itimer = null;
		
		//鍏嬮殕绗竴寮犲浘鐗�
		var li = oli[0].cloneNode(true);
		oview.appendChild(li);
		oview.style.width = WIDTH * oli.length + 'px';
		
//		console.log(oview);
		obox.onmouseenter = function(){
			conbtn.style.display = 'block';
			clearInterval(itimer);
		}
		
		obox.onmouseleave = function(){
			conbtn.style.display = 'none';
			auto();
		}
		
		rightbtn.onclick = function(){
			index ++;
			if(index > oli.length-1){
				oview.style.left = 0;
				index = 1;
			}
			bufferMove(oview,{left:-index*WIDTH});
			
			sindex ++;
			if(sindex > oa.length - 1){
				sindex = 0;
			}
			for(var i = 0;i < oa.length;i ++){
				oa[i].className = '';
			}
			oa[sindex].className = 'bg';
		}
		
		leftbtn.onclick = function(){
			index --;
			if(index < 0){
				oview.style.left = - (oli.length - 1)*WIDTH + 'px';
				index = oli.length - 2;
			}
			bufferMove(oview,{left:-index*WIDTH});
			
			sindex --;
			if(sindex < 0){
				sindex = oa.length - 1;
			}
			for(var i = 0;i < oa.length;i ++){
				oa[i].className = '';
			}
			oa[sindex].className = 'bg';
		}
		
		for(var i = 0;i < oa.length;i ++){
			oa[i].index = i;
			oa[i].onmouseenter = function (){
				for(var i = 0;i < oa.length;i ++){
					oa[i].className = '';
				}
				this.className = 'bg';
				bufferMove(oview,{left:-this.index * WIDTH})
			}
		}
		
		auto();
		function auto(){
			itimer = setInterval (function(){
				index ++;
				if(index > oli.length-1){
					oview.style.left = 0;
					index = 1;
				}
				bufferMove(oview,{left:-index*WIDTH});
				
				sindex ++;
				if(sindex > oa.length - 1){
					sindex = 0;
				}
				for(var i = 0;i < oa.length;i ++){
					oa[i].className = '';
				}
				oa[sindex].className = 'bg';
			},5000)
		}
		
		//大商品列表
		ajax({
			url: 'http://localhost:8001/homelist',
			success: function (res) {
				var Arr = JSON.parse(res);
//				console.log(Arr[0].data)
				var arr = Arr[0].data.map(function(v){
//				console.log(v);
				return `<div class="buys">
						<div class="image">
							<img src=${v.imgsrc}>
						</div>
//						<a href="##" sid=${v.id}>${v.txt1}</a>
						<p>${v.txt2}</p>
						<h3><span>${v.price}</span>元/件</h3>						
					</div>`
				})
	//			console.log(arr);
				$('.big7 .buy').html(arr);
				$('.big7 .buys a').click(function(e){
					
					var goodsid = $(e.target).attr("sid");
					console.log(goodsid)
					/*var sdata = res.data[goodsid-1];
					var simg = sdata.imgsrc;
					var stxt1 = sdata.txt1;
					var stxt2 = sdata.txt2;
					var sprice = sdata.price;
					var obj = {
						simg:simg,
						stxt1:stxt1,
						stxt2:stxt2,
						sprice:sprice
					}
					var goodsmessage = JSON.stringify(obj);
					setCookie('goods',goodsmessage,7)*/
					window.location.href = "html/detail_page.html?id="+goodsid;
				})
				
			}
		})
		
		//小商品列表
		ajax({
			url: 'http://localhost:8001/homelist2',
			success: function (res) {
				var Arr1 = JSON.parse(res);
//				console.log(Arr1[0].data);
				var arr = Arr1[0].data.map(function(v){
//					console.log(v)
					var str1 = '';
					var str2 = '';
					for(var i = 0;i < v.imgsrc3.length;i ++){
						str2+=`<li>
									<a href="##">${v.txt1[i]}</a>
									<p>${v.txt2[i]}</p>
									<h3>￥<span>${v.price[i]}</span>元/件</h3>
									<img src=${v.imgsrc3[i]}>
								</li>`
					}
					str1+=`<div class="fig1">
						<h2>${v.head}<a href="##">更多</a></h2>
						<div class="goods">
							<a href="##"><img src=${v.imgsrc1}></a>
							<ul class="list">
								<li><a href="##"><img src=${v.imgsrc2}></a></li>
								${str2}
							</ul>
						</div>
					</div>`;
					$('.big6 figure').append(str1);
				})
				
			}
		})		
				
	}
	
	return index;
	
})