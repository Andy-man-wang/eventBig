$(function () {
  var p = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: ''
  }
  var layer = layui.layer
  var form = layui.form
  // 获取文章列表数据,渲染到页面上
  initTable()
  function initTable() {
    $.ajax({
      url: '/my/article/list',
      type: 'GET',
      data: p,
      success: function (res) {
 
        var inner = template('tpl-table', res)
        $('tbody').html(inner)
      }
    })

  }

  initCate()
  // 获取分类信息,并渲染
  function initCate() {
    $.ajax(
      {
        url: '/my/article/cates',
        type: 'GET',
        success:function(res){
          // console.log(res);
         var htmlStr=template('tpl-cate',res)
         $('[name=cate_id]').html(htmlStr);
         form.render()
        }
      }

    )
  }



// 点击筛选按钮，进行条件筛选
$('#form-search').on('submit',function (e) {
  // 获取两个下拉框的内容
  e.preventDefault()
  p.cate_id = $('[name=cate_id]').val()
  p.state = $('[name=state]').val();
  initTable()
})



})