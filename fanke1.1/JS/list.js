$(function(){
	//获取当前页面地址中的id，判断传入哪一套json
	var urlId = window.location.search.split("=")[1];
	console.log(urlId);
	//分支,判定页面中需要根据id改变的内容，在此进行相应改变
	switch(urlId){
		case "1":
			$(".titles").html("熊本熊 - VANCL 凡客诚品");
			$(".selectLeft em").html("服装"),
			$(".selectLeft em").eq(1).html("百货");
			$(".protype").text("男装");
			$(".protype2").text("家居生活");
			$("<span class = 'pronums'></span>").appendTo($(".protype"))
			$("<span class = 'pronums2'></span>").appendTo($(".protype2"))
			$(".omit").html("熊本...")
		break;
		case "32":
			$(".titles").html("帆布鞋 - VANCL 凡客诚品");
			$(".selectLeft em").html("鞋包"),
			$(".selectLeft em").eq(1).html("服装");
			$(".protype").text("鞋");
			$(".protype2").text("袜品");
			$("<span class = 'pronums'></span>").appendTo($(".protype"))
			$("<span class = 'pronums2'></span>").appendTo($(".protype2"))
			$(".omit").html("帆布鞋...")
		break;
	}
	//导航区域,给a标签一个hover
	//位置hover 合并同款hover
	$(".locationdiv a, .center_right a, #navList ul li a:gt(0)").hover(
		function(){
			$(this).addClass("hover");
		},
		function(){
			$(this).removeClass("hover");
		}
	)
	//分类hover
	$(".selectRight ul li a, .center_list ul li a").hover(
		function(){
			$(this).attr("id","hover");
		},
		function(){
			$(this).removeAttr("id");
		}
	)
	//上一页下一页hover
	$(".btnCon .prebtn").hover(
		function(){
			$(this).css("background-position", "3px -2018px");
		},
		function(){
			$(this).css("background-position", "3px -1996px");
		}
	)
	$(".btnCon .nextbtn").hover(
		function(){
			$(this).css("background-position"," 46px -1976px");
		},
		function(){
			$(this).css("background-position"," 46px -1954px");
		}
	)
	//导航区域，下拉动画
	$("#navList .pullDown ul").addClass("clear");
	$("#navList ul li:gt(0)").hover(
		function(){
			$(this).find(".pullDown").slideDown(300);
		},
		function(){
			$(this).find(".pullDown").slideUp(300);
		}
	)

	//返回顶部||吸顶
	$(document).scroll(function(){
		if($(document).scrollTop() >= 100){
			$(".returnTop").css("display", "block");
		}else{
			$(".returnTop").css("display", "none");
		}
		//吸顶
		if($(document).scrollTop() >= 342){
			$(".commBar").css("position", "fixed")
		}else{
			$(".commBar").css("position", "static");
		}
	})
	//返回顶部绑定事件
	$(".returnTop").click(function(){
		$("body").animate({scrollTop: 0}, 200);
	})


	// // ajax后台调取list数据
	var listdata;
	var pros;
	var defaults = 0;
	$.ajax({
		url: "../AJAX/"+urlId+".json",
		type: "post",
		success:function(data){
			listdata = data;
			$.each(listdata, function(index, value){
				if(value.defaults){
					defaults ++;
				}
				diyAjax(value);
				pros = index;
				$(".pronums").html("("+ (pros + 1 - defaults) +")");
				$(".pronums2").html("("+ (defaults) +")");
				$(".omit").next().html(pros + 1);
			})
		}
	})

	// list中的img鼠标移入移出效果
	$(".mainList").on("mouseover", ".listImg",function(){
		$(this).css("border-color", "#a10000");
	//移入时创建详情页
		$('<div class = "titleDiv"><div class = "titleImg"><img src="'+$(this).attr("src")+'" alt=""></div><h4 class = "proname">'+$(this).parent().nextAll("p").children("a").html()+'</h4><i class = "pronum">产品编号：6375878</i><b class = "prices">'+$(this).parent().nextAll("p").next("b").html()+'</b><div class = "goods"><strong class = "praise">好评率</strong><strong class = "pranum">100%</strong></div></div>').appendTo($(this).parents("li"));
	//创建箭头
		$("<div class = 'triangle'></div>").appendTo($(this).parents("li"));
	//判断，如果是最右边的div，详情页则在左边
		if(($(this).parents("li").index() + 1) % 5 == 0){
			$(".titleDiv").css("left", "-310px");
			$(".triangle").css({
				"left":"-16px",
				"background": "url(../IMG/right.png) no-repeat -6px 0px"
			});
		}

	})
	//移出时详情页销毁,红边恢复原状
	$(".mainList").on("mouseout", ".listImg", function(){
		$(this).css("border-color", "");
		$(this).parents("li").children(".titleDiv").remove();
		$(".triangle").remove();
	})


	//筛选区域，input获得焦点
	$(".inarea input").on({
		"focus":function(){
			$(".emp_confirm").css("display", "block");
		},
		"click":function(event){
			event.stopPropagation();
		}
	})
	//阻止冒泡
	$(".emp_confirm, .sift").click(function(event){
		event.stopPropagation();
	})
	$(document).click(function(){
		$(".emp_confirm").css("display", "none");
	})
	//点击清空，input内容为空
	$(".emp").click(function(){
		$(".inarea input").val("");
	})
	//点击确定，重新调用ajax，进行筛选
	$(".con").click(function(){
		var reg = /^\d*$/;
		if(reg.test(parseInt($(".start").val())) && reg.test(parseInt($(".ends").val()))){
			var leftprice = parseInt($(".start").val());
			var rightprice = parseInt($(".ends").val());
			$(".listGoods").html("");
			//ajax调用
			var flag = true;
			$.ajax({
				url:"../AJAX/"+urlId+".json",
				type: "post",
				success:function(data){
					$.each(data, function(index, value){
						var prices = parseInt(value.price.split("￥")[1]);
						if(prices >= leftprice && prices <= rightprice){
								diyAjax(value);
								flag = false;
								$(".pager").css("display", "block");
								$(".emp_confirm").css("display", "none");
						}
					})
					//如果筛选没有结果，则插入一个div进行友好提示
					if(flag){
						$('<div class = "notfound"><p>抱歉！没有找到符合您要求的<a href="javascript:;">“熊本...”</a>商品，</p><p>您可以<a href="javascript:;">改变搜索关键词</a>或<a href="javascript:;">减少分类条件</a>的限制试试。</p></div>').appendTo($(".listGoods"));
						$(".pager, .emp_confirm").css("display", "none");
						$(".inarea input").val("");
					}
				}

			})
		}else{
			alert("请输入正确的数字进行查询！");
			$(".inarea input").val("");
		}
	})

	//对json的传入进行条件筛选
	function diyAjax(value){
		if(value.new){
			$('<li><a href="javascript:;"><img class = "listImg" id = "'+value.goodid+'" src="'+value.srcs+'" alt=""></a><em></em><p><a href="javascript:;">'+value.pinner+'</a></p><b class = "sprice">'+value.price+'</b></li>').appendTo($(".listGoods"));
		}else{
			$('<li><a href="javascript:;"><img class = "listImg" id = "'+value.goodid+'" src="'+value.srcs+'" alt=""></a><p><a href="javascript:;">'+value.pinner+'</a></p><b class = "sprice">'+value.price+'</b></li>').appendTo($(".listGoods"));
		}
	}
	//价格下拉列表的动画
	$(".pldown").hover(
		function(){
			$(".pldown_main").css("display", "block");
			$(this).css("background", "#ffffff");
		},
		function(){
			$(".pldown_main").css("display", "none");
		}
	)
	//下拉列表的颜色变换
	$(".pldown_main li").hover(
		function(){
			$(this).css("background", "#ffffff");
		},
		function(){
			$(this).css("background", "");
		}
	)
	//排序函数，从高到低
	function objsort(obj){
		var values;
		for(var i = 0; i < obj.length; i ++){
			for(var j = 0; j < obj.length; j ++){
				if(parseInt(obj[i]["price"].split("￥")[1])> parseInt(obj[j]["price"].split("￥")[1])){
					values = obj[j];
					obj[j] = obj[i];
					obj[i] = values;
				}
			}
		}
		console.log(obj)
		return obj;
	}
	// 从低到高
	function objsortlow(obj){
		var values;
		for(var i = 0; i < obj.length; i ++){
			for(var j = 0; j < obj.length; j ++){
				if(parseInt(obj[i]["price"].split("￥")[1])< parseInt(obj[j]["price"].split("￥")[1])){
					values = obj[j];
					obj[j] = obj[i];
					obj[i] = values;
				}
			}
		}
		console.log(obj)
		return obj;
	}

	//从高到低
	$(".H_L").click(function(){
		$(".listGoods").html("");
		$(".pldown_a").css("background", "url(../IMG/lowredjt.png) no-repeat 25px 10px");
		$(".pldown_a").prop("title", "价格由高到低");
		$.ajax({
			url: "../AJAX/"+urlId+".json",
			type: "post",
			success:function(data){
				$.each(objsort(data), function(index, value){
					diyAjax(value);
				})
			}
		})
	})
	//从低到高
	$(".pldown_a").click(function(){
		$(".listGoods").html("");
		$(this).css({
			"background": "url(../IMG/jttop2.png) no-repeat 25px 9px",
		});
		$(".pldown_a").prop("title", "价格由低到高");

		$.ajax({
			url: "../AJAX/"+urlId+".json",
			type: "post",
			success:function(data){
				$.each(objsortlow(data), function(index, value){
					diyAjax(value);
				})
			}
		})
	})
	//传递给详情页
	$(".listGoods").on("click", ".listImg",function(){
		console.log($(this));
		window.location = "Details.html?id="+$(this).attr("id");
	})


	$("#top").load("head.html");
})
