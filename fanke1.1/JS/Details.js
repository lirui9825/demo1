$(function(){
    //var url=window.location.search;
    var goodsId = window.location.search.split("=")[1];
    var urlId=goodsId.split("_")[0];
    console.log(urlId);
    console.log(goodsId);
    var viewsrc=[];
    var bigviewsrc=[];
    var imgpl=[];
    var firstcolor="";
    var nowdata=[];
    $.ajax({
        url:"../JSON/"+urlId+".json",
        type:"post",
        success:function(data){
            nowdata=eval(data);
            console.log(nowdata)
            //保存首选颜色
            $.each(nowdata,function(i,item){
                firstcolor=item["goodName"].split(" ").slice(-1);
            })
            loader();
        }
    })
    //锚点
    $(".anchor a").click(function(){
        $(".anchor a").attr("class","")
        $(this).addClass('selected');
    });
    //图片选择
    $(".thumbnail").on("mouseover","li",function(){
        $(".thumbnail li").css("border","1px solid #B4B4B4");
        $(".thumbnail span").css("border","1px solid #fff");
        $(this).find("span").css("border","1px solid #a10000");
        $(this).css("border","1px solid #a10000");
        $(".view img").attr("src",viewsrc[$(this).index()]);
        $(".bigview img").attr("src",bigviewsrc[$(this).index()])
    })
    //缩略图翻页
    $(".up").click(function(){
         $(".down").css("border-color","#a10000 transparent")
        var t=$(".thumbnail").position().top;
        if(t){
            $(".thumbnail").animate({"top":t+83+"px"}, 100)
        }
        if(t+83==0){
           $(".up").css("border-color","#ccc transparent")
        }
    })
    $(".down").click(function(){
        $(".up").css("border-color","#a10000 transparent")
        var num=$(".thumbnail").children().length;
        var t=$(".thumbnail").position().top;
        if(-t!=(num-5)*83){
            $(".thumbnail").animate({"top":t-83+"px"}, 100)
        }
        if(-(t-83)==(num-5)*83){
             $(".down").css("border-color","#ccc transparent")
        }
    })
    //放大镜+吸顶
    $(".view").hover(function(){
        $(".bigview").css("display","block");
        $(".mark").css("display","block");
    },function(){
        $(".bigview").css("display","none");
        $(".mark").css("display","none");
    })
    $(".glass").mousemove(function(event){
        var e = event||window.event;
        var l=e.offsetX-$(".mark").width()/2;
        var t=e.offsetY-$(".mark").height()/2;
        var maxl=$(".glass").width()-$(".mark").width();
        var maxt=$(".glass").height()-$(".mark").height();
        if(l<0){
            l=0;
        }
        if(l>maxl){
            l=maxl;
        }
        if(t<0){
            t=0;
        }
        if(t>maxt){
            t=maxt;
        }
        $(".mark").css({"left":l,"top":t});
        var bx=l/maxl;
        var by=t/maxt;
        var imgw=$(".bigview img").width();
        var imgh=$(".bigview img").height();
        var bvw=$(".bigview").width();
        var bvh=$(".bigview").height();
        $(".bigview img").css({"left":-(imgw-bvw)*bx,"top":-(imgh-bvh)*by})
    })
    $(window).scroll(function(event) {
        var st=$(window).scrollTop();
        var bvt=$(".bigview").offset().top;
        var glt=$(".goods_l").offset().top;
        if(st>150&&st<670){
            $(".bigview").css("top",(90+st)-glt)
        }else if(st<150){
           $(".bigview").css("top",-80)
        }
        if(st>670){
            $("#xiding").css("display","block");
        }else {
           $("#xiding").css("display","none");
        }
    });
    //选择颜色
    $(".selectColor").on("click",".color",function(){
        firstcolor=$(this).find("p").html();
        loader();
    })
    //选择尺码
    $(".selectSize ul").on("mouseover","li",function(){
        $(this).css("border","1px solid #a10000");
    })
    $(".selectSize ul").on("mouseout","li",function(){
        if(!$(this).find("span").prop("class")){
            $(this).css("border","1px solid #C8C8C8");
        }
    })
    $(".selectSize ul").on("click","li",function(){
        $(".selectSize ul li").css("border","1px solid #C8C8C8");
        $(".selectSize ul li p").css("border","1px solid #fff");
        $(".selectSize span").attr("class","")
        $(this).css("border","1px solid #a10000");
        $(this).find("p").css("border","1px solid #a10000");
        $(this).find("span").attr("class","onchecked");
        $(".selectsize").html("，"+$(this).find("p").html());
        $(".error").css("display","none")
    })
    //选择数量
    var selnum=1;
    $("#selnum").change(function(){
        selnum=Number($(this).val());
    });

    //评论选择
    $("#allpl").click(function(){
        $(".new input:not(#allpl)").prop("checked",false)
        loader();
    })
    $("#picpl").click(function(){
        $(".new input:not(#picpl)").prop("checked",false)
        $(".allpl").html("");
        for(var i=0;i<imgpl.length;i++){
            $(" <div class='pl'><div class='content'><div class='con_fl'><p>"+imgpl[i]["msg"]+"</p><ul></ul><p class='date'>"+imgpl[i]["date"]+"</p></div><div class='con_fr'><p>颜色："+imgpl[i]["info"]["颜色"]+"<span></span></p><p>尺码："+imgpl[i]["info"]["尺码"]+"</p><p>身高："+imgpl[i]["info"]["身高"]+"</p><p>体重："+imgpl[i]["info"]["体重"]+"</p><p class='pingjia'>"+imgpl[i]["info"]["评价"]+"</p></div></div><div class='user'><a href='javascript:;''>"+imgpl[i]["userid"]+"</a><div class='vip' style='background:url("+imgpl[i]["vipsrc"]+") no-repeat 0 "+imgpl[i]["vip"]*(-14)+"px'></div></div></div>").appendTo($(".allpl"));
            for(var j=0;j<imgpl[i]["img"].length;j++){
                $("<li><img src='"+imgpl[i]["img"][j]+"'></li>").appendTo($(".con_fl ul"));
            }
        }
    })
    //据颜色读数据
    function loader(){
        //清空
        $(".up").css("display","none");
        $(".down").css("display","none");
        viewsrc=[];
        bigviewsrc=[];
        imgpl=[]
        $(".thumbnail").html("");
        $(".color").remove();
        $(".selectSize ul").html("");
        $(".view img").remove();
        $(".yhts ul").html("");
        $(".pics").html("");
        $(".hotgoods ul").html("");
        $(".allpl").html("");
        $(".allque").html("");
     $.each(nowdata,function(i,item){
                if(item["goodsId"]==goodsId){
                    //插入商品名
                    $(".goodName").eq(1).html(item["goodName"].split(" ").slice(0,-1).join(" "));
                    $.each(item["info"],function(n,val){
                        //插入颜色种类
                        $("<div class='color' title='"+val["color"]+"'><div class='blankbd'><span style='background: url("+val["spsrc"]+") no-repeat 0 "+(-n*36)+"px;'></span><p>"+val["color"]+"</p><b class=''></b></div></div>").appendTo($(".selectColor"))
                        //插入首选信息
                        if(firstcolor==val["color"]){
                            $(".selectName").html(firstcolor);
                            $(".goodsNum").html(val["goodsNum"])
                            //商品名
                            $(".goodName").eq(2).html(item["goodName"].split(" ").slice(0,-1).join(" ")+" "+val["color"]);
                            $(".goodName").eq(2).attr("title",item["goodName"].split(" ").slice(0,-1).join(" ")+" "+val["color"])
                            $(".goodName").eq(0).html(item["goodName"].split(" ").slice(0,-1).join(" ")+" "+val["color"]);
                            $(".goodName").eq(0).attr("title",item["goodName"].split(" ").slice(0,-1).join(" ")+" "+val["color"])
                            //价格
                            $("#price").html(val["price"]);
                            //颜色
                            $(".color").eq(n).css("border","1px solid #a10000")
                            $(".color").eq(n).find(".blankbd").css("border","1px solid #a10000");
                            $(".color").eq(n).find("b").attr("class","onchecked")
                            //尺码
                            for(var j=0;j<val["size"].length;j++){
                                $("<li><p>"+val["size"][j]+"</p><span class=''></span></li>").appendTo($(".selectSize ul"));
                             }
                             //缩略图
                             for(var j=0;j<val["thumsrc"].length;j++){
                                if(j==0){
                                    $('<li style="border:1px solid #a10000"><span style="border:1px solid #a10000"><img src="'+val["thumsrc"][j]+'" id="img"></span></li>').appendTo($(".thumbnail"));
                                }else{
                                    $('<li><span><img src="'+val["thumsrc"][j]+'"></span></li>').appendTo($(".thumbnail"));
                                }
                                if(j>4){
                                    $(".up").css("display","block");
                                    $(".down").css("display","block");
                                }
                            }
                            //预览图
                            for(var j=0;j<val["view"].length;j++){
                                viewsrc.push(val["view"][j]);
                                if(j==0){
                                    $('<img src="'+val["view"][j]+'" title="'+val["goodName"]+'">').appendTo($(".view"));
                                }
                            }
                            //大图
                            for(var j=0;j<val["bigview"].length;j++){
                                if(j==0){
                                    $(".bigview img").attr("src",val["bigview"][j])
                                }
                                bigviewsrc.push(val["bigview"][j]);
                            }
                            //优惠信息
                            for(var j=0;j<val["youhui"].length;j++){
                                $("<li>"+val["youhui"][j]+"</li>").appendTo(".yhts ul")
                            }
                            //产品描述
                            for(var j=0;j<val["pics"].length;j++){
                                $("<img src="+val["pics"][j]+">").appendTo($(".pics"))
                            }
                            //推荐产品
                            for(var j=0;j<val["tuijian"].length;j++){
                                $("<li><a href='javascript:;'><img src='"+val["tuijian"][j]["src"]+"' title='"+val["tuijian"][j]["goodname"]+"'></a><h3><a href='javascript:;'>"+val["tuijian"][j]["goodname"]+"</a></h3><p>"+val["tuijian"][j]["price"]+"</p></li>").appendTo($(".hotgoods ul"))
                            }
                        }
                    })
                    //评论
                    var imgplnum=0;
                    $.each(item["pingjia"],function(n,val){
                        $("#plnum").html(n+1);
                        $(" <div class='pl'><div class='content'><div class='con_fl'><p>"+val["msg"]+"</p><ul></ul><p class='date'>"+val["date"]+"</p></div><div class='con_fr'><p>颜色："+val["info"]["颜色"]+"<span></span></p><p>尺码："+val["info"]["尺码"]+"</p><p>身高："+val["info"]["身高"]+"</p><p>体重："+val["info"]["体重"]+"</p><p class='pingjia'>"+val["info"]["评价"]+"</p></div></div><div class='user'><a href='javascript:;''>"+val["userid"]+"</a><div class='vip' style='background:url("+val["vipsrc"]+") no-repeat 0 "+val["vip"]*(-14)+"px'></div></div></div>").appendTo($(".allpl"));
                        if(val["img"][0]){
                            imgplnum++;
                            imgpl.push(val);
                            for(var i=0;i<val["img"].length;i++){
                                $("<li><img src='"+val["img"][i]+"'></li>").appendTo($(".con_fl ul").eq(n))
                            }
                        }
                        $("#picPlnum").html(imgplnum);
                    })
                    //提问
                    $.each(item["question"],function(n,val){
                        $("<div class='question'><div class='userque'><span class='Q'>Q</span><span>"+val["userid"]+"："+val["msg"]+"</span><div class='tw_fr'><span>"+val["date"]+"</span><a href='javascript:;'>我要回复（0）</a></div></div><div class='adminask'><span class='A'>A</span><p class='ask'>"+val["ask"]+"</p></div></div>").appendTo($(".allque"))
                        $("#twnum").html(n+1);
                    })
                }
            })
    }

    //加入购物车
    $(".addbuycar").click(function(){
        var username=JSON.parse(localStorage.getItem("username"));
        //console.log(username)
        if(!$(".selectsize").html()){
             $(".error").eq(0).css("display","block");
        }else if(!username){
            $(".error").eq(1).css("display","block");
        }else{

                var arr=[];//最的数组
                var key ="Goods";
                var obj1={};//对象老大
                /*var key1="username";
                var username=JSON.parse(localStorage.getItem(key1))*/;
                obj1.username=username;
                obj1.message=[];
                var oldlocal=JSON.parse(localStorage.getItem(key));
                if(localStorage.getItem(key)){
                    for(var i=0;i<oldlocal.length;i++){
                        if(oldlocal[i].username==username){
                            obj1.message=oldlocal[i].message;
                        }else{
                            arr.push(oldlocal[i]);
                        }
                    }
                 }

                var obj={};
                obj.img=$("#img").attr("src");
                obj.goodName=$(".goodName").html();
                obj.size=$(".selectsize").html().slice(1);
                console.log(obj.size);
                obj.price=$("#price").html();
                obj.count=selnum;
                obj.res=(($("#price").html())*selnum).toFixed(2);
                if(!localStorage.getItem(key)){
                        obj1.message.push(obj);
                        arr.push(obj1);
                       // console.log(arr);
                        var value=JSON.stringify(arr);
                        localStorage.setItem(key,value);
                        window.location.href="jiesuan.html";
                }else{
                    if(obj1.message.length!=0){
                    var old=obj1.message;
                    var flag=0;
                    for(var i=0;i<old.length;i++){
                        if(old[i].goodName==obj.goodName&&old[i].size==obj.size){
                            old[i].count= Number(old[i].count)+Number(obj.count);
                            old[i].res=(Number(old[i].count)*Number(old[i].price)).toFixed(2);
                            // obj1.message=old;
                            flag=1;
                        }else{
                            flag=0;
                        }

                    }
                    if(flag==0){
                        obj1.message.push(obj);
                        arr.push(obj1);
                        //去重
                        var whatarr1=[]
                        for (var i = 0; i < obj1.message.length; i++) {
                            whatarr1.push(String(obj1.message[i].goodName)+String(obj1.message[i].size))

                        }
                        //console.log(whatarr1)
                        var whatarr2=[]
                        var whatarr3=[]
                        for (var i = 0; i < whatarr1.length; i++) {
                            if (whatarr2.indexOf(whatarr1[i])==-1) {
                                whatarr2.push(whatarr1[i])
                            }
                            else{
                                whatarr3.push(i)
                            }
                        }
                        //console.log(whatarr2)
                        //console.log(whatarr3)
                        if (whatarr3.length!=0) {
                            for (var i = 0; i < whatarr3.length; i++) {
                                obj1.message.splice(whatarr3[i],1)
                            }
                        }
                        //end

                        var value=JSON.stringify(arr);
                        localStorage.setItem(key,value);
                        window.location.href="jiesuan.html";
                        return;
                    }else{
                         arr.push(obj1);
                         //console.log(arr)
                        var value=JSON.stringify(arr);
                        localStorage.setItem(key,value);
                        window.location.href="jiesuan.html";
                    }
                }else{
                    //console.log(222)
                        obj1.message.push(obj);
                        arr.push(obj1);
                       // console.log(arr);
                        var value=JSON.stringify(arr);
                        localStorage.setItem(key,value);
                        window.location.href="jiesuan.html";
                }

                }

        }

    })
//立即购买
$(".nowbuy").click(function(){
    var username=JSON.parse(localStorage.getItem("username"));
        //console.log(username)
        if(!$(".selectsize").html()){
             $(".error").eq(0).css("display","block");
        }else if(!username){
            $(".error").eq(1).css("display","block");
        }else{

                var arr=[];//最的数组
                var key ="Goods";
                var obj1={};//对象老大
                /*var key1="username";
                var username=JSON.parse(localStorage.getItem(key1))*/;
                obj1.username=username;
                obj1.message=[];
                var oldlocal=JSON.parse(localStorage.getItem(key));
                if(localStorage.getItem(key)){
                    for(var i=0;i<oldlocal.length;i++){
                        if(oldlocal[i].username==username){
                            obj1.message=oldlocal[i].message;
                        }else{
                            arr.push(oldlocal[i]);
                        }
                    }
                 }

                var obj={};
                obj.img=$("#img").attr("src");
                obj.goodName=$(".goodName").html();
                obj.size=$(".selectsize").html().slice(1);
                console.log(obj.size);
                obj.price=$("#price").html();
                obj.count=selnum;
                obj.res=(($("#price").html())*selnum).toFixed(2);
                if(!localStorage.getItem(key)){
                        obj1.message.push(obj);
                        arr.push(obj1);
                       // console.log(arr);
                        var value=JSON.stringify(arr);
                        localStorage.setItem(key,value);
                        window.location.href="jiesuan.html";
                }else{
                    if(obj1.message.length!=0){
                    var old=obj1.message;
                    var flag=0;
                    for(var i=0;i<old.length;i++){
                        if(old[i].goodName==obj.goodName&&old[i].size==obj.size){
                            old[i].count= Number(old[i].count)+Number(obj.count);
                            old[i].res=(Number(old[i].count)*Number(old[i].price)).toFixed(2);
                            // obj1.message=old;
                            flag=1;
                        }else{
                            flag=0;
                        }

                    }
                    if(flag==0){
                        obj1.message.push(obj);
                        arr.push(obj1);
                        //去重
                        var whatarr1=[]
                        for (var i = 0; i < obj1.message.length; i++) {
                            whatarr1.push(String(obj1.message[i].goodName)+String(obj1.message[i].size))

                        }
                        //console.log(whatarr1)
                        var whatarr2=[]
                        var whatarr3=[]
                        for (var i = 0; i < whatarr1.length; i++) {
                            if (whatarr2.indexOf(whatarr1[i])==-1) {
                                whatarr2.push(whatarr1[i])
                            }
                            else{
                                whatarr3.push(i)
                            }
                        }
                        //console.log(whatarr2)
                        //console.log(whatarr3)
                        if (whatarr3.length!=0) {
                            for (var i = 0; i < whatarr3.length; i++) {
                                obj1.message.splice(whatarr3[i],1)
                            }
                        }
                        //end

                        var value=JSON.stringify(arr);
                        localStorage.setItem(key,value);
                        window.location.href="jiesuan.html";
                        return;
                    }else{
                         arr.push(obj1);
                         //console.log(arr)
                        var value=JSON.stringify(arr);
                        localStorage.setItem(key,value);
                        window.location.href="jiesuan.html";
                    }
                }else{
                    //console.log(222)
                        obj1.message.push(obj);
                        arr.push(obj1);
                       // console.log(arr);
                        var value=JSON.stringify(arr);
                        localStorage.setItem(key,value);
                        window.location.href="jiesuan.html";
                }

                }

        }
})

    $(".head").load("head.html");
    $(".Foot").load("foot.html");
})

