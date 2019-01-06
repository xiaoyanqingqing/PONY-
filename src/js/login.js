
require(["./requirejs.config"], () => {
	require(["jquery", "cookie"], () => {
		//ajax登录
		//当登录成功之后，后端返回用户名
		let username = "zhangsan";

		//用户名存cookie
		$.cookie("username", username, {path: "/"});
		location.href = "/";
	})
})