import React, {Component}from 'react';
import "./category-selector.scss";

import Product from "service/Product-service.jsx";
import MUtil from 'util/mm.jsx';
const _product = new Product(); 
const _mm = new MUtil();

//品类选择器
class CategorySelecotr extends Component{
  constructor(props) {
    super(props);
    this.state = {//默认的4个state
      firstCategoryList:[],
      firstCategoryId:0,
      secondCategoryList:[],
      secondCategoryId:0
    }
  }
  
  componentDidMount(){
    this.loadFirstCategory();
  }
  componentWillReceiveProps(nextProps){
    let categoryIdChange = this.props.categoryId !== nextProps.categoryId;
    let parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
    //数据没有发生变化的时候 直接不做处理
    if(!categoryIdChange && !parentCategoryIdChange){
      return;
    }
    //假如只有一级品类
    if(nextProps.parentCategoryId === 0){
      this.setState({
        firstCategoryId : nextProps.categoryId,
        secondCategoryId : 0
      });
    }
    //有2级品类
    else{
      this.setState({
        firstCategoryId:nextProps.parentCategoryId,
        secondCategoryId:nextProps.categoryId
      },()=>{
        parentCategoryIdChange && this.loadSecondCategory();
      })
    }
  }
  //加载Category一级分类
  loadFirstCategory(){
    _product.getCategoryList().then(res=>{
      this.setState({firstCategoryList:res});
    },errMsg=>{
      _mm.errorTips(errMsg);
    })
  }
  //加载二级品类
  loadSecondCategory(){
    _product.getCategoryList(this.state.firstCategoryId).then(res=>{
      this.setState({secondCategoryList:res});
    },errMsg=>{
      _mm.errorTips(errMsg);
    })
  }
  //选择一级品类的
  onFirstCategoryChange(e){
    if(this.props.readOnly){
      return;
    }
    let newValue = e.target.value || 0;
    this.setState({
      firstCategoryId:newValue,
      secondCategoryId:0,
      secondCategoryList:[]
    },()=>{
      //更新二级品类
      this.loadSecondCategory();
      //更新二级品类的时候  以及品类必定已经存在 所以需要在这里把以及品类暴露出去
      this.onPropsCategoryChange();
    });
  }
  //选择二级品类
  onSecondCategoryChange(e){
    if(this.props.readOnly){
      return;
    }
    let newValue = e.target.value || 0;
    this.setState({
      secondCategoryId:newValue
    },()=>{
      this.onPropsCategoryChange();
    });
  }
  //传给父组件选中的结果
  onPropsCategoryChange(){
    //判断props里面的回调函数的存在与否
    let cateoryChangable = typeof this.props.onCategoryChange === 'function';
    //如果有二级品类被选中
    if(this.state.secondCategoryId){
      cateoryChangable && this.props.onCategoryChange(this.state.secondCategoryId,this.state.firstCategoryId);
    }else{//如果只有一集品类被选中
      this.props.onCategoryChange(this.state.firstCategoryId,0);
    }
  }
  render(){
    return(
      <div className="col-md-10">
        <select 
        value={this.state.firstCategoryId}
        className="form-control cate-select" onChange={(e)=>this.onFirstCategoryChange(e)}
        readOnly = {this.props.readOnly}
        >
          <option value="">请选择一级分类</option>
          {
            this.state.firstCategoryList.map((category,index)=><option key={index} value={category.id}>{category.name}</option>)
          }
        </select>
        {
          this.state.secondCategoryList.length ? 
          (<select 
            value={this.state.secondCategoryId}
            className="form-control cate-select" onChange={(e)=>this.onSecondCategoryChange(e)}
            readOnly = {this.props.readOnly}
            >
            <option value="">请选择二级分类</option>
            {
              this.state.secondCategoryList.map((category,index)=><option key={index} value={category.id}>{category.name}</option>)
            }
          </select>) : null
        }
      </div>
    )
  }
}

export default CategorySelecotr;