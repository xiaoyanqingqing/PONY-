//首页的业务逻辑
require(["requirejs.config"],function(){
	//引入index需要依赖的模块
	require(["jquery","header","footer"],function($){
        function index(){
            this.init();
        }
        $.extend(index.prototype,{
            init:function(){
                this.res();
            },
            //轮播图功能
            res:function(){
                let $imgs = $("#carousel ul li");

                let index = 0;

                //前后切换
                $("#goPrev").on("click", function () {
                    //切换图片按钮，修改index得值
                    $imgs.eq(index).removeClass("ac").animate({
                        opacity: 0
                    });
                    if (--index < 0) index = $imgs.length - 1;
                    $imgs.eq(index).addClass("ac").animate({
                        opacity: 1
                    });

                })

                $("#goNext").on("click", function () {
                    $imgs.eq(index).removeClass("ac").animate({
                        opacity: 0
                    });


                    if (++index >= $imgs.length) index = 0;

                    $imgs.eq(index).addClass("ac").animate({
                        opacity: 1
                    });

                })


                let timer = null;

                $("#carousel").hover(function () {
                    clearInterval(timer);
                }, (function autoPlay() {
                    timer = setInterval(() => {
                        $("#goNext").trigger("click");
                    }, 2000);
                    return autoPlay;
                })())
            }
           
           
        })
        new index();
	})
})



		
		
