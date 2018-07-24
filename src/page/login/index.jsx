import React,{Component} from "react";
import './index.scss';


class Login extends Component{
  constructor(props) {
    super(props)
    this.state = {
      username:"",
      password:""
    }    
  }
  //用户名发生改变
  onInputChange(e){
    let inputName = e.target.name;
    let inputValue = e.target.value;
    this.setState({
      [inputName]:inputValue
    })
  }
  render(){
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading">欢迎登录 - MMALL管理系统</div>
          <div className="panel-body">
            <form>
              <div className="form-group">
                <input type="text" name="username" className="form-control" placeholder="请输入用户名" onChange={event=>{this.onInputChange(event)}}/>
              </div>
              <div className="form-group">
                <input type="password" name="password" className="form-control" placeholder="请输入密码" onChange={event=>{this.onInputChange(event)}}/>
              </div>
              <button type="submit" className="btn btn-lg btn-primary btn-block">登录</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;