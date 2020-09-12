$(function () {
    var layer = layui.layer
    getUserInfo()

    // 点击退出按钮退出页面
    $('#btnLogout').on("click", function () {
        // 弹出弹出层
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 点击确定执行该回调函数
            // 1.清除token的值
            localStorage.removeItem('token')
            // 2.跳转到登录页面
            location.href = "login.html"
            layer.close(index);
        });

    })



})

// 获取用户信息
function getUserInfo() {
    $.ajax ({
        url: '/my/userinfo',
        method: "GET",
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            renderAvatar(res.data)
            // console.log(res);
        },
        // complete: function (res) {
        //     // console.log(res);
        //     console.log(res.responseJSON);

        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         // 1.清除token的值
        //         localStorage.removeItem('token')
        //         // 2.跳转到登录页面
        //         location.href = "login.html"
        //     }
        // }

    })


}
// 封装renderAvatar渲染用户名和用户头像
function renderAvatar(user) {
    //  console.log(user);
    // 渲染用户名
    var name = user.nickname || user.username;
    $('#welcome').html(name)
    var one = name[0].toUpperCase()
    $('.text-avatar').html(one)
    // 渲染用户头像
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr('src', user.user_pic)
        $(".layui-nav-img").show()
        $('.text-avatar').hide()
    } else {
        $('.text-avatar').show()
        $(".layui-nav-img").hide()
    }



}