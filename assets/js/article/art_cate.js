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
  var editCateIndex = null
  $('#btnAddCate').click(function(){
    addCateIndex = layer.open({
      type:1,
      area: ['500px', '250px'],
      title: '添加文章分类'
      ,content: $('#dialog_add').html()
    })
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
 

// 展示编辑弹框
$('body').on('click','.btn-edit',function(){
  editCateIndex = layer.open({
    type:1,
    area: ['500px', '250px'],
    title: '修改文章分类'
    ,content: $('#edit-dialog').html()
  })

  // 将点击的那条数据渲染到表单上
  var cateId = $(this).attr('data-id')
  // console.log(cateId);
  $.ajax({
    url:`/my/article/cates/${cateId}`,
    type:'GET',
    success:function(res){
      form.val('edit-form',res.data)
    }
  })


// 修改内容
  $('body').on('submit', '#form_edit', function(e) {
    e.preventDefault()
    $.ajax({
          method: 'POST',
          url: '/my/article/updatecate',
          data: $(this).serialize(),
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('更新分类数据失败！')
            }
            layer.msg('更新分类数据成功！')
            layer.close(editCateIndex)
            getCateList ()
          }
    })
})

})



// 点击删除按钮删除数据
$('body').on('click','.btn-delet',function(){
  var cateId = $(this).attr('data-id');
  // console.log(cateId);
  $.ajax({
    url:'/my/article/deletecate/'+cateId,
    type:'GET',
    success:function(res){
      console.log(res);
      if(res.status!==0){
        return layer.msg(res.message)
      }
      layer.msg(res.message)
      layer.close(editCateIndex)
            getCateList ()
    }

  }) 
})

})