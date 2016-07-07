以前封装了一个Div弹出的jquery插件，[ jQuery特效之浮动div模式框](http://blog.csdn.net/otengyue/article/details/43155881)，这个插件封装的原则追求最简洁，只负责弹出的行为，不负责样式。

而这次的封装是基于上个插件的封装进行进一步的封装，封装一个完整的浮动div弹出插件.先看效果图：
![这里写图片描述](http://img.blog.csdn.net/20160617152736681)![这里写图片描述](http://img.blog.csdn.net/20160617152754911)

**优势：**
- 具有较好的兼容性，兼容IE、chrome、火狐等主流浏览器。

- 智能性较强，例如当设置高度后，body中内容超出范围时候将出现滚动条；当设置弹出框高度大于可视范围时，能够智能调整为自适应浏览器高度等；同时支持点击标题栏可拖拽。

- 调用便捷，只需调用openHaiwiModal和closeHaiwiModal函数即可实现对话框的调用。

- 可编程性良好，直接改变定义的div行为进行弹出，而非复制div的html代码，具有较好的可编程性。


**使用步骤：**
（1）首先引入jquery类库

（2）必须包括样式haiwiModal.css和插件jquery.haiwiModal.js

（3）设置Div模式框的初始显示状态为隐藏
	`<div id="modalDiv" ></div>`

（4）使用`$.openHaiwiModal`和`$.closeHaiwiModal`弹出关闭Div模式框

　　如：
	`$.openHaiwiModal("modalDiv");`和`$.closeHaiwiModal("modalDiv");`

　　另 可以设置options自定义参数,如设置点击遮罩自动层关闭弹出层参数`$.openHaiwiModal("modalDiv"，{closeClickOverlay:true,width:800,height:600});`


**举例如下：**

Html定义模板

```html
<div id="popContainer" class="haiwi-modal">
    <div class="haiwi-modal-title">
       #* 弹出框标题*#
    </div>
    <div class="haiwi-modal-body">
        #*弹出框内容*#
    </div>
    <div class="haiwi-modal-bottom">
        #*底部按钮*#
        <button class="btn-h28 btn-blue mr20" onclick="save();"><strong>保存</strong></button>
        <button class="btn-h28 btn-white" onclick="closeAddDialog();">取 消</button>
    </div>
    <a href="javascript:void(0);" class="close-haiwi-modal">×</a>
</div>
```

javascript调用过程

```javascript
//打开
$.openHaiwiModal("popContainer");
或
$.openHaiwiModal("popContainer"，{closeClickOverlay:true,width:800,height:600});

//关闭
$.closeHaiwiModal("popContainer");
```

