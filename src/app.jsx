import React, {Component}from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link,Switch,Redirect} from 'react-router-dom';
// 页面
import Home from 'page/home/index.jsx';
import Layout from "component/layout/index.jsx";

class App extends Component{
  constructor(props) {
<<<<<<< HEAD
    super(props)
=======
    super(props);
>>>>>>> company
    
  }
  render(){
    return (
<<<<<<< HEAD
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/product" component={Home} />
            <Route exact path="/product-category" component={Home} />
          </Switch>
        </Layout>
      </Router>
=======
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
>>>>>>> company
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)