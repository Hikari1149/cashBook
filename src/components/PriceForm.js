import React from 'react';
import {IsValidDate} from "../utility";

class PriceForm extends React.Component{
    state={
        ValidDatePass:true,
        ErrorMessage:'',
    };
    SubmitForm=(event)=>{
        event.preventDefault();
        const {item,onFormSubmit}=this.props;
        const editMode= !!item.id;//强转成bool
        const title=this.TitleInput.value.trim();
        const price=this.PriceInput.value.trim();//去除空格.
        const date=this.DataInput.value.trim();
        console.log(date);
        if(price && date && title){
            if(price<0){
                this.setState({
                    ValidDatePass: false,
                    ErrorMessage: '价格不能为负数'
                })
            }
            else if(!IsValidDate(date)){
                this.setState({
                    ValidDatePass:false,
                    ErrorMessage:'日期格式错误',
                })
            }
            else{
                this.setState({
                    ValidDatePass:true,
                    ErrorMessage:''
                })
                //格式正确 更新.
                if(editMode)    onFormSubmit({...item,title,price,date},editMode);//合并
                else    onFormSubmit({title,price,date},editMode);
            }
        }
        else{
            this.setState({
                ValidDatePass:false,
                ErrorMessage:'请输出所有选项',
            })
        }
    };
    render(){
        const {title,price,date}=this.props.item;
        return <form onSubmit={(event)=>{this.SubmitForm(event)}} className="form-horizontal">
            <div className="form-group">
                <label className="col-sm-2 control-label">标题</label>
                <div className="col-sm-10">
                    <input  className="form-control"
                            placeholder="Title"
                            defaultValue={title}
                            ref={(input)=>{this.TitleInput=input}}
                    />
                </div>
            </div>
            <div className="form-group">
                <label className="col-sm-2 control-label">金额</label>
                <div className="col-sm-10">
                    <input type="number"
                           className="form-control"
                           id="inputPassword3"
                           placeholder="Money"
                           defaultValue={price}
                           ref={(input)=>{this.PriceInput=input}}
                    />
                </div>
            </div>
            <div className="form-group">
                <label className="col-sm-2 control-label">日期</label>
                <div className="col-sm-10">
                    <input type="date"
                           className="form-control"
                           id="inputPassword3"
                           placeholder="Date"
                           defaultValue={date}
                           ref={(input)=>{this.DataInput=input}}
                    />
                </div>
            </div>
            <div className="form-group">
                    <button type="submit" className="btn btn-primary mr-3"> 确定 </button>
                    <button
                        onClick={this.props.onCancelSubmit}
                        className="btn btn-secondary"> 取消 </button>
            </div>
            {!this.state.ValidDatePass &&//显示错误消息.
                <div className="alert alert-danger mt-5">
                    {this.state.ErrorMessage}
                </div>
            }
        </form>
    }
}
export default PriceForm;
