$.ajaxPrefilter(function(options){
options.url="http://ajax.frontend.itheima.net"+options.url;

if(options.url.indexOf('/my/')!==-1)
{
    options.headers={
    Authorization: localStorage.getItem('token') || ''
}
}
options.complete = function (res) {
  // console.log(res);
  console.log(res.responseJSON);

  if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
      // 1.清除token的值
      localStorage.removeItem('token')
      // 2.跳转到登录页面
      location.href = "login.html"
  }
}

})