$(function () {
  var form = layui.form
  var layer = layui.layer
  form.verify({
    // nickname : [
    //   /^{1,6}$/
    //   ,'昵称长度必须在 1 ~ 6 个字符之间'
    // ] 
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在 1 ~ 6 个字符之间'
      }
    }
  })
  initUserInfo()
  // 初始化用户的基本信息
  function initUserInfo() {
    $.ajax({
      url: '/my/userinfo',
      type: 'GET',
      success: function (res) {
        // console.log(res);
        form.val('formUserInfo', res.data);
      }
    })
  }
  // 点击重置按钮,重置数据
  $('#resetBtn').on('click', function (e) {
    // alert('123')
  e.preventDefault()
  initUserInfo()
  })
  // 点击提交按钮将修改的内容提交给后台，且进行用户名和头像的重新渲染
  $('#usermsg').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      url:'/my/userinfo',
      type: 'POST',
      data :$(this).serialize(),
      success : function(res){
        // window.parent.renderAvatar(res.data)
        // console.log(res);
        if(res.status !== 0){
          return layer.msg('更新用户信息失败')
        }
        layer.msg('更新用户信息成功')
        window.parent.getUserInfo()
      }
    })


  })

})