$(function () {
    $("#link_login").on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    $("#link_reg").on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 进行表单验证
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        // 确认密码
        repassword: function (value) { //value：表单的值、item：表单的DOM对象
            var pwd1 = $('#form_reg [name=password]').val();
            if (pwd1 !== '' && value !== '' && pwd1 !== value) {
                return "您两次输入的密码不一致"
            }
        }
        , passLenght: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
    });

    /* ------------------------------- */
    /* 点击注册按钮提交注册信息 */
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        var data={
            username:$('#form_reg [name=username]').val(),
            password:$('#form_reg [name=password]').val()
        }
        $.post("/api/reguser",data,function(res){
            // console.log(res)
            if(res.status!==0){
               return layer.msg(res.message)
            }
            layer.msg("注册成功，请登录");
            $('#link_login').click();
        })
    })


    // 点击提交按钮跳转到index.html页面
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            type:"POST",
            data:$(this).serialize(),
            success:function(res){
                if (res.status!==0){
                    return layer.msg(res.message)  
                }
                // console.log(res.token);
                localStorage.setItem("token",res.token)
                location.href='index.html';
            }
        })

        
    })





})