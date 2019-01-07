require(["./requirejs.config"], () => {
	//引入index需要依赖的模块
	require(["jquery", "item", "header", "footer"], ($, item) => {
		item.init("");
	})
})