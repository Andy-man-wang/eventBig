$(function () {
  var layer = layui.layer
  var form = layui.form
  // 初始化富文本编辑器
  initEditor()
  initCate()
  // 获取文章分类并渲染
  function initCate() {
    $.ajax({
      url: '/my/article/cates',
      type: 'get',
      success: function (res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        var strHtml = template('tpl-cate', res)
        $('[name=cate_id]').html(strHtml)
        form.render()
      }
    })
  }

  // 图片裁剪
    // 1. 初始化图片裁剪器
    var $image = $('#image')
    // 2. 裁剪选项
    var options = {
      aspectRatio: 400 / 280,
      preview: '.img-preview'
    }
    // 3. 初始化裁剪区域
    $image.cropper(options)


  // 为选择封面添加点击事件
  $('#btnChooseImage').on('click',function(){
    $('#filter').click()
  })
  $('#filter').change(function(e){
    var file = e.target.files[0]
    var newImgURL = URL.createObjectURL(file)
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
  })


  var art_state = '已发布'
  $('#btnSave2').click(function(){
    art_state="存为草稿"
  })

// 点击表单提交，提交或存为草稿，提交表单
$('#form-pub').on('submit',function(e){
  e.preventDefault()

  var fd = new FormData($(this)[0])
  
  fd.append('state', art_state);
  // console.log(fd);
  // 获取裁剪图像的属性
  $image
  .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    width: 400,
    height: 280
  })
  .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
    // 得到文件对象后，进行后续的操作
    fd.append('cover_img', blob);
    publishArticle(fd)
  })
   
 
})

function publishArticle(fd){
    // 将fd获取的内容发送给服务器
    $.ajax({

      url:'/my/article/add',
      type:'post',
      data:fd,
      contentType: false,
      processData: false,
      success:function(res){
      if (res.status!==0){
        return layer.msg(res.message)
      }
      layer.msg(res.message)
      location.href = '/article/art_list.html'
      }
    })
}
})