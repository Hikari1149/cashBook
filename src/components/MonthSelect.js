import React from 'react';
import {GenRange, PadLeft} from "../utility";
class MonthSelect extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isOpen:false,
            selectYear:props.Year
        }
    }
    componentDidMount(){//当组件输出到DOM时 加载componentDidMount
        document.addEventListener('click',this.OtherClick,false);
    }
    componentWillUnmount(){
        document.removeEventListener('click',this.OtherClick,false);
    }
    OtherClick= (event)=>{
        event.preventDefault();
        //通过ref把this.node指向它所在的DOM节点.
        //当下拉菜单包含当前点击位置时直接退出即可.
        if(this.node.contains(event.target))
            return;
        this.setState({
           isOpen:false
        });
    };
    handleClick=(event)=>{
        event.preventDefault();
        this.setState({
            isOpen: !(this.state.isOpen)
        });
    };
    YearClick=(item)=>{
        this.setState({
            selectYear:item
        });
    };
    MonthClick=(event,item)=>{
        event.preventDefault();
        this.setState({
            isOpen:!(this.state.isOpen)
        });
        console.log(item);
        this.props.OnChange(this.state.selectYear,item);//传出,调用父组件的函数.
    };
    render(){
        const Year=this.props.Year;
        const Month=this.props.Month;
        const YearArray=GenRange(Year,-4,4);
        const MonthArray=GenRange(1,0,11);
        console.log(Month)
        return <div className="dropdown" ref={(ref)=>this.node=ref}>
                <button className="btn btn-default dropdown-toggle" onClick={this.handleClick}>
                    {Year}年 {Month}月
                    <span className="caret"></span>
                </button>
            {  this.state.isOpen && //为true是显示菜单 (true && exp )执行exp
                <div className="dropdown-menu row" style={{display: 'block'}}>
                    <div className="row">
                        <ul className="list-group col border-right years-range" >
                            {
                                YearArray.map((item,index)=>{
                                    return <li key={index}
                                                className={(item===this.state.selectYear)?'list-group-item active':'list-group-item'}
                                                onClick={(event)=>{event.preventDefault();
                                                this.YearClick(item);
                                                }}
                                            >
                                                {item}年
                                            </li>
                                })
                            }
                        </ul>
                        <ul className="list-group col">
                            {
                                MonthArray.map((item,index)=>{
                                    return <li key={index} className={(item===Month)?'list-group-item active':'list-group-item'}
                                                onClick={(event)=>this.MonthClick(event,item)}
                                    >
                                         {item}月</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            }

        </div>
    }
}
export default MonthSelect;