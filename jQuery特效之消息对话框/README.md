封装了一个消息对话框，用于替换浏览器原生的alert和confirm，兼容浏览器差异，同时支持良好的扩展性。效果图见下方调用方式举例：

**使用步骤：**

一、必须包括样式haiwiMsg.css

二、引用jquery库和jquery.haiwiMsg.js

三、直接调用函数弹出对话框，函数包含：

(1) 成功提示对话框：`$.thSuccess(content);`

(2) 警告提示对话框：`$.thWarn(content);`

(3) 错误提示对话框：`$.thError(content);`

(4) 文本提示(不包含图标，支持html)：`$.thInfo(title,content,width,height);`

(5) 提示对话框：`$.thAlert(title,content,iconClass);`

(6) 选择对话框：`$.thConfirm(title,content,okCallBack,cancelCallBack);`

(7) 自定义弹出对话框：`$.haiwiMsg(options);`


详情请移步博客：[jquery插件封装：消息对话框](http://blog.csdn.net/otengyue/article/details/51853876)