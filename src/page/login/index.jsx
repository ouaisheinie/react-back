import React,{Component} from "react";
import './index.scss';
import User from "service/user-service.jsx";
const _user = new User();
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();

class Login extends Component{
  constructor(props) {
    super(props)
    this.state = {
      username:"",
      password:"",
      redirect:_mm.getUrlParam('redirect') || '/'
    }    
  }
  componentWillMount() {
    document.title = '登录 - MMALL ADMIN'
  }
  //用户名发生改变
  onInputChange(e){
    let inputName = e.target.name;
    let inputValue = e.target.value;
    this.setState({
      [inputName]:inputValue
    })
  }
  //当用户提交表单
  onSubmit(){
    let loginInfo = {
      username:this.state.username,
      password:this.state.password
    },
    checkResult = _user.checkLoginInfo(loginInfo);
    if(checkResult.status){ //验证通过
      _user.login(loginInfo).then((res)=>{
        _mm.setStorage('userInfo',res);
        this.props.history.push(this.state.redirect);
      },(errMsg)=>{
        _mm.errorTips(errMsg);
      });
    }else{//验证不通过
      _mm.errorTips(checkResult.msg);
    }
  }
  onInputKeyup(event){
    if(event.keyCode === 13){
      this.onSubmit();
    }
  }
  render(){
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading">欢迎登录 - MMALL管理系统</div>
          <div className="panel-body">
            <div>
              <div className="form-group">
                <input type="text" name="username" className="form-control" placeholder="请输入用户名" onKeyUp={event=>this.onInputKeyup(event)} onChange={event=>{this.onInputChange(event)}}/>
              </div>
              <div className="form-group">
                <input type="password" name="password" className="form-control" placeholder="请输入密码" onKeyUp={event=>this.onInputKeyup(event)} onChange={event=>{this.onInputChange(event)}}/>
              </div>
              <button className="btn btn-lg btn-primary btn-block" onClick={(e)=>{this.onSubmit(e)}}>登录</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;