import React, {Component}from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,Route,Link,Switch,Redirect} from 'react-router-dom';
// 页面
import Home from 'page/home/index.jsx';
import Layout from "component/layout/index.jsx";

class App extends Component{
  constructor(props) {
    super(props)
    
  }
  render(){
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/product" component={Home} />
            <Route exact path="/product-category" component={Home} />
          </Switch>
        </Layout>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)