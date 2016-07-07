/**Haiwi@20160704
 *弹出提示对话框
 *使用方式：
 * (1)必须包括样式haiwiMsg.css
 * (2)引用jquery库和jquery.haiwiMsg.js
 * (3)调用相关函数
 */
;(function(){
    function Map() {
        this.elements = new Array();

        //向MAP中增加元素（key, value)
        this.put = function(_key, _value) {
            this.elements.push( {
                key : _key,
                value : _value
            });
        }

        //获取指定KEY的元素值VALUE，失败返回NULL
        this.get = function(_key) {
            try{
                for(i = 0; i < this.elements.length; i++) {
                    if(this.elements[i].key == _key) {
                        return this.elements[i].value;
                    }
                }
            } catch(e) {
                return null;
            }
        }
        //删除指定KEY的元素，成功返回True，失败返回False
        this.remove = function(_key) {
            var bln = false;
            try{
                for(i = 0; i < this.elements.length; i++) {
                    if(this.elements[i].key == _key) {
                        this.elements.splice(i, 1);
                        return true;
                    }
                }
            } catch(e) {
                bln = false;
            }
            return bln;
        }
        //获取MAP元素个数
        this.size = function() {
            return this.elements.length;
        }
    }
    var optMap = new Map();
    $.haiwiMsg = function (options) {
        var _opt = {
            overlay:0.5,                     //遮罩度
            closeClickOverlay:false,   //点击遮罩层是否自动关闭
            waitSec:5,                       //倒计时几秒后关闭，等于0秒则默认不关闭
            isDrag:true,                    //是否可拖动
            width:300,                      //弹出框宽度
            height:200,                      //弹出框高度
            icon : "",                          //图标class类，空代表不需要图标
            title:"提示",                     //标题
            type:"alert",                     //弹出框类型，目前支持alert,confirm,info
            content:" ",                    //显示内容，支持html
            ok:null,                           //回调函数，点击确定调用
            cancel:null                     //回调函数，点击取消调用
        };

        createMsg = function(options){
            $(document.body).css("overflow","hidden");//锁定页面滚动条
            var msgCount = optMap.size()+1;
            var opt = $.extend({},_opt,options);
            optMap.put(msgCount,opt);
            var overLayId = "haiwi-msg-overlay"+msgCount;
            var containerId = "haiwiMsgContainer" +msgCount;
            var zIndex =11000+msgCount*2;
            $("#"+overLayId).remove();
            var overlay=$('<div id="'+overLayId+'" class="haiwi-msg-overlay" style="z-index:'+zIndex+'"></div>');
            var html = "";
            html += '<div id="'+containerId+'" class="haiwi-msg" style="width:'+opt.width+'px;height: '+opt.height+'px;">';
            html += '   <div class="haiwi-msg-title">';
            html += opt.title;
            html += '   </div>';
            html += '   <div class="fe-fm-table haiwi-msg-body">';
            if(opt.type=="info"){
                html += '<div style="font-size: 1.3em;line-height: 25px;padding:10px;">'+opt.content+'</div>';
            }else{
                html += '<div style="position:absolute;margin: 0px;padding-left:30px;padding-top:10px;margin:0px;">';
                if(opt.icon!=""){
                    html += '       <div  style="float: left;height:80px;width:50px;"><div class="'+opt.icon+'" style="width:48px;height: 48px;margin-top: 15px;border:0;" ></div></div>';
                }
                html += '       <div style="float: left;height:80px;display:table;width:'+(opt.width-100)+'px;">';
                html += '            <span style="font-size: 1.2em;padding:10px;vertical-align: middle;display: table-cell;line-height: 18px;">';
                html +=                 opt.content;
                html += '            </span>';
                html += '       </div>';
                html += '</div>';
            }
            html += '   </div>';
            html += '   <div class="haiwi-msg-bottom">';
            html += '   <span class="haiwi-msg-timeout"></span>';
            if(opt.type=="alert"){
                html += '       <button class="btn-h28 btn-blue" onclick="okMsg('+msgCount+');"><strong>关闭</strong></button>';
            }else if(opt.type=="confirm"){
                html += '       <button class="btn-h28 btn-blue mr10" onclick="okMsg('+msgCount+');"><strong>确定</strong></button>';
                html += '       <button class="btn-h28 btn-white" onclick="cancelMsg('+msgCount+');">取消</button>';
            }
            html += '   </div>';
            html += '   <a href="javascript:void(0);" class="close-haiwi-msg" onclick="removeMsg('+msgCount+');" >×</a>';
            html += '</div>';
            $("body").append(overlay);
            $("body").append(html);
            $("#"+overLayId).css({"display":"block",opacity:0});
            $("#"+overLayId).fadeTo(200,opt.overlay);
            $("#"+containerId).css({"display":"block","position":"fixed","opacity":0,"z-index":zIndex+1,"left":50+"%","margin-left":-(opt.width/2)+"px","top":50+"%","margin-top":-(opt.height/2)+"px"});
            $("#"+containerId).fadeTo(200,1);

            if(opt.type=="info"){
                $("#haiwiMsgContainer"+msgCount+" .haiwi-msg-bottom").hide();
                $("#haiwiMsgContainer"+msgCount+" .haiwi-msg-body").css("bottom","0px");
            }
            if(opt.isDrag){
                //点击标题头进行拖动对话框
                var _move=false;//移动标记
                var _x= 0,_y=0;
                $("#"+containerId+" .haiwi-msg-title").click(function(){
                }).mousedown(function(e){
                    _move=true;
                    _x=e.pageX-parseInt($("#"+containerId).css("left"));
                    _y=e.pageY-parseInt($("#"+containerId).css("top"));
                });
                $(document).mousemove(function(e){
                    if(_move){
                        var x=e.pageX-_x;//移动时根据鼠标位置计算控件左上角的绝对位置
                        x=x<0 ? 0 : x;
                        var y=e.pageY-_y;
                        y=y<opt.height/2 ? opt.height/2: y;
                        y=y>$(window).height()-20 ? $(window).height()-20 : y;
                        $("#"+containerId).css({top:y,left:x});//控件新位置
                    }
                }).mouseup(function(){
                    _move=false;
                });
                if(opt.closeClickOverlay){
                    $("#"+overLayId).click(function(){
                        removeMsg();
                    });
                }
            }

            if(opt.waitSec>0){
                timeOut(msgCount);
            }
        };

        timeoutWithSec = function(msgCount,sec){
            if(sec<=0){
                removeMsg(msgCount);
            }else{
                $('#haiwiMsgContainer'+msgCount+' .haiwi-msg-bottom .haiwi-msg-timeout').html(sec+"秒后关闭");
                var  t =setTimeout(function(){
                    sec--;
                    timeoutWithSec(msgCount,sec);
                },1000);
                var opt = optMap.get(msgCount);
                if(opt!=null){
                    opt.timer = t;
                }
            }
        }

        timeOut=function(msgCount){
            var opt = optMap.get(msgCount);
            timeoutWithSec(msgCount,opt.waitSec);
        }

        removeMsg = function(msgCount){
            if($("#haiwiMsgContainer"+msgCount).length>0){
                $("#haiwiMsgContainer"+msgCount).remove();
            }
            if($("#haiwi-msg-overlay"+msgCount).length>0){
                $("#haiwi-msg-overlay"+msgCount).remove();
            }
            var opt = optMap.get(msgCount);
            if(opt!=null){
                window.clearInterval(opt.timer);
            }
            optMap.remove(msgCount);
            if($(".haiwi-msg-overlay").length==0){
                $(document.body).css("overflow","auto");
            }
        };

        okMsg =function(msgCount){
            var opt = optMap.get(msgCount)
            if(typeof(opt.ok)=="function"){
                opt.ok();
            }
            removeMsg(msgCount);
        };

        cancelMsg = function(msgCount){
            var opt = optMap.get(msgCount)
            if(typeof(opt.cancel)=="function"){
                opt.cancel();
            }
            removeMsg(msgCount);
        }
        createMsg(options);
    };

    /**
     * 成功提示对话框
     * @param content
     */
    $.thSuccess = function(content){
        $.haiwiMsg({
            type:"alert",
            title:"提示",
            waitSec:5,
            icon:"haiwi-msg-icon1",
            content:content
        });
    }

    /**
     * 警告提示对话框
     * @param content
     */
    $.thWarn = function (content){
        $.haiwiMsg({
            type:"alert",
            title:"警告",
            waitSec:5,
            icon:"haiwi-msg-icon0",
            content:content
        });
    }
    /**
     * 错误提示对话框
     * @param content
     */
    $.thError = function (content){
        $.haiwiMsg({
            type:"alert",
            title:"错误",
            waitSec:0,
            icon:"haiwi-msg-icon11",
            content:content
        });
    }

    /**
     * 文本提示（不包含图标，支持html）
     * @param content
     */
    $.thInfo = function (title,content,width,height){
        $.haiwiMsg({
            type:"info",
            title:title,
            waitSec:0,
            width:width,
            height:height,
            content:content
        });
    }

    /**
     * 提示对话框
     * 调用方式为：（1）$.thAlert("操作成功！");（2）$.thAlert("提示","操作成功！");
     * @param title
     * @param content
     */
    $.thAlert = function(title,content,iconClass){
        if(typeof(content)=="undefined"){
            content = title;
            title = "提示";
        }
        if(typeof(iconClass)=="undefined"){
            iconClass = "haiwi-msg-icon1";
        }
        $.haiwiMsg({
            type:"alert",
            title:title,
            icon:iconClass,
            content:content
        });
    };


    /**
     * 选择对话框
     * 调用方式为：（1）$.thConfirm("是否继续?",function(){});（2）$.thConfirm("提示","是否继续?",function(){});
     * @param title
     * @param content
     * @param okCallBack
     */
    $.thConfirm = function(title,content,okCallBack,cancelCallBack){
        if(typeof(content)=="undefined"){
            content = title;
            title = "提示";
        }
        if(typeof(content)=="function"){
            okCallBack = content;
            content = title;
            title = "提示";
        }
        if(typeof(cancelCallBack)=="undefined"){
            cancelCallBack = null;
        }
        $.haiwiMsg({
            type:"confirm",
            icon:"haiwi-msg-icon4",
            title:title,
            closeClickOverlay:false,
            content:content,
            waitSec:0,
            ok:okCallBack,
            cancel:cancelCallBack,
        });
    }
})(jQuery);