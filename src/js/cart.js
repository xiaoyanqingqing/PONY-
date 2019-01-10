require(["requirejs.config"],function(){
  require(["jquery","template","cookie",'header','footer'],function($,template){
      function cart(){
          //获取cookie的信息
          this.cartt = $.cookie("cart")||[];
          this.accountPro = $.cookie("account")||[];
          this.init();
          //配置cookie自动在JS值与JSON值之间转换
    $.cookie.json = true;
          this.addlisteners();
          this.accounts();
      }
      $.extend(cart.prototype,{
//           //获取cookie中的商品信息渲染到页面
          init:function(){
          const cLen = this.cartt.length;
              // 判断cookie中数组长度，如果为零说明购物车没商品
              console.log(this.cartt)
              console.log(typeof(this.cartt))
              if(cLen==0){//购物车无商品
                  $("#cartbox").css({display:"block"});
                  $("#match").css({display:"none"});
              } else { //购物车有商品渲染商品信息到页面
                  const html = template("lia",{"lio":this.cartt});
                  $(".m-goods").html(html)
              }
          },
          //添加事件监听
          addlisteners:function(){
              $(".item").on("click",".u-opt",$.proxy(this.dele,this));//删除
              $(".item").on("click",".minus",$.proxy(this.reduce,this));//减少
              $(".item").on("click",".plus",$.proxy(this.increase,this));//增加
              $("#selectAll").on("click",this.checkAll.bind(this));//全选
              $(".selectAll").on("click",this.inverse.bind(this));//反选
              $(".u-chk").on("click",this.accounts.bind(this));//点击复选框的时候
              $(".gobuy").on("click",this.toCookie.bind(this));//点击结算按钮的时候
          },
          //删除操作
          dele(event){
              var has = confirm("确定删除？")
              if(has==true){
                  console.log(this.cartt)
                  // 获取此行商品的信息
                  let lim = $(event)[0].delegateTarget;
                  let img = $(lim.children[1].children[0].children[0]).attr("src");           
                  // 在cookie中移除此商品的信息并重新加载页面
                  //遍历cart数组，看哪条数据中的img属性与img不一致，不一致则保留
                  this.cartt = this.cartt.filter(curr=>curr.img!=img);
                  $.cookie("cart",this.cartt,{expires:10,path:"/"});
                  lim.remove();
                  this.totalPrice();
              }        
          },
          //减少操作
          reduce(event){
              // 获取此行商品的信息
              let lim = $(event)[0].delegateTarget;
              let amountt = parseInt($(lim.children[3].children[0].children[1]).val());
              amountt-=1;
              if(amountt<=1)amountt=1;
              $(lim.children[3].children[0].children[1]).val(amountt);
              // 重新计算价钱
              // 获取价钱，获取数量
              let price = parseInt($(lim.children[2].children[0]).html()),
                  amounts = (amountt*price).toFixed(2);
              $(lim.children[4].children[0]).html(amounts);
              this.totalPrice();
          },
          //增加操作
          increase(event){
              // 获取此行商品的信息
              let lim = $(event)[0].delegateTarget;
              let amountt = parseInt($(lim.children[3].children[0].children[1]).val());
              amountt+=1;
              if(amountt>=10)amountt=10;
              $(lim.children[3].children[0].children[1]).val(amountt);
              // 重新计算价钱
              // 获取价钱，获取数量
              let price = parseInt($(lim.children[2].children[0]).html()),
                  amounts = (amountt*price).toFixed(2);
              $(lim.children[4].children[0]).html(amounts);
              this.totalPrice();
          },
          //全选操作
          checkAll(){
              //获取下面所有的 复选框并将其选中状态设置跟编码的前端 复选框保持一致。
              //attr方法与JQ的版本有关，在1.8.3及以下有效。
              // $(".m-goods input").attr("checked",this.checked);//(有bug)
              $(".m-goods input").prop("checked",$("#selectAll")[0].checked);
              this.accounts();
              this.totalPrice();
          },
          //反选操作
          inverse(){
              //获取.m-goods下的所有复选框
              var src = $(".u-chk");
              //遍历数组，查看checked状态
              src.map(curr=>{
                  if(src[curr].checked==false){
                      src[curr].checked=true;
                  } else {
                      src[curr].checked=false
                  }
                  // console.log(src[curr].checked)
              })
              this.accounts();
              this.totalPrice();
          },
          //复选框当中只要有勾选的，就可以进行结算了
          accounts(){
              //如果有选中的则更改结算按钮颜色并启动可以启动的状态
              var src = $(".u-chk");
              let arr2 = Array.from(src);
              var result = arr2.some(curr=>{
                  return curr.checked==true;
              });
              if(result==true){//有选中的
                  $(".gobuy").css({background:"orangered"});
                  $(".gobuy").attr({href:"/html/account.html"});        
              } else {//一个选中的都没有
                  $(".gobuy").css({background:"#ccc"});
                  $(".gobuy").attr({href:"javascript:;"});
              }
              this.totalPrice();
          },
          //计算总价,总数量
          totalPrice(){
              let sum = 0;
              let amounts = 0;
              $(".u-chk:checked").each((index,element)=>{
        sum+=parseInt($(element).parents(".item").find(".sumrow").text());
        amounts+=parseInt($(element).parents(".item").find(".hahh").val());
      });
              $(".amounts").html(amounts);
              $(".totalnum").html(sum);
              $(".num").html("￥"+sum.toFixed(2));
              //将当前选中的行商品信息存入cookie  this.accountPro
              
          },
          //将选中商品存入cookie
          toCookie(){
              $(".u-chk:checked").each((index,element)=>{
                  //遍历商品信息
                  var products = {//获取商品信息
                      img: $(element).parents(".item").find(".imgWrap>img")[0].getAttribute("src"),
                      title : $(element).parents(".item").find(".goodtlt")[0].innerHTML,
                      price : $(element).parents(".item").find(".col3>span")[0].innerHTML,
                      amount : $(element).parents(".item").find(".hahh")[0].value
                  }
                  this.accountPro.push(products)
              }) 
              $.cookie("account",this.accountPro,{expires:10,path:"/"});
          }
      })
      new cart();
  });
})