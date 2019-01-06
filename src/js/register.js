//注册业务逻辑
require(["./requirejs.config"], () => {
	require(["jquery"], () => {
		/*$(function(){
			console.log(1);
		})*/

		//注册逻辑
		$("#regBtn").on("click", function(e){
			// localhost/api/v1/register.php
			// post
			e.preventDefault();
			//验证用户名密码合法性，验证通过了才会发送ajax
			$.ajax({
				url: "http://localhost/api/v1/register.php",
				type: "post",
				data: {
					name: $("#username").val(),
					password: $("#password").val()
				},
				success: function(res){
					console.log(res);
					if(res.code === 1){
						alert("注册成功，马上去登录");
						location.href = "/html/login.html";
					}
				},
				dataType: "json"
			})
		})
	})
})