$(function (){
    $("#link_login").on('click',function (){
        $('.login-box').show();
        $('.reg-box').hide(); 
    })
    $("#link_reg").on('click',function (){
        $('.login-box').hide();
        $('.reg-box').show(); 
    })
    // 进行表单验证
    var form =layui.form;
    form.verify({
        // 确认密码
        repassword: function(value){ //value：表单的值、item：表单的DOM对象
           var pwd1 = $('#form_reg [name=password]').val();
            if(pwd1!==''&&value!==''&&pwd1!==value){
                return "您两次输入的密码不一致"
            }
        }
        ,passLenght: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] 
      });      


})