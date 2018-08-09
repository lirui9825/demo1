$(function(){

	//获得验证码
	getYan();
	function getYan(){
		var arr=[];
		var arr1=[];
		var arr2=[];
		for(var i=48;i<=57;i++){
			arr.push(i);
		}
		for(var i=65;i<=90;i++){
			arr.push(i);
		}
		for(var i=0;i<arr.length;i++){
			var str=String.fromCharCode(arr[i]);
			arr1.push(str);
		}
		for(var i=0;i<4;i++){
			var a=parseInt(Math.random()*36);
			var b=arr1[a];
			arr2.push(b);
		}
		$(".poma").html(arr2.join(""));
	}
	$(".poma").click(function(){
		getYan();
		check();
	})

	//判断验证码是否正确
	$("#num").blur(check);
	function check(){
		if($("#num").val()!=$(".poma").html()){
			$(".shi").eq(0).css("display","block");
		}else{
			$(".shi").eq(0).css("display","none");
		}
	}

	//获得手机验证码
	
	var data=JSON.parse(localStorage.getItem("userformation"));
	$("#getma").click(function(){
		clearInterval(timer);
		var phone=$("#tel").val();
	if(localStorage.getItem("userformation")){
		for(var i=0;i<data.length;i++){
			if(data[i].username==phone){
				$(".shi").eq(1).html("该用户已被注册")
				$(".shi").eq(1).css("display","block");	
			}else{
				var reg=/1(3|4|5|7|8)\d{9}/;
				if(!reg.test(phone)){
					$(".shi").eq(1).css("display","block");										
				 }else if(isNaN(phone)){
				 	//console.log(1);
				 	$(".shi").eq(1).css("display","block");	
				 }else if(phone.length!=11){
				 	$(".shi").eq(1).css("display","block");	
						 }else{
				 	$(".shi").eq(1).css("display","none");
				 	var num=10;
				 	var timer=null;
				 	timer=setInterval(function(){
				 		num--;
				 		$("#getma").html(num+"秒后重新获得");
				 		$("#getma").css("color","#cca");
				 		$("#getma").off("click");
				 		//console.log($("#getY").html());
				 		if(num<0){
				 			$("#getma").html("获取短信验证码");
				 			clearInterval(timer);
				 			$("#getma").css("color","#b52024");
				 		}

				 	},1000)
				 }		
			}
		}
	}
		
		else {
			var reg=/1(3|4|5|7|8)\d{9}/;
		if(!reg.test(phone)){
			$(".shi").eq(1).css("display","block");										
		 }else if(isNaN(phone)){
		 	//console.log(1);
		 	$(".shi").eq(1).css("display","block");	
		 }else if(phone.length!=11){
		 	$(".shi").eq(1).css("display","block");	
		 }else{
		 	$(".shi").eq(1).css("display","none");
		 	var num=10;
		 	var timer=null;
		 	timer=setInterval(function(){
		 		num--;
		 		$("#getma").html(num+"秒后重新获得");
		 		$("#getma").css("color","#cca");
		 		$("#getma").off("click");
		 		//console.log($("#getY").html());
		 		if(num<0){
		 			$("#getma").html("获取短信验证码");
		 			clearInterval(timer);
		 			$("#getma").css("color","#b52024");
		 		}

		 	},1000)
		 }		 
		}
		
				
		// var reg=/1(3|4|5|7|8)\d{9}/;
		// if(!reg.test(phone)){
		// 	$(".shi").eq(1).css("display","block");										
		//  }else if(isNaN(phone)){
		//  	//console.log(1);
		//  	$(".shi").eq(1).css("display","block");	
		//  }else if(phone.length!=11){
		//  	$(".shi").eq(1).css("display","block");	
		//  }else{
		//  	$(".shi").eq(1).css("display","none");
		//  	var num=10;
		//  	var timer=null;
		//  	timer=setInterval(function(){
		//  		num--;
		//  		$("#getma").html(num+"秒后重新获得");
		//  		$("#getma").css("color","#cca");
		//  		$("#getma").off("click");
		//  		//console.log($("#getY").html());
		//  		if(num<0){
		//  			$("#getma").html("获取短信验证码");
		//  			clearInterval(timer);
		//  			$("#getma").css("color","#b52024");
		//  		}

		//  	},1000)
		//  }		 
	})

	//判断手机验证码
	$("#phonema").blur(function(){
		if(!$(this).val()){
			$(".shi").eq(2).css("display","block");$(".shi").eq(2).css("display","block");
		}else{
			$(".shi").eq(2).css("display","none");
		}
	})

	//设定登录密码
	$("#setmi").blur(function(){
		var setmi=$("#setmi").val();
		console.log(setmi.length)
		var reg=/[0-9a-zA-Z]{6,10}/;
		if(!reg.test(setmi)){
			$(".shi").eq(3).css("display","block");
		}else if(setmi.length<6||setmi.length>11){
		 	$(".shi").eq(3).css("display","block");
		 }else{
			$(".shi").eq(3).css("display","none");
		}
	})


	//判断第二次输入密码是否一致
	$("#twomi").blur(function(){
		var setmi=$("#setmi").val();
		if($(this).val()!=setmi){
			$(".shi").eq(4).css("display","block");
		}else{
			$(".shi").eq(4).css("display","none");
		}
	})


	//判断是否读了条款
	$(".xuan").click(function(){
		console.log($("input[type='checkbox']").prop("checked"))
		if($("input[type='checkbox']").prop("checked")){
			$(".shi").eq(5).css("display","none");
		}else{
			$(".shi").eq(5).css("display","block");
		}
	})
	


	//注册成功
	var array=[];
	var key="userformation";
	//判断，当重开网页是添加信息不会覆盖之前的
    var oldlocal=JSON.parse(localStorage.getItem(key));
    if(localStorage.getItem(key)){
    	for(var i=0;i<oldlocal.length;i++){
    	array.push(oldlocal[i]);
        }
    }
	$("#reg").click(function(){
		var Ar=[];
		var Br=[];
		var num=$(".mgg").length;
		
		if($("input[type='checkbox']").prop("checked")){
			$(".shi").eq(5).css("display","none");
		}else{
			$(".shi").eq(5).css("display","block");
		}
		$.each($(".mgg"),function(i){
			if(!$(".mgg").eq(i).val()){
				$(".shi").eq(i).css("display","block");
				Ar[i]=0;			
			}else{
				Ar[i]=1;
			}
		})
		var res=0;
		$.each(Ar,function(i){
			res+=Ar[i];
		})
		var reb=0;
		$.each($(".mgg"),function(i){
			if($(".shi").eq(i).css("display")=="none"){
				Br[i]=1;
			}else{
				Br[i]=0;
			}
		})
		$.each(Br,function(i){
			reb+=Br[i];
		})
		//console.log(num+":"+res+":"+reb)
		if(res==num&&reb==num){
			if($("input[type='checkbox']").prop("checked")){
				var tel=$("#tel").val();
				var pass=$("#setmi").val();
				var obj={};
				var key1="username";
				var val=JSON.stringify(tel);
					localStorage.setItem(key1,val);
				obj.username=tel;
				obj.password=pass;
				array.push(obj);
				var value=JSON.stringify(array);
				localStorage.setItem(key,value);
				document.location.href="index.html";
			}
			
		}		
	})

})