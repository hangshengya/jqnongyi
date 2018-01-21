$(function(){
	//购物车显示商品数量
		$('.cart .count').html(getnum())
		function getnum(){
			if(document.cookie){
				var strcookie = document.cookie;
//				console.log(strcookie);
				var arrcookie = strcookie.split('; ');
//				console.log(arrcookie);
				return arrcookie.length;
			}
			
		}
})
