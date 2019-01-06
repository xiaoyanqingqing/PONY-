$(function(){
	//query对象可以直接使用
	//但是如果一个DOM对象要反复使用，最好用一个变量缓存一下

	let $imgs = $("#carousel ul li");
		
	let index = 0;

	//前后切换
	$("#goPrev").on("click", function(){
		//切换图片按钮，修改index得值
		$imgs.eq(index).removeClass("ac").animate({opacity: 0});
		if(--index < 0) index = $imgs.length-1;
		$imgs.eq(index).addClass("ac").animate({opacity: 1});
		
	})

	$("#goNext").on("click", function(){
		$imgs.eq(index).removeClass("ac").animate({opacity: 0});
	

		if(++index >= $imgs.length) index = 0;

		$imgs.eq(index).addClass("ac").animate({opacity: 1});
		
	})


	let timer = null;

	$("#carousel").hover(function(){
		clearInterval(timer);
	}, (function autoPlay(){
		timer = setInterval(() => {
			$("#goNext").trigger("click");
		},4000);
		return autoPlay;
	})());



})


