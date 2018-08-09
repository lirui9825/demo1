$(function(){

	var key="Goods";
	var arr1=JSON.parse(localStorage.getItem(key));
	var key1="username";
	var username=JSON.parse(localStorage.getItem(key1));
	
	//欢迎登陆		 
	$(".huan").html("您好,"+username);
	$("#exit").click(function(){
		var value=JSON.stringify("");
		localStorage.setItem(key1,value);
		window.close();
		window.open("index.html");
	})

	var obj={};
	obj.username=username;
	var arr=[];
	if(arr1.length!=0){
		for(var i=0;i<arr1.length;i++){
		if(arr1[i].username==username){
			arr=arr1[i].message;
			arr1.splice(i,1);
		}
	}
	}
	

	console.log(arr.length);
		//console.log(arr.length)
		//console.log(arr);
		if(arr.length==0){
			$("#All").removeAttr("checked");
		}else{
			for(var i=0;i<arr.length;i++){
				//newobj=arr[i];
				//console.log(arr[1])
				var oul=$("<ul></ul>");
				oul.attr("class","goods");
				var oli=$("<li></li>");
				oli.html("<input type='checkbox' class='che' checked>");
				oli.appendTo(oul);
				
				for(j in arr[i]){
					//console.log(i)
					if(j=="img"){
						var s=$('<li><img src="'+arr[i].img+'" alt="" /></li>');
						s.appendTo(oul);
					}
					else if(j=="count"){
						//console.log(j);
						var oli=$("<li></li>");
						oli.html('<input type="button" value="-" class="sub"><input type="text" value='+arr[i][j]+' class="num" readonly="readonly"><input type="button" value="+" class="add">');
						oli.appendTo(oul);
					}else{
						var oli=$("<li></li>");
						oli.html(arr[i][j]);
						oli.appendTo(oul);
					}				
				}
				var oli=$("<li></li>")
				var oa=$("<a href='javascript:;'>删除</a>");
				oa.appendTo(oli);
				oli.appendTo(oul);
				oul.appendTo($("#content"));
			}
		}
		



			var xx=0;
			var uu=0;
			$(".che").each(function(i){
				if($(".che").eq(i).prop("checked")==true){				
					xx+=parseInt($(".che").parents("ul").find(".num").eq(i).val());
					uu+=parseFloat($(".che").parents("ul").find(".num").eq(i).parent().next().html());
				}			
			})
			$("#sz").html(xx+"件");
			$("#mz").html("￥"+uu.toFixed(2));

		//这是数量加减
		var c=0;
		$(".add").on("click",function(){
			//console.log($(this).parents("ul"));
			var i=$(this).index(".add");
			var num=$(".num").eq(i).val();
			num++;
			c++;
			$(".num").eq(i).val(num);
			//console.log(num);			
			var pri=$(this).parent().prev().html();
			//console.log(pri);
			var resu=(num*pri).toFixed(2);
			//console.log(resu);
			$(this).parent().next().html(resu);
			arr[i].count=num;
			arr[i].res=resu;
			for(var i=0;i<arr1.length;i++){
				if(arr1[i].username==username){
					arr=arr1[i].message;
					arr1.splice(i,c);
				}
			}
			obj.message=arr;
			obj.username=username;
			arr1.push(obj);
			var value=JSON.stringify(arr1);
			 	localStorage.setItem(key,value);

			 	var ss=0;
				var mm=0;
				$(".che").each(function(i){
					if($(".che").eq(i).prop("checked")==true){				
						ss+=parseInt($(".che").parents("ul").find(".num").eq(i).val());
						mm+=parseFloat($(".che").parents("ul").find(".num").eq(i).parent().next().html());
					}			
				})
				$("#sz").html(ss+"件");
				$("#mz").html("￥"+mm.toFixed(2));

		})
		var c1=0;
		$(".sub").on("click",function(){
			c1++;
			//console.log($(this).parents("ul"));
			var i=$(this).index(".sub")
			var num=$(".num").eq(i).val();
			num--;
			if(num<1){
				num=1;
			}
			$(".num").eq(i).val(num);
			//console.log(num);
			arr[i].count=num;
			var value=JSON.stringify(arr);
			 	localStorage.setItem(key,value);
			var pri=$(this).parent().prev().html();
			var resu=(num*pri).toFixed(2);
			$(this).parent().next().html(resu);
			arr[i].count=num;
			arr[i].res=resu;
			for(var i=0;i<arr1.length;i++){
				if(arr1[i].username==username){
					arr=arr1[i].message;
					arr1.splice(i,c1);
				}
			}
			obj.message=arr;
			obj.username=username;
			arr1.push(obj);


			var value=JSON.stringify(arr1);
			 	localStorage.setItem(key,value);
			

			 var ss=0;
			 var mm=0;
			$(".che").each(function(i){
				if($(".che").eq(i).prop("checked")==true){				
					ss+=parseInt($(".che").parents("ul").find(".num").eq(i).val());
					mm+=parseFloat($(".che").parents("ul").find(".num").eq(i).parent().next().html());
				}			
			})
			$("#sz").html(ss+"件");
			$("#mz").html("￥"+mm.toFixed(2));
		})


		//删除点击事件
		$("a").click(function(){
			 var i=$(this).parents("ul").index();
			//console.log(i);			
			 arr.splice(i,1);
			 console.log(arr);
			 obj.message=arr;
			 obj.username=username;
			 arr1.splice(i,1);
			 arr1.push(obj);
			 var value=JSON.stringify(arr1);
			 	localStorage.setItem(key,value);
			 	$(this).parents("ul").remove();
			 	
		var ss=0;
		 var mm=0;
		$(".che").each(function(i){
			if($(".che").eq(i).prop("checked")==true){				
				ss+=parseInt($(".che").parents("ul").find(".num").eq(i).val());
				mm+=parseFloat($(".che").parents("ul").find(".num").eq(i).parent().next().html());
			}			
		})
		$("#sz").html(ss+"件");
		$("#mz").html("￥"+mm.toFixed(2));
		})


		//全选框
		$("#All").click(function(){
			if ($(this).prop("checked")){
			 	   $("input[type='checkbox']").prop("checked",true);
			 	 }else{
			 	 	$("input[type='checkbox']").prop("checked",false);
			 	 }
			 })
		 $("input[type='checkbox']").click(function(){

		 	
		 var ss=0;
		 var mm=0;
		$(".che").each(function(i){
			if($(".che").eq(i).prop("checked")==true){				
				ss+=parseInt($(".che").parents("ul").find(".num").eq(i).val());
				mm+=parseFloat($(".che").parents("ul").find(".num").eq(i).parent().next().html());
			}			
		})
		$("#sz").html(ss+"件");
		$("#mz").html("￥"+mm.toFixed(2));
		 	var i=arr.length;
		 	console.log(i);
		 	if($(this).prop("checked")==false){
		 		$("#All").prop("checked",false);
		 	}else if($(".che:lt("+i+"):checked").length==$(".che").length){
		 		$("#All").prop("checked",true);
		 	}
		 })

		 //继续购物
		 $("#cont").click(function(){
		 	window.location.href="index.html";
		 })

})