//工具类文件
class MUtil{
  request(param){
    return new Promise((resolve,reject)=>{
      $.ajax({
        type: param.type || "get",
        url:param.url || '',
        dataType:param.dataType || 'json',
        data:param.data || null,
        success(res){
          if(res.status === 0 ){
            //请求成功
            typeof resolve === 'function' && resolve(res.data,res.msg);
          }else if(res.status === 10){
            //没有登录的状态 强制 做登录
            this.doLogin();
          }else{
            //错误
            typeof reject === "function" || reject(res.msg || res.data);
          }
        },
        error(err){
          typeof reject === "function" || reject(err.statusText);
        }
      });
    })
  };

  doLogin(){
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
  }

  //获取url 参数
  getUrlParam(name){
    //param=123&param1=456
    let queryString = window.location.search.split('?')[1] || '',
        reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
        result = queryString.match(reg);
        return result?decodeURIComponent(result[2]):null;
  }

  //错误提示
  errorTips(errMsg){
    alert(errMsg || '好像哪里不对');
  }
}

export default MUtil;