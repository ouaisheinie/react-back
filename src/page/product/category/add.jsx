import React,{Component} from "react";

import Product from "service/Product-service.jsx";
import MUtil from 'util/mm.jsx';
import PageTitle from 'component/page-title/index.jsx';

const _product = new Product(); 
const _mm = new MUtil();

class CategoryAdd extends Component{
  constructor(props) {
    super(props)
    this.state={
      categoryList:[],
      parentId : 0,
      categoryName:""
    }
  }
  componentDidMount() {
    this.loadCategoryList();
  }

  //显示父品类列表
  loadCategoryList(){
    _product.getCategoryList().then((res)=>{
      this.setState({
        categoryList:res
      });
    },(errMsg)=>{
      _mm.errorTips(errMsg);
    })
  }
  //输入时改变
  onValueChange(e){
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]:value
    })
  }
  //提交
  onSubmit(e){
    let categoryName = this.state.categoryName.trim();
    //如果商品品类名称不为空 直接提交数据
    if(categoryName){
      _product.saveCategory({
        parentId:this.state.parentId,
        categoryName:categoryName
      }).then(res=>{
        _mm.successTips(res);
        this.props.history.push('/product-category/index');
      },errMsg=>{
        _mm.errorTips(errMsg);
      });
    }
    //否则提示错误
    else{
      _mm.errorTips("请输入品类名称");
    }
  }
  render(){
    return (
      <div id="page-wrapper">
        <PageTitle title="品类列表"/>
        <div className="row">
          <div className="col-md-12">
            <div className="form-horizontal">
              <div className="form-group">
                <label className="col-sm-2 control-label">所属品类</label>
                <div className="col-md-5">
                  <select name="parentId" className="form-control" onChange={(e) => {this.onValueChange(e)}}>
                    <option value="0">根品类/</option>
                    {
                      this.state.categoryList.map((category,index)=>{
                        return <option key={index} value={category.id}>{category.name}</option>
                      })
                    }
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-2 control-label">品类名称</label>
                <div className="col-md-5">
                  <input type="text" name="categoryName" className="form-control" placeholder="请输入品类名称" 
                  name="categoryName"
                  value={this.state.name}
                  onChange={(e)=>this.onValueChange(e)}/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-10">
                  <button type="submit" className="btn btn-primary" 
                  onClick={e=>{this.onSubmit(e)}}>提交</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CategoryAdd;