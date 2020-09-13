$(function(){
  var form =layui.form
  var layer =layui.layer
  getCateList ()
  // 获取文章列表
  function getCateList (){
    $.ajax(
      {
        url:'/my/article/cates',
        type:'GET',
        success:function(res){
          // console.log(res);
          if(res.status!==0){
            return layui.layer.msg(res.message)
          }
          $('tbody').html(template('tpl-table',res))
        }

    }
    

      )
  }
  

  // 点击添加类别按钮弹出弹框
  var addCateIndex =null
  $('#btnAddCate').click(function(){
    addCateIndex = layer.open({
      type:1,
      area: ['500px', '250px'],
      title: '添加文章分类'
      ,content: $('#dialog_add').html()
    }); 
  })

  //使用弹框添加数据
  $('body').on('submit',"#form_add",function(e){
    // alert('111')
e.preventDefault()
    $.ajax({
      url:'/my/article/addcates',
      type:'POST',
      data:$(this).serialize(),
      success:function(res){
        if(res.status!==0){
          return layer.msg(res.message)
        }
        layer.msg('修改成功')
        getCateList ()
        layer.close(addCateIndex)
      }
    })
  })
 

})