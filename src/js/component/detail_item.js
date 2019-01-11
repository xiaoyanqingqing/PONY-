define(["jquery", "template"], ($, template) => {
	function Detail_item(){

	}

	Detail_item.prototype.init = function(url){
		//先load到页面上，得到url，然后去请求数据,渲染结构，
		
		//load
		new Promise((resolve, reject) => {
			console.log(url);
			$("#carousel").load("/html/component/detail_item.html", () => {
				resolve();
			})
		}).then(() => {
			$.ajax({
				url: url,
				type: "get",
				success: function(res){ 
					console.log(res);
					if(res.res_code === 1){
						let detail = res.res_body.data;
						//通过模板引擎渲染结构
						let html = template("detail_template", {detail: res.res_body.data});
						
						$("#carousel ul").html(html);

					}
				}
			})
			
		});
		$.getJSON("http://rap2api.taobao.org/app/mock/data/764002",(data)=>{
			let html1 = template("detail1",{detail1:data.res_body.list});
			$(".one").html(html1);
		})
		
		
	}

	return new Detail_item();
})