require(["./requirejs.config"], () => {
	//引入index需要依赖的模块
	require(["jquery", "item", "url","header", "footer"], ($, item,url) => {
		item.init(url.baseUrlRap+"/list");
	})
})
