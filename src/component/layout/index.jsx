import React,{Component} from 'react';
import './theme.css';
import "./index.scss";
import NavTop from "component/nav-top/index.jsx";
import NavSide from "component/nav-side/index.jsx";

class Layout extends Component{
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div id="wrapper">
        <NavTop />
        {/* 并不是通过Route引用的 所以NavTop不能继承Route的history对象 */}
        <NavSide />
        {this.props.children}
      </div>
    );
  }
}

export default Layout;