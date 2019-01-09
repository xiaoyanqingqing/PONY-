require(["./requirejs.config"], () => {
	require(["jquery", "url", "cookie", "header", "footer"], ($, url) => {

		$("#btn").on("click", function (e) {
					e.preventDefault();
					// console.log($("#userName").val());
			$.post("http://localhost/api/v1/login.php", {
			name: $("#userName").val(),
			password: $("#password").val()
						},
			 function (res) 
			{
								console.log(res);
				if (res.res_code) {
					// 					//是否记住我
					if ($("#rememberMe").checked) {
						//把用户名和用户id存cookie
						$.cookie(
							"user",
							JSON.stringify({
								id: res.res_body.id,
								name: res.res_body.username
							}), {
								expires: 3
							}
						);
					} else {
						// 把用户名和用户id存cookie
						$.cookie(
							"user",
							JSON.stringify({
								id: res.res_body.id,
								name: res.res_body.username
							})
						);
					}
					if (confirm("登录成功，去首页")) {
						location.href = "/index.html";
					}
				}
			}, "json")
		})
	})
})