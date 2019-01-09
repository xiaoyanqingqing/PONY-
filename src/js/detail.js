require(["./requirejs.config"], () => {
  require(["jquery", "url","zoom", "header"], ($, url,zoom,) => {
    $(function(){
      //获取id
      let arrSearch = location.search.slice(1).split("=");
      let searchObj = {};
      searchObj[arrSearch[0]] = arrSearch[1];

      $.ajax({
        url:url.baseUrlRap+"/detail",
        type:"GET",
        data: searchObj,
        dataType:"json",
        success: function(res){
          console.log(res);
        }

			})
			$(".image-manage>a>img").elevateZoom();

    })
  })
})
