import React from 'react'
import CategorySelect from "../components/CategorySelect";
import PriceForm from "../components/PriceForm";
import Tabs from '../components/Tabs.js';
import WithContext from '../WithContext.js';
import {withRouter} from 'react-router-dom';
import {CHART_VIEW, LIST_VIEW} from "../utility";
const TabArray=['outcome','income'];
class Create extends React.Component{
    constructor(props){
        super(props);
        const {id}=props.match.params;
        const {categories,items}=props.data;
        this.state= {
            SelectedCategory: (id && items[id])?categories[items[id].cid]:null,
            SelectTab:(id && items[id])?categories[items[id].cid].type:'outcome'
        }
    }
    componentDidMount(){
     //   const {id} =this.props.match.params;
        this.props.actions.getInitData();//页面刷新时 重新获取数据(icon图标)
    }
    OnSelect=(item)=>{
        this.setState({
            SelectedCategory: item
        });
    };
    TabChange= (event,idx) =>{
        event.preventDefault();
        this.setState({
            SelectTab: TabArray[idx]
        })
    };
    onFormSubmit=(data,isEdit)=>{
        if(!isEdit){
            this.props.actions.ItemCreate(data,this.state.SelectedCategory.id);
        }else{
            this.props.actions.ItemUpdate(data,this.state.SelectedCategory.id);
        }
        this.props.history.push('/');

    };
    onCancelSubmit=()=>{
        this.props.history.push('/');
    };
    render() {
        const {data}=this.props;
        const {items,categories}=data;
        const {SelectTab}=this.state;
        const {id}=this.props.match.params;//edit的id
        const editItem=(id && items[id])? items[id]:{}
     //   console.log(SelectTab);
        console.log(items);
        const filterCategories = Object.keys(categories)
            .filter(id => categories[id].type === SelectTab)
            .map(id => categories[id]);//选择收入或是支出的类别.
        return (
                        <div className="create-page py-3 px-3 rounded mt-3 style={{background:'#fff'}}">
                            <Tabs activeIndex={0} onTabChange={this.TabChange}>
                                <span>支出</span>
                                <span>收入</span>
                            </Tabs>
                            <CategorySelect
                                Categories={filterCategories}
                                SelectedCategory={this.state.SelectedCategory}
                                OnSelect={this.OnSelect}
                            />
                            <PriceForm
                                onFormSubmit={this.onFormSubmit}
                                onCancelSubmit={this.onCancelSubmit}
                                item={editItem}
                            />
                        </div>
        )
    }
}
export default withRouter(WithContext(Create));