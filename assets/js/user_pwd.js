$(function(){
  var form =layui.form;
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] ,
    rePwd:function(value){
      if(value===$('[name=oddPwd]').val()){
        return '新旧密码不能一致'
      }
    },
    samePwd:function(value){
      if(value!==$('[name=newPwd]').val()){
        return '两次密码输入一致'
      }
    }

  })
  // 重置密码
 $('.layui-form').on('submit',function(e){
  e.preventDefault()
  console.log($(this).serialize());
  $.ajax({
    url:'/my/updatepwd',
    type:'POST',
    data:$(this).serialize(),
    success:function(res){
      console.log(res);
    //   if(res.status!==0){
    //     return layui.layer.msg("修改失败")
    //   }
    //   layui.layer.msg("修改成功")
    //  $('.layui-form')[0].reset()
    }
  })
 })
})