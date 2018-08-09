$(document).ready(function(){

	//选项卡
	$("#quan").on("mouseover","li",function(){
		$("#banner img").css("opacity","0");
		$("#banner img").eq($(this).index()).animate({"opacity":"1"},500);
		$("#quan li").css("background","#aaa");
		$(this).css("background","pink");
		num=$(this).index();
	})

	//左右按钮
	var num=0;
	var timer=null;
	var fn=$("#bleft").click(function(){
		//console.log($("#banner img").length);
		num--; 
		if(num<0){
			num=$("#banner img").length-1;
		}
		$("#banner img").css("opacity","0");
		$("#banner img").eq(num).animate({"opacity":"1"},500);
		$("#quan li").css("background","#aaa");
		$("#quan li").eq(num).css("background","pink");
	});
	function next(){
		num++; 
		if(num>$("#banner img").length-1){
			num=0;
		}
		$("#banner img").css("opacity","0");
		$("#banner img").eq(num).animate({"opacity":"1"},500);
		$("#quan li").css("background","#aaa");
		$("#quan li").eq(num).css("background","pink");
	}
	$("#bright").click(next);
	//定时器	
	timer=setInterval(next,1500);
    $("#bleft").hover(function(){
    	clearInterval(timer);
    },function(){
    	timer=setInterval(next,1500)
    })
     $("#bright").hover(function(){
    	clearInterval(timer);
    },function(){
    	timer=setInterval(next,1500)
    })
     $("#quan li").hover(function(){
    	clearInterval(timer);
    },function(){
    	timer=setInterval(next,1500)
    })

     //返回顶部
     $("#fanhui").click(function(){
     	$("html,body").animate({"scrollTop":"0"},300)
     })


	$("#tou").load("head.html");
    $("#di").load("foot.html");

     
})
