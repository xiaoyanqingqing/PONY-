define(["jquery", "cookie"], () => {
	class Header{
		constructor(){
			this.init();
		}
		init(){
			//加载header.html
			new Promise((resolve, reject) => {
				$("header").load("/html/component/header.html", () => {
					resolve();
				})
			}).then(() => {
				this.nav();
				this.login();
			})
		}
		nav(){
			$("nav").on("click", "li", function(){
				alert($(this).html());
			})
		}
		login(){
			let username = $.cookie("username");
			
			if(username){
				$("#header-login").html("欢迎您，"+username);
			}
		}
	}
	return new Header();
})