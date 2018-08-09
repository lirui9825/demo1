$(function(){

	//导航栏的下滑
	$(".list>li").not(".fir").mouseover(function(){
		$(this).find(".lizi").stop().slideDown(300);	
	}).stop().mouseout(function(){
	$(this).find(".lizi").stop().slideUp(300);
	})

	//导航栏二级菜单
	$(".lichild li").click(function(){
		var i=$(this).attr("id");
		document.location.href="list.html?id="+i;
	})


	//判断是否有人登陆
	var keya="username";
	// var value=JSON.stringify("");
	// localStorage.setItem(keya,value);
	var val=JSON.parse(localStorage.getItem(keya));
	//console.log(val)
	if(val){
		$(".huan").html("您好,"+val);
		$("#hhh").children().eq(0).html("<a href='' id='exit'>退出登陆</a>");
		$("#hhh").children().eq(2).html("<a href='login.html'>更换用户</a>");
		$("#exit").click(function(){
			var value=JSON.stringify("");
			localStorage.setItem(keya,value);
		})
	}else{
		$(".huan").html("您好，欢迎光临凡客诚品！");
		$("#hhh").children().eq(0).html('<a href="login.html" id="login">登录</a>');
		$("#hhh").children().eq(2).html('<a href="reg.html">注册</a>');
	}


	//判断购物车
	var key="Goods";
	var arr1=JSON.parse(localStorage.getItem(key));
	var key1="username";
	var username=JSON.parse(localStorage.getItem(key1));
	var obj={};
	obj.username=username;
	var arr=[];
	for(var i=0;i<arr1.length;i++){
		if(arr1[i].username==username){
			arr=arr1[i].message;
		}
	}
	console.log(1)
	console.log(arr);
	if(localStorage.getItem(key)){
		if(arr.length==0){
		$(".num").html("0");
		$(".gounum").html("您的购物车中没有任何商品！")
	}else{
		var span=$("<span class='have'>最近加入的商品：</span>");
		span.appendTo($(".gounum"));
		var div=$("<div id='lie'></div>");
		div.appendTo($(".gounum"));
		var num=0;
		var str="";
		var sum=0;
		$.each(arr,function(i){
			str+='<li><img src="'+arr[i].img+'" alt=""><p>'+arr[i].goodName+'<br/>￥<span class="price">'+arr[i].price+'</span> X <span class="count">'+arr[i].count+'</span></p><a href="javascript:;" class="del">删除</a></li>';
			sum+=parseInt(arr[i].res);
			num+=parseInt(arr[i].count);

		})
		$("#lie").html(str);
		var odiv=$('<div id="cur"><span>共计(未计算销售折扣)</span><b class="mon">￥'+sum.toFixed(2)+'</b><a href="jiesuan.html" class="see">查看购物车(<i class="num" id="woquni" style="color:white">'+num+'</i>件)</a></div>');
		odiv.appendTo($(".gounum"));
		$(".num").html(num);
		$(".del").click(function(){
			var i=$(this).index(".del");
			//console.log(i); 
			arr.splice(i,1);
			if(arr.length==0){
				$(".num").html("0");
				$(".gounum").html("您的购物车中没有任何商品！")
			}
			console.log(arr);
			obj.message=arr;
			 obj.username=username;
			 arr1.splice(i,1);
			 arr1.push(obj);
			 var value=JSON.stringify(arr1);
			 	localStorage.setItem(key,value);
			$(this).parent("li").remove();
			var nnum=0;
			var rres=0;
			$.each(arr,function(i){
				nnum+=Number(arr[i].count);
				rres+=Number(arr[i].res);
			})
			$(".num").html(nnum);
			$(".mon").html(rres);
		})
	}
}else{
		$(".num").html("0");
		$(".gounum").html("您的购物车中没有任何商品！")
}
	

})