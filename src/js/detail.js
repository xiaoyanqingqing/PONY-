require(["./requirejs.config"], () => {
  require(["jquery", "detail_item", "url", "zoom", "header", "footer"], ($, detail_item, url, zoom, ) => {
    detail_item.init(url.baseUrlRap + "/detail");
    $(".image-manage>a>img").elevateZoom();

    function Detail() {
      
    }
    
    console.log(123);
   
    $("#choose-btns").on("click", function (e) {
      //获取事件源
      console.log(123);
      console.log(e.target);
      if($(e.target).hasClass("js-add-cart")){
        console.log($(".id").text())
        var obj={
          id:$(".id").text(),
          title:$(".title").text(),
          price:$(".price").text(),
          num:1,
        }
        
        var arr=$.cookie("cart") ? JSON.parse($.cookie("cart")) : [];
				//判断是否有重复的添加购物车，重复则数量加一，不重复就向arr中添加
				var index;
				var isExist=arr.some(function(item,i){
					//存在为true，不存在为false
					index=i;
					return item.id===obj.id;
				})
				if(isExist){
					arr[index].num++;
				}else{
					arr.push(obj);
				}
				$.cookie("cart",JSON.stringify(arr));
				console.log($.cookie("cart"));
       
      }
    })

    new Detail();

  })
})
