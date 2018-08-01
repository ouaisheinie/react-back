import React, {Component}from 'react';
// 组件
import PageTitle from "component/page-title/index.jsx";
import CategorySelector from "./category-selector.jsx";

import Product from "service/Product-service.jsx";
import MUtil from 'util/mm.jsx';
const _product = new Product(); 
const _mm = new MUtil();

import "./save.scss";
import "./category-selector.scss";

class ProductDetail extends Component{
  constructor(props) {
    super(props)
    this.state = {
      id:this.props.match.params.pid,
      categoryId:0,
      parentCategoryId:0,
      subImages:[],
      name:"",
      subtitle:"",
      price:"",
      stock:"",
      detail:"",
      status:1  //商品状态1 在售
    }
  }
  componentDidMount(){
    this.loadProduct();
  }
  //加载商品详情
  loadProduct(){
    //如果有id就是编辑  没有id就是新增就不处理
    if(this.state.id){
      _product.getProduct(this.state.id).then(res => {
        //处理subImages
        let images = res.subImages.split(",");
        res.subImages = images.map((imgUri)=>{
          return {
            uri:imgUri,
            url:res.imageHost + imgUri
          }
        });
        this.setState(res);
      },errMsg => {
        _mm.errorTips(errMsg);
      })
    }
  }
  render(){
    return(
      <div id="page-wrapper">
        <PageTitle title="添加商品" />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-2 control-label">商品名称</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {this.state.name}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">商品描述</label>
            <div className="col-md-5">
              <p className="form-control-static">
                {this.state.subtitle}
              </p>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">所属分类</label>
            <CategorySelector 
            readOnly
            categoryId = {this.state.categoryId}
            parentCategoryId= {this.state.parentCategoryId}/>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">价格</label>
            <div className="col-md-2">
              <div className="input-group">
                <input type="number" className="form-control"
                  value={this.state.price} readOnly/>
                <span className="input-group-addon">元</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">商品库存</label>
            <div className="col-md-2">
              <div className="input-group">
                <input type="number" className="form-control"
                value = {this.state.stock} readOnly/>
                <span className="input-group-addon">件</span>
              </div>
            </div>
          </div>
          {/* 图片 */}
          <div className="form-group">
            <label className="col-sm-2 control-label">商品图片</label>
            <div className="col-md-10">
              {
                this.state.subImages.length ? this.state.subImages.map(
                  (image,index)=>(
                    <div key={index} className="img-con">
                      <img className="img" src={image.url}/>
                    </div>
                  )
                ):<div>暂无图片</div>
              }
            </div>
          </div>
          {/* 富文本编辑器 */}
          <div className="form-group">
            <label className="col-sm-2 control-label">商品详情</label>
            <div className="col-md-10" dangerouslySetInnerHTML={{__html:this.state.detail}}>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductDetail;