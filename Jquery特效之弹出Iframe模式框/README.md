&emsp;&emsp;在web开发过程中我们经常需要弹出Iframe页面来加载另外一个页面来显示操作或显示数据，在关闭iframe后又是需要执行某一个回调函数。以下插件能够以较少的代码实现该功能并具有较好的扩展性。下面先看截图：
![这里写图片描述](http://img.blog.csdn.net/20150830210804794)

**引入jquery库和popWin.js文件,使用该插件只需要一行代码即可:**

（1）只用iframe加载另一个页面

`
popWin.showWin("http://www.csdn.net",1000,600,function(){alert("关闭并执行回调函数")});
`

（2）用iframe加载另一个页面，关闭后执行回调函数。

`
popWin.showWin("http://www.csdn.net",1000,600,function(){alert("关闭并执行回调函数")}); 
`