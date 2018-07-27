import React,{Component} from 'react';
import {Link} from "react-router-dom";
import MUtil from 'util/mm.jsx';
import User from "service/user-service.jsx";
const _mm = new MUtil();
const _user = new User();


class NavTop extends Component{
  constructor(props) {
    super(props);
    this.state = {
        username:_mm.getStorage('userInfo').username || ''
    }
  }
  //退出登录
  onLogout(){
      _user.logout().then(res=>{
          _mm.removeStorage('userInfo');
        //   this.props.history.push('./login'); NavTop 不是通过Route来渲染的 所以不能继承route的history对象 所以会报错  这里直接用
        window.location.href = '/login';
      },errMsg=>{
          _mm.errorTips(errMsg);
      })
  }
  render(){
    return (
      <nav className="navbar navbar-default top-navbar">
            <div className="navbar-header">
                <Link className="navbar-brand" to="/"><b>HAPPY</b>MMALL</Link>
            </div>
            <ul className="nav navbar-top-links navbar-right">
                <li className="dropdown">
                    <a className="dropdown-toggle" href="javascript:;">
                        <i className="fa fa-user fa-fw"></i>
                        {
                            this.state.username 
                            ? <span>欢迎,{this.state.username}</span>
                            : <span>欢迎您</span>
                        }
                        <i className="fa fa-caret-down"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-user">
                        <li>
                            <a onClick={()=>{this.onLogout()}}>
                                <i className="fa fa-user fa-fw"></i>
                                <span>退出登录</span>
                            </a>
                        </li>
                    </ul>
                    
                </li>
                
            </ul>
        </nav>
    )
  }
}

export default NavTop;