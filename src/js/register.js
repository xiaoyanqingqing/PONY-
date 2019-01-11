//注册业务逻辑
require(["./requirejs.config"], () => {
	require(["jquery","cookie"], () => {
		
		//注册逻辑
		$("#btn-submit").on("click", function(e){
			console.log(22)
			// localhost/api/v1/register.php
			// post
			e.preventDefault();
			console.log( $("#email").val());
			//验证用户名密码合法性，验证通过了才会发送ajax
			// $.ajax({
			// 	url: "http://localhost/api/v1/register.php",
			// 	type: "post",
			// 	data: {
			// 		name: $("#userName").val(),
			// 		email: $("#email").val(),
			// 		password: $("#password").val(),
			// 		password2: $("#password2").val()
			// 	},
			// 	success: function(res){
			// 		alert(11);
			// 	},
			// 	dataType: "json"
			// })
			$.post("http://localhost/api/v1/register.php",{
						name: $("#userName").val(),
						email: $("#email").val(),
						password: $("#password").val(),
						password2: $("#password2").val()
					},function(res){
								 console.log(res)
								 if(res.res_code === 1){
									 console.log(11)
									 $.cookie(
										"user",
										JSON.stringify({
											
											name:name
										}),
										{path:"/"}
									);
									alert("注册成功，马上去登录");
									location.href = "/html/login.html";
								}
								}
						 	,"json")
		})
	})
})