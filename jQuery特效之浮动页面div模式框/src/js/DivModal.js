/*Haiwi@20150126 
*弹出DIV遮罩层(只能弹出页面中的元素)的模式对话框，由开源JS库jquery.leanModal.min.js改造而来
*使用方式：
(1)必须包括样式
#haiwi_overlay{
	position:fixed;
	z-index:10000;
	top:0px;
	left:0px;
	height:100%;
	width:100%;
	background:#000;
	display:none;
}
(2)引入jQuery库和haiwiModal.js库
<script type="text/javascript" src="jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="haiwiModal.js"></script>
(3)设置Div模式框的初始显示状态为隐藏
<div id="modalDiv" style="display:none;"></div>
(4)使用$.openHaiwiModal和$.closeHaiwiModal弹出Div模式框
如： $.openHaiwiModal("modalDiv");
	$.closeHaiwiModal("modalDiv");
另 可以设置options自定义参数,如设置点击遮罩自动层关闭弹出层参数
	$.openHaiwiModal("modalDiv"，{closeClickOverlay:true});
*/
$.extend({
		openHaiwiModal:function(div_id,options){
			var defaults={
				top:100,overlay:0.5,closeClickOverlay:false
			};
			$("#haiwi_overlay").remove();
			var overlay=$("<div id='haiwi_overlay'></div>");
			$("body").append(overlay);
			defaults=$.extend(defaults,options);
			return $("#"+div_id).each(function(){
				var o=defaults;
					var modal_id=div_id;
					if(o.closeClickOverlay){
						$("#haiwi_overlay").click(function(){
							$.closeHaiwiModal(modal_id);
						});
					}
					var modal_height=$("#"+modal_id).outerHeight();
					var modal_width=$("#"+modal_id).outerWidth();
					$("#haiwi_overlay").css({"display":"block",opacity:0});
					$("#haiwi_overlay").fadeTo(200,o.overlay);
					$("#"+modal_id).css({"display":"block","position":"fixed","opacity":0,"z-index":11000,"left":50+"%","margin-left":-(modal_width/2)+"px","top":o.top+"px"});
					$("#"+modal_id).fadeTo(200,1);
			});
		},
		closeHaiwiModal:function(div_id){
			$("#haiwi_overlay").fadeOut(200);
			$("#"+div_id).css({"display":"none"});
		}
});