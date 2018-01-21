define(['jquery','mycommon'],function(){
	function cart(){
		if(!document.cookie){
			$('.kong').css('display','block');
			$('.cart').css('display','none');
			$('.kong a').click(function(e){
				if($(e.target).html() == "首页"){
					window.location.href = "../index.html";
				}
			})
			
		}else{
			var arrid = getId();
//			console.log(arrid);
			getValue();
			//根据ID获取从接口获取数据
			function getValue(){
				$.getJSON('../data/goods_main.json',function(res){
//					console.log(res)
					for(var i = 0;i < arrid.length;i ++){
//						console.log(i)
						var sdata = res.data[arrid[i]-1];
//						console.log(sdata)
						var simg = sdata.imgsrc;
						var stxt1 = sdata.txt1;
						var stxt2 = sdata.txt2;
						var sprice = sdata.price.slice(1);
						var snum = getCookie(sdata.id);
						var allprice = (sprice*snum).toFixed(2);
						var str = "../";
		
						var otr = `<tr data-id=${arrid[i]}>
									<td><input type="checkbox" class="checked"></td>
									<td>
										<div class="cs_s">
											<a href="##"><img src=${str+simg}/></a>
											<div class="_sx">
												<a href="##">
			${stxt1}</a>
												<p>${stxt2}</p>
												
											</div>
										</div>
									</td>
									<td class="unit_price">${sprice}</td>
									<td>
										<input type="text" value=${snum} class="goods_num">
										<span id="reduce" class="btn_cart">-</span>
										<span id="add" class="btn_cart">+</span>
									</td>
									<td class="total_prices">${allprice}</td>
									<td><a href="##">删除</a></td>
								</tr>`;
						$('table').append(otr);
						
					}
					
					//点击全选计算总价
//					console.log($('table').children())
					$('#allchange').click(function(){
						if($(this).prop('checked')){
							$('tr').find('.checked').prop('checked',true);
							allprice1();
						}else{
							$('tr').find('.checked').prop('checked',false);
							var a = 0;
							$('.all_price').html(a.toFixed(2));
						}					
					})
					//点击商品复选框取消全选
					$('.checked').click(function(){
						if(!$(this).prop('checked')){
							$('#allchange').prop('checked',false);
						}
					})
					
					//点击复选框计算总价
					$('.checked').click(function(){
						console.log(1);
						allprice1();
					})
					
					function allprice1(){
						var price = $('.total_prices');
						var num_p = 0;
						for(var j = 0;j < price.length;j ++){
							console.log(price.eq(j).parent().find('.checked').attr('checked'))
							if(price.eq(j).parent().find('.checked').prop('checked')){
								num_p += Number(price.eq(j).html()) ;
								console.log(num_p)
							}
						}
						$('.all_price').html(num_p.toFixed(2));
					}
						
						
					//点击计算商品小计和总计
					$('.cart td span').click(function(e){
						
						if($(e.target).html() == "+"){
							var onum = $(this).parent().find('.goods_num').val();						
							onum ++;
							$(this).parent().find('.goods_num').val(onum);
							var unit_price =  $(this).parent().parent().find('.unit_price').html();
							var total_prices = (onum * unit_price).toFixed(2);
							$(this).parent().parent().find('.total_prices').html(total_prices);
						}else{
							var onum = $(this).parent().find('.goods_num').val();						
							onum --;
							if(onum < 1){onum = 1;}
							$(this).parent().find('.goods_num').val(onum);
							var unit_price =  $(this).parent().parent().find('.unit_price').html();
							var total_prices = (onum * unit_price).toFixed(2);
							$(this).parent().parent().find('.total_prices').html(total_prices);
						}
						allprice2();
						function allprice2(){
							var price = $('.total_prices');
							var num_p = 0;
							for(var j = 0;j < price.length;j ++){
//								console.log(price.eq(j).parent().find('.checked').attr('checked'))
								if(price.eq(j).parent().find('.checked').prop('checked')){
									num_p += Number(price.eq(j).html()) ;
									console.log(num_p)
								}
							}
							$('.all_price').html(num_p.toFixed(2));
						}
					})
					
					//点击删除商品
					$('.cart td a').click(function(e){
						if($(e.target).html() == "删除"){
							var tr_id = $(this).parent().parent().attr('data-id');
							console.log(tr_id);
							moveCookie(tr_id);
							$(this).parent().parent().remove();							
//							console.log($('.cart table').children().children().length)
							if($('.cart table').children().children().length == 1){
								$('.cart').remove();
								$('.kong').css('display','block');
							}
						}
					})
					
				})
			}
			//获取cookie中的商品ID
			function getId(){
				var ArrId = []; 
				var strcookie = document.cookie;
//				console.log(strcookie);
				var arrcookie = strcookie.split('; ');
//				console.log(arrcookie);
				for(var i = 0;i < arrcookie.length;i ++){
					var arr1 = arrcookie[i].split("=");
					ArrId.push(arr1[0]);
				}
				return ArrId;
			}
			
			//点击继续购物
			$('#continue').click(function(){
				window.location.href = "../index.html";
			})
		}
		
	}
	return cart;
})