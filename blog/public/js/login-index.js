//登录页面打开
function cambiar_login() {
    document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";
    document.querySelector('.cont_form_login').style.display = "block";
    document.querySelector('.cont_form_sign_up').style.opacity = "0";

setTimeout(function(){  document.querySelector('.cont_form_login').style.opacity = "1"; },400);

setTimeout(function(){
document.querySelector('.cont_form_sign_up').style.display = "none";
},200);
  }

//注册 登录页面转换
function cambiar_sign_up(at) {
  document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
  document.querySelector('.cont_form_sign_up').style.display = "block";
document.querySelector('.cont_form_login').style.opacity = "0";

setTimeout(function(){  document.querySelector('.cont_form_sign_up').style.opacity = "1";
},100);

setTimeout(function(){   document.querySelector('.cont_form_login').style.display = "none";
},400);


}


//注册页面打开
function ocultar_login_sign_up() {

document.querySelector('.cont_forms').className = "cont_forms";
document.querySelector('.cont_form_sign_up').style.opacity = "0";
document.querySelector('.cont_form_login').style.opacity = "0";

setTimeout(function(){
document.querySelector('.cont_form_sign_up').style.display = "none";
document.querySelector('.cont_form_login').style.display = "none";
},500);

}
//注册

$(function () {
    var $registerBox=$('#register');
    $registerBox.find('button').on('click',function () {
      //通过ajax提交请求
        $.ajax({
            type:'post',
            url:'/api/user/register',
            data:{
                username:$registerBox.find('[name="username"]').val(),
                password:$registerBox.find('[name="password"]').val(),
                repassword:$registerBox.find('[name="repassword"]').val()
            },
            dataType:'json',
            success:function (result) {
                $registerBox.find('.colWarning').html(result.message);
                if(!result.code){
                    //注册成功
                    ocultar_login_sign_up();
                }
            }

        });

    });

    //登录模块
    var $loginBox=$('#loginBox');
    $loginBox.find('button').on('click',function () {
        $.ajax({
            type:'post',
            url:'/api/user/login',
            data:{
                username:$loginBox.find('[name="username"]').val(),
                password:$loginBox.find('[name="password"]').val()
            },
            dataType:'json',
            success:function (result) {
                $loginBox.find('.colWarning').html(result.message);
                if(!result.code){
                    //登录成功
                    function jumurl(){
                        window.location.href = 'gbook';
                    }
                    setTimeout(jumurl,1000);

                }
            }
        })
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
})