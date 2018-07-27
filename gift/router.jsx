//页面路由
window.location.href = 'http://www.baidu.com';
history.back()

//hash 路由
window.location = "#hash";
window.onhashchange  = function() {
  console.log('current hash:',window.location.hash);
}

//h5路由 
//推进一个状态
history.pushState('name','title','/path');
//替换一个状态
history.replaceState('name','title','/path');
//popstate  在window上监听 popstate 只处理后退 不处理前进
window.popstate = function(){
  console.log(window.location.href);
  console.log(window.location.pathname); //绝对路径
  console.log(window.location.hash);//hash
  console.log(window.location.search);//hash
}



// hash router
import {HashRouter as Router,Route,Link} from 'react-router-dom';

//browser router  这个只是前端路由 后端是请求不到的
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';




/* 课程代码 */

import React, {Component}from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';

class A extends Component{
  constructor(props) {
    super(props)
  }
  render(){
    return (
      <div>
        Component A
        <Switch>
          <Route exact path={`${this.props.match.path}`} 
          render={(route)=>{
            return <div>当前组建是不带参数的A</div>
          }}/>
          <Route exact path={`${this.props.match.path}/sub`} 
          render={(route)=>{
            return <div>当前组建是sub</div>
          }}/>
          <Route exact path={`${this.props.match.path}/:id`} 
          render={(route)=>{
            return <div>当前组建是带参数的A,参数是:{route.match.params.id}</div>
          }}/>
        </Switch>
      </div>
    )
  }
}
class B extends Component{
  constructor(props) {
    super(props)
  }
  render(){
    return (
      <div>Component B</div>
    )
  }
}
class Wrapper extends Component{
  constructor(props) {
    super(props)
  }
  render(){
    return (
      <div>
        <Link to="/a">组件A</Link>
        <br/>
        <Link to="/a/123">带参数的组件A</Link>
        <br/>
        <Link to="/b">组件B</Link>
        <br/>
        <Link to="/a/sub">/a/sub</Link>
        {this.props.children}
      </div>
    )
  }
}

ReactDOM.render(
  <Router>
    <Wrapper>
      <Route path="/a" component={A}/>
      <Route path="/b" component={B}/>
    </Wrapper>
  </Router>,
  document.getElementById('app')
)