import React, {Component}from 'react';
import ReactDOM from 'react-dom';

class Components extends Component{
  constructor(props) {
    console.log("初始化")
    super(props)
    console.log('constructor');
    this.state = {
      data: 'Old state'
    }
  }
  //组件挂载渲染之前
  componentWillMount() {
    console.log('componentWillMount');
  }
  //组件挂载渲染之后
  componentDidMount() {
    console.log('componentDidMount');
  }
  //组件接收父组件传来的props时触发
  componentWillReceiveProps() {
    console.log("componentWillReceiveProps");
  }
  //子组件是不是应该更新
  shouldComponentUpdate(){
    console.log('shouldComponentUpdate');
    return true;
  }
  
  //组件将要更新
  
  componentWillUpdate(nextProps, nextState) {
    console.log("componentWillUpdate");
  }
  
  
  //组件更新完成
  componentDidUpdate(prevProps, prevState){
    console.log("componentDidUpdate");
  }
  // 组件将要销毁  取消一些操作  例如定时器
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
  
  handleClick(){
    console.log("更新数据")
    this.setState({
      data:'New state'
    });
  }
  render(){
    console.log("render");
    return (
      <div>
        <div>Props:{this.props.data}</div>
        <button onClick={()=>{this.handleClick()}}>更新组件</button>
      </div>
    )
  }
}
class App extends Component{
  constructor(props) {
    super(props)
    this.state={
      data:"Old Props",
      hasChild:true
    }
    console.log('初始化数据');
  }
  onPropsChange(){
    this.setState({
      data:'New Props'
    })
  }
  onDestoryChild(){
    console.log("干掉子组件")
    this.setState({
      hasChild:false
    })
  }
  render(){
    return (
      <div>
        {
          this.state.hasChild?<Components data={this.state.data}/>:null
        }
        <button onClick={()=>{this.onPropsChange()}}>改变Props</button>
        <button onClick={()=>{this.onDestoryChild()}}>移除子组件</button>
      </div>
    )
  }
}
ReactDOM.render(
  <App />,
  document.getElementById('app')
)