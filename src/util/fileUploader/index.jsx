import React,{Component} from 'react';
import FileUpload from './react-fileupload.jsx';

class FileUploader extends Component{

  render(){
    /*set properties*/
    const options={
      baseUrl:'/manage/product/upload.do',
      fileFieldName:'upload_file',
      dataType:'json',
      uploadSuccess:(res)=>{this.props.onSuccess(res.data)},
      uploadError:(err)=>{this.props.onError(err.message || '上传图片出错了')},
      chooseAndUpload:true
    }
    return (
      <FileUpload options={options}>
        <button className="btn btn-xs btn-default" ref="chooseAndUpload">选择图片</button>
      </FileUpload>
    )	        
  }
}

export default FileUploader;