function getCmtDataList() {
    var cmtArr = [];

    // 可以使用jsonp获取服务器的字幕数据
    /*$.ajax({
        type : 'GET',
        url : 'http://192.168.9.67/test.php',
        dataType : 'jsonp',
        data : {sid : 100},
        success : function(data) {
            cmtArr = data.dataList;

            if (cmtArr && cmtArr.length > 0) {
                sendMsg(cmtArr);
            }
        }
    });*/

    // 测试数据
    cmtArr = [
        {"text":"大家期待什么新品啊", "bgColor":"#424448", "icon":"http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg"},
        {"text":"会有什么惊喜吗？", "bgColor":"#424448", "icon":"http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg"},
        {"text":"等待中。。", "bgColor":"#23b28b", "icon":"http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg"},
        {"text":"会有什么新产品呢？", "bgColor":"#424448", "icon":"http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg"},
        {"text":"定时执行", "bgColor":"#23b28b", "icon":"http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg"},
        {"text":"1123333446红咖喱的非农房价", "bgColor":"#ec4262", "icon":"http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg"},
        {"text":"测试接口发评论00", "bgColor":"#ec4262", "icon":"http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg"},
        {"text":"测试接口发评论00", "bgColor":"#3dbbc0", "icon":"http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg"},
        {"text":"啊啊啊啊啊啊啊哦哦哦诶IEIE恩家报表出具", "bgColor":"#ec4262", "icon":"http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg"},
        {"text":"的方式的方法反反复复反复反复", "bgColor":"#23b28b", "icon":"http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg"}
    ]

    sendMsg(cmtArr);
}


function sendMsg(cmtArr) {

    for (var i=0; i<cmtArr.length; i++) {
        var cmtItem = cmtArr[i],
            iconStr = '';

        if (cmtItem.icon && cmtItem.icon.length > 0) {
            iconStr = '<span class="icon"><img src="'+ cmtItem.icon +'"></span>';
        }

        // 字幕的节点内容
        cmtItem.text = iconStr + cmtItem.text;
        cmtItem.mode = 2;
        cmtItem.dur = Math.floor(Math.random()*4000 + 14000);

        CM.send(cmtItem);
    }
}

var colorIdx = 0;
var colors = ["#424448", "#23b28b", "#ec4262", "#3dbbc0"]
function send(text) {
		
    	var cmtItem = {"text":text, "bgColor":colors[colorIdx++], "icon":"http://face.weiphone.net/data/avatar/000/15/31/95_avatar_big.jpg"}
        var iconStr = '';

        if (cmtItem.icon && cmtItem.icon.length > 0) {
            iconStr = '<span class="icon"><img src="'+ cmtItem.icon +'"></span>';
        }

        // 字幕的节点内容
        cmtItem.text = iconStr + cmtItem.text;
        cmtItem.mode = 1;
        cmtItem.dur = Math.floor(Math.random()*4000 + 14000);

        CM.send(cmtItem);
    
}

function cmtController() {
    getCmtDataList();

    setTimeout(function(){
        cmtController();
    }, 5000);
}



$(function(){
	var CM = new CommentManager(document.getElementById('commentCanvas'));
    CM.init();
  
    // 启动播放弹幕（在未启动状态下弹幕不会移动）
    CM.start();

    // 开放 CM 对象到全局这样就可以在 console 终端里操控
    window.CM = CM;

    // 弹幕播放
    //cmtController();

    $("#sendBtn").bind("click", function(){
    	$(this).attr('disabled',"true");//添加disabled属性 
    	var val = $("#content").val();
    	send(val);
    	$("#content").val('');
		$(this).removeAttr("disabled"); //移除disabled属性 
    });

    $("body").keydown(function() {
         if (event.keyCode == "13") {//keyCode=13是回车键
             $('#sendBtn').click();
         }
    });

    $("#changeUrlBtn").bind("click", function(){
    	$(this).attr('disabled',"true");//添加disabled属性 
    	var url = $("#url").val();
    	$("#site").attr("src",url); 
    	//$("#site").val('');
		$(this).removeAttr("disabled"); //移除disabled属性 
    });
});

/*
document.addEventListener('DOMContentLoaded', function(){
    var CM = new CommentManager(document.getElementById('commentCanvas'));
    CM.init();
  
    // 启动播放弹幕（在未启动状态下弹幕不会移动）
    CM.start();

    // 开放 CM 对象到全局这样就可以在 console 终端里操控
    window.CM = CM;

    // 弹幕播放
    //cmtController();
} ,false);
*/