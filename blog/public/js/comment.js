var prepage=4;
var page=1;
var pages=0;
var comment=[];
//提交评论
$('#messageBtn').on('click',function () {
    $.ajax({
        type:'POST',
        url:'/api/comment/post',
        data:{
            contentid:$('#contentId').val(),
            content:$('#messageContent').val()
        },
        success:function (responseData) {
            $('#messageContent').val('');
            comment=responseData.data.comment.reverse();
           renderComment();
        }
    })
})

//每次页面重载获取文章的所有评论
$.ajax({
    url:'/api/comment',
    data:{
        contentid:$('#contentId').val()
    },
    success:function (responseData) {
        comment=responseData.data.reverse();
        renderComment();
    }
})

$('.view-page').delegate('a','click',function () {
    if($(this).parent().hasClass('prevous')){
        page--;
    }else {
        page++;
    }
    renderComment();
})

$('#logout').on('click',function () {
    $.ajax({
        url:'/api/user/logout',
        success:function (result) {
            //退出成功 重新加载页面
            if (!result.code){
                window.location.reload();
            }
        }
    });
})

function renderComment() {

    pages=Math.ceil(comment.length/prepage);
    var start=Math.max(0,(page-1)*prepage);
    var end=Math.min((start+prepage),comment.length);
    var $lis=$('.view-page li');
    $lis.eq(1).html(page +'/' +pages )

    if(page<=1){
        page=1;
        $lis.eq(0).html('<a href="javascript:;">没有上一页</a>');
    }else{
        $lis.eq(0).html('<a href="javascript:;">上一页</a>');
    }
    if(page>=pages){
        page=pages;
        $lis.eq(2).html('<a href="javascript:;">没有下一页</a>');
    }else {
        $lis.eq(2).html('<a href="javascript:;">下一页</a>');
    }

    $('#sum-comments').html(comment.length);
    $('#sum-comments1').html(comment.length);
    var html='';
    for (var i=start;i<end;i++){
        html+='<div class="comment-content">' +
            '<p class="comment-text"><span class="user">'+comment[i].username+':'+'</span>'+comment[i].content+'</p>' +
            '<p class="comment-time">' +formatData(comment[i].postTime)+
            '<a href="javascript:;" class="comment-praise" total="0" my="0">赞</a>' +
            '<a href="javascript:;" class="comment-operate">回复</a>' +
            '</p>' +
            '<div class="text-box">' +
            '<textarea class="comment" autocomplete="off">评论…</textarea>' +
            '<button class="btn ">回 复</button>' +
            '<span class="word"><span class="length">0</span>/140</span>' +
            '</div>' +
            '</div>'
    }
    $('.content').html(html);
}

function formatData(d) {
    var data1= new Date(d);
    return data1.getFullYear()+ '-' +(data1.getMonth()+1)+ '-' +data1.getDate()+ '  ' + data1.getHours()+':'+ data1.getMinutes()+':'+data1.getSeconds()+':';
}