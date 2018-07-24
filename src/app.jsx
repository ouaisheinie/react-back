import React, {Component}from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link,Switch} from 'react-router-dom';

class A extends Component{
  constructor(props) {
    super(props);
    
  }
  render(){
    return (
      <div>
        ComponentA
        <Switch>
          {/* 不带参数的 */}
          <Route exact path={`${this.props.match.path}`} 
          render={(route)=>{
            return <div>当前组件是不带参数A</div>
          }}/>
          {/* 带路径的 */}
          <Route path={`${this.props.match.path}/sub`} 
          render={(route)=>{
            return <div>当前组件是sub</div>
          }}/>
          {/* 带参数的 */}
          <Route path={`${this.props.match.path}/:id`} 
          render={(route)=>{
            return <div>当前组件是带参数A,参数是:{route.match.params.id}</div>
          }}/>
        </Switch>
      </div>
    )
  }
}

class B extends Component{
  constructor(props) {
    super(props);
    
  }
  render(){
    return (
      <div>ComponentB</div>
    )
  }
}

class Wrapper extends Component{
  constructor(props) {
    super(props);
    
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