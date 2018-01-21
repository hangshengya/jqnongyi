define(['jquery', 'mycommon'], function() {
	function page() {
		alert("进入购物车请点击右上角《我的购物车》，进入主页请点击左上角《农一网》的LOGO，谢谢")
		//获取商品信息
		var url = window.location.href;
//		http://127.0.0.1:8020/NongYiWang/html/detail_page.html?id=2
		var sid = getid(url);
		$.getJSON('../data/goods_main.json',function(res){
			var sdata = res.data[sid-1];
//			console.log(sdata)
			var simg = sdata.imgsrc;
			var stxt1 = sdata.txt1;
			var stxt2 = sdata.txt2;
			var sprice = sdata.price;
			var str = "../";
			
			console.log($('.sec_t1 #middle-img'))
			var aimg = `<div id="middle-img">
						<img src=${str+simg}>
						<div id="layer"></div>
					</div>
					<div id="image">
						<div id="small-img">
							<img src=${str+simg} class="active">
						</div>
						<div id="btn">
							<a href="##" id="leftbtn"><</a>
							<a href="##" id="rightbtn">></a>
						</div>
					</div>
					<div id="big-img">
						<img src=${str+simg}/>
					</div>`;
		
			$('.sec_t1').html(aimg);
			$('.sec_t2 h1 b').html(stxt1);
			$('.t_size a').html(stxt2);
			$('.t-price p i').html(sprice);
			//点击按钮实现商品数量加减
			var num = 1;
			$('.t_num em a').click(function(e){
				if($(e.target).html() == "+"){
					num ++;
				}else{
					num--;
					num = num<1?1:num;
				}
				$('.t_num em b').html(num);
					
			})
			console.log(num)
			//点击加入购物车
//			var obj = {};
			$('.t_num span').click(function(e){
				if($(e.target).html() == "加入购物车"){
					/*if(!obj[sid]){
						obj[sid] = num;
					}else{
						obj[sid] += num;
					}*/
					/*var obj = {
					"simg":simg,
					"stxt1":stxt1,
					"stxt2":stxt2,
					"sprice":sprice,
					"num":num
					}
					var goodsmessage = JSON.stringify(obj);
					console.log(goodsmessage)*/
					/*var f = getCookie('goods');
					console.log(f)*/
					if(getCookie(sid)){
						var inum = num + Number(getCookie(sid));
						setCookie(sid,inum,7);
						//购物车显示商品数量
						var goodsnum = getnum();
						$('.cart .count').html(goodsnum)
						function getnum(){
							if(document.cookie){
								var strcookie = document.cookie;
				//				console.log(strcookie);
								var arrcookie = strcookie.split('; ');
				//				console.log(arrcookie);
								return arrcookie.length;
							}						
						}						
					}else{
						setCookie(sid,num,7);					
					}
				}else{
					console.log(1)
				}
			})
			
			//进入购物车
			$('.search_r a').click(function(e){
				if($(e.target).attr('class') == "cart"){
					window.location.href = "shopping_cart.html";
				}
			})
		})
		
		function getid(url){
			var arr = url.split('?');
			for(var i = 0;i < arr.length;i ++){
				var arr1 = arr[i].split('=');
//				console.log(arr1)
				if(arr1[0] == "id"){
					return parseInt(arr1[1]);
				}
			}
			
		}
		
		//放大镜效果
		var obox = document.querySelector('.sec_t1'),
			omidlle_img = document.getElementById('middle-img'),
			olayer = document.getElementById('layer'),
			osmall_img = document.getElementById('small-img'),
			osimg = osmall_img.children,
			obig_img = document.getElementById('big-img'),
			oleftbtn = document.getElementById('leftbtn'),
			orightbtn = document.getElementById('rightbtn');
			console.log(omidlle_img);
		//点击按钮进行加减
		var index = 0;
		//小图宽度
		var WIDTH = 58;
		//小图一行显示的图片个数
		var num = 6;
		osmall_img.style.width = WIDTH * osimg.length + 4 * (osimg.length - 1) + 'px';

		//遍历小图，实现中图和大图的切换
		for(var i = 0; i < osimg.length; i++) {
			osimg[i].onmouseenter = function() {
				console.log(1)
				for(var j = 0; j < osimg.length; j++) {
					osimg[j].className = '';
				}
				this.className = 'active';
				omidlle_img.firstElementChild.src = this.src;
				obig_img.firstElementChild.src = this.src;
			}
		}

		//鼠标进入出现透明层
		omidlle_img.onmouseenter = function() {
			console.log(1)
			olayer.style.display = 'block';
			obig_img.style.display = 'block';
			
		}

		//鼠标移除透明层消失
		omidlle_img.onmouseleave = function() {
			console.log(1)
			olayer.style.display = 'none';
			obig_img.style.display = 'none';
		}

		//透明层的移动
		omidlle_img.onmousemove = function(ev) {
			console.log(1)
			var e = ev || window.event;
			var ix = e.pageX - obox.offsetLeft - olayer.offsetWidth / 2;
			var iy = e.pageY - obox.offsetTop - olayer.offsetHeight / 2;
//			console.log(e.pageY, obox.offsetTop, olayer.offsetHeight / 2)
//			console.log(ix, iy)
			//设置不可以超出边缘
			if(ix < 0) {
				ix = 0;
			}
			if(iy < 0) {
				iy = 0;
			}
			if(ix > omidlle_img.offsetWidth - olayer.offsetWidth) {
				ix = omidlle_img.offsetWidth - olayer.offsetWidth;
			}
			if(iy > omidlle_img.offsetHeight - olayer.offsetHeight) {
				iy = omidlle_img.offsetHeight - olayer.offsetHeight;
			}
			//		console.log(ix,iy)
			olayer.style.left = ix + 'px';
			olayer.style.top = iy + 'px';

			//大图相对中图的移动
			obig_img.firstElementChild.style.left = -ix * 2 + 'px';
			obig_img.firstElementChild.style.top = -iy * 2 + 'px';
		}

		//点击小图的左右按钮实现切换
		orightbtn.onclick = function() {
			console.log(1)
			index++;
			if(index > osimg.length - num) {
				index = osimg.length - num;
			}
			bufferMove(osmall_img, {
				left: -WIDTH * index + 20
			});
		}

		oleftbtn.onclick = function() {
			
			index--;
			if(index < 0) {
				index = 0;
			}
			bufferMove(osmall_img, {
				left: -WIDTH * index + 20
			});
		}
		
	}

	return page;
})