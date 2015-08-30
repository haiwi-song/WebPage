&emsp;&emsp;该插件是基于开源JS库库jquery.leanModal.min.js改造而来，
其官网[http://leanmodal.finelysliced.com.au/](http://leanmodal.finelysliced.com.au/)。LeanModal 是一个简单的 jQuery 插件，用于实现模态窗口。它是专为小的对话框，提示和面板等需要使用模式窗口的场合打造的。专门用来处理隐藏的内容，并且不应用任何样式给目标元素。虽然LeanModal具有较多的优势，但在实际开发过程中往往不灵活。

&emsp;&emsp;因此，此对原LeanModal插件进行了改造，以其达到灵活控制，同时便于二次开发，改造主要涉及：<br />
（1）由原来的实例方法$.fn.extend改为静态方法$.extend，便于直接调用；<br/>
（2）采用两个方法openHaiwiModal和closeHaiwiModal操作模式框，便于和辅助功能的协同操作。
效果图如下：

![](http://img.blog.csdn.net/20150126184232046?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvb1RlbmdZdWU=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

使用该插件需注意一下几点：

**(1)必须包括样式**

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

**(2)引入jQuery库和DivModal.js库**

	<script type="text/javascript" src="js/jquery-1.9.1/jquery-1.9.1.min.js"></script>
	<script type="text/javascript" src="js/DivModal.js"></script>

**(3)设置Div模式框的初始显示状态为隐藏**

	<div id="modalDiv" style="display:none;"></div>

**(4)使用$.openHaiwiModal和$.closeHaiwiModal弹出Div模式框**

	$.openHaiwiModal("modalDiv");
	$.closeHaiwiModal("modalDiv");

另 可以设置options自定义参数,如设置点击遮罩自动层关闭弹出层参数(详见源码)

	$.openHaiwiModal("modalDiv"，{closeClickOverlay:true});