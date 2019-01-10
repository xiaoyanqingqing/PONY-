require(["./requirejs.config"], () => {
  require(["jquery", "detail_item", "url", "zoom", "header", "footer"], ($, detail_item, url, zoom, ) => {
    detail_item.init(url.baseUrlRap + "/detail");
    $(".image-manage>a>img").elevateZoom();

    function Detail() {
      
    }
    return new Detail();

  })
})