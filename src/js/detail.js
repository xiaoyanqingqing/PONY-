require(["./requirejs.config"], () => {
  require(["jquery","detail_item" ,"url","zoom", "header","footer"], ($,detail_item, url,zoom,) => {
    // $(function(){
    //   //获取id
    //   let arrSearch = location.search.slice(1).split("=");
    //   let searchObj = {};
    //   searchObj[arrSearch[0]] = arrSearch[1];

    //   $.ajax({
    //     url:url.baseUrlRap+"/detail",
    //     type:"GET",
    //     data: searchObj,
    //     dataType:"json",
    //     success: function(res){
    //       console.log(res);
    //     }

    //   })
      detail_item.init(url.baseUrlRap+"/detail");
			$(".image-manage>a>img").elevateZoom();

    })
  })

