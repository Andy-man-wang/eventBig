$(function () {
  var p = {
    pagenum: 1, //页码值，默认请求第一页的数据
    pagesize: 2,//每页显示几条数据
    cate_id: '',//文章分类的id
    state: '' //文章的发布状态
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

        // res.data.forEach(function(item){
        //   console.log(item);
        //   item.pub_date=dayjs(item.pub_date).format('YYYY-MM-DD HH:MM:SS')
        // })
        var tableHtml = template('tpl-table', res)
        $('tbody').html(tableHtml)
        // console.log(res);
        renderPage (res.total)
       
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


// 创建renderPage函数渲染分页
function renderPage (total){
  // console.log(total);
  // 引入layui中的分页
  var laypage = layui.laypage;
  laypage.render({
    elem:'pageBox',
    count:total,
    limit:p.pagesize,
    curr:p.pagenum,
    layout:['count','limit','prev', 'page', 'next','skip'],
    limits:[2,3,5,10],
    jump: function(obj, first){
      //obj包含了当前分页的所有参数，比如：
    // console.log(obj.curr) //得到当前页，以便向服务端请求对应页的数据。
    // console.log(obj.limit); //得到每页显示的条数
    p.pagenum=obj.curr
    p.pagesize=obj.limit
    if(!first){
      initTable()
    }
    }
  })
}

// 点击删除按钮实现删除页面的操作
$('body').on('click','.btn-delete',function(){
  // alert('123')
  var id = $(this).attr('data-id')
  var len = $('.btn-delete').length
  layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
    //do something
    
    $.ajax({
      url:'/my/article/delete/'+id,
      type:'get',
      
      success:function(res){
        if(status=== 0){
          return layer.msg('删除失败');
        }
        layer.msg("删除成功")
        
      if(len===1){
        p.pagenum=p.pagenum===1 ? 1 : p.pagenum-1
      }
      initTable()
      }
    })
    
    layer.close(index);
  });
})




})