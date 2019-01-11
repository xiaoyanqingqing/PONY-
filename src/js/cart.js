require(["./requirejs.config"], () => {
	//引入index需要依赖的模块
	require(["jquery","template","cookie","header","footer"],($,template) => {
		// function carts(){
		// 	$.cookie.json = true;
		// 	this.cartt = $.cookie("cart")||[];
		// 	this.init();
		// }
		// $.extend(carts.prototype,{
		// 	init(){
		// 		const html = template("templateP",{"pro":this.cartt});
		// 		console.log(html)
		// 		console.log($("tbody"))
		// 		$("tbody").html(html);
        //     },
            
            
		// })
        // new carts()
        
        var box = $("#box");
	var	table = $("table",box)[0];
	var tbody = $("tbody", box)[0];
	//通过cookie拼接购物车
    var arr=JSON.parse($.cookie("cart")); 
    console.log(arr);
	var str="";
    for(var value in arr){
       console.log(arr[value]);
		str+='<tr>'+
	        	'<td><input type="checkbox" class="check"/></td>'+
	        
	            '<td><span>'+arr[value].title+'</span><input type="text"></td>'+
	            '<td><span>'+arr[value].price+'</span><input type="text"></td>'+
	            '<td><span>'+arr[value].num+'</span><input type="text"></td>'+
	            '<td>'+
	            	'<a href="javascript:;" class="editBtn">编辑</a>'+
	            	'<a href="javascript:;" class="okBtn">确定</a>'+
	            	'<a href="javascript:;" class="cancelBtn">取消</a>'+
	            	'<a href="javascript:;" class="delBtn">删除</a>'+
	            '</td>'+	
	        '</tr>'
	}
	
	tbody.innerHTML=str;
	var allCheck = $("#allCheck");
	var n = 0; // 记录单选按钮被选中的数量	
	table.onclick = function(e){
		e = e || event;
		//找到事件源
		var target = e.target || e.srcElement;
		//找到当前tr
		var tr = target.parentNode.parentNode;
		//判断事件源
		if(target.className === "editBtn"){
			//编辑按钮
			//切换span和input得显示隐藏
			tr.className = "edit";
			//找到当前行所有span，把span得内容给到对应的input.value
			var aSpan = $("span", tr);
			for(var i = 0; i < aSpan.length; i++){
				aSpan[i].nextElementSibling.value = aSpan[i].innerHTML;
			}
		}else if(target.className === "okBtn"){
			//确定按钮
			tr.className = "";
			var aSpan = $("span", tr);
			for(var i = 0; i < aSpan.length; i++){
				aSpan[i].innerHTML = aSpan[i].nextElementSibling.value;
			}
			calcPrice();
		}else if(target.className === "cancelBtn"){
			//取消
			tr.className = "";
		}else if(target.className === "delBtn"){
			if(confirm("你真的不要了吗？")){	
				tr.parentNode.removeChild(tr);
				//判断当前一行是否被选中
				var check = $(".check", tr)[0];
				//如果被选中，n减一
				if(check.checked) n--;
				//判断n跟aCheck的length的关系
				allCheck.checked = (n===$(".check", box).length);
				calcPrice();
			}
		}else if(target.id === "allCheck"){
			//全选
			//找到所有的单选
			var aCheck = $(".check", box);
			for(var i = 0; i < aCheck.length; i++){
				//单选得状态跟全选同步
				aCheck[i].checked = target.checked;
			}
			//n得值也要修改
			n = target.checked ? aCheck.length : 0;
			calcPrice();
		}else if(target.className === "check"){
			target.checked ? n++ : n--;
			var aCheck = $(".check", box);
			allCheck.checked = n === aCheck.length;
			calcPrice();
		}
	}
		
	function calcPrice(){
		var sum = 0;
		//找到被选中的那些行，然后把这些行的单价X数量，累加
        var aTr = $("tr", tbody);
        console.log(aTr)
		for(var j = 0; j < aTr.length; j++){
			if($(".check", aTr[j])[0].checked){
				var price = Number($("span", aTr[j])[1].innerHTML);
				var num = Number($("span", aTr[j])[2].innerHTML);
				sum += price*num;
            }
            console.log(sum)
		}
		$("#money").text(sum + "元") ;
	}
		
		
	
	})

})
