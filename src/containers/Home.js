import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import ItemList from "../components/ItemList";
import {CHART_VIEW,LIST_VIEW,GetDate,PadLeft,Colors} from "../utility";
import TotalPrice from "../components/TotalPrice";
import MonthSelect from "../components/MonthSelect";
import Tabs from '../components/Tabs.js';
import Ionicon from 'react-ionicons'
import WithContext from '../WithContext.js';
import CreateBtn from "../components/CreateBtn";
import {withRouter} from 'react-router-dom';
import Loader from '../components/Loader.js';
import PieChart from '../components/PieChart.js';
const TabArray=[LIST_VIEW,CHART_VIEW];
const generateChartDataByCategory = (items,type='outcome')=>{
    let categoryMap={};//map
    items.filter(item=>item.category.type== type) .forEach((item)=> {
        if (categoryMap[item.cid]) {
            categoryMap[item.cid].value += (item.price * 1);
            categoryMap[item.cid].items = [...categoryMap[item.cid].items, item.id];
        }
        else {
            categoryMap[item.cid] = {
                category: item.category,
                value: item.price * 1,
                items: [item.id]
            }
        }
    })
    //map ->arr
    return Object.keys(categoryMap).map(mapKey =>({...categoryMap[mapKey],name:categoryMap[mapKey].category.name}))
}
class Home extends Component{
    constructor(props){
        super(props);
        this.state={
            Tabview:LIST_VIEW,
        };
    }
    componentDidMount(){
        this.props.actions.getInitData();
    }
    DateChange=(year,month)=> { //更新日期.并更新对应的items
        this.props.actions.DateChange(year,month);
    };
    TabChange=(event,index)=>{//
        event.preventDefault();
        this.setState({
            Tabview:TabArray[index]
        });
    };
    ItemDelete=(TargetItem)=>{///删除元素,更新数组
       this.props.actions.ItemDelete(TargetItem);
    };
    ItemEdit=(TargetItem)=>{
        this.props.history.push(`/edit/${TargetItem.id}`)
    };
    ItemCreate= ()=>{
        this.props.history.push('/create');//完成页面跳转.
    };
    render(){
        const {data}=this.props;
        const {items,categories,currentDate,isLoading}=data;
        const {Tabview}= this.state;
        const tabIndex = TabArray.find(tabsText=> tabsText===Tabview)
        console.log(items);
        const itemsWithCategory= Object.keys(items).map(id=>{
            items[id].category = categories[items[id].cid];//为items添加类别
            return items[id];
        }).filter(item=>{
            //  console.log(currentDate.year);
           // console.log(item.date.slice(0,4));
          //  console.log(item.date.slice(5,7));
            const f1=   (currentDate.year*1 === item.date.slice(0,4)*1);
            const f2=  (currentDate.month*1 === item.date.slice(5,7)*1);
            console.log(f1);
         //   return currentDate.year === item.date.slice(0,4) && currentDate.month === item.date.slice(5,7);
            return f1 && f2
        });
        let income=0,outcome=0;
        itemsWithCategory.map((item)=>{//根据列表计算收入和支出.
           if(item.category.type==='income')    income+=item.price;
           else outcome+=item.price;
           return item;
        })
        const chartOutcomDataByCategory = generateChartDataByCategory(itemsWithCategory, 'outcome')
        const chartIncomeDataByCategory = generateChartDataByCategory(itemsWithCategory, 'income')
        const ColorsArr=Object.keys(Colors).map(key=>Colors[key]);
        return (
                    <React.Fragment>
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                    </header>
                    <div className="row">
                        <div className="col">
                            <MonthSelect
                                Year={currentDate.year}
                                Month={currentDate.month}
                                OnChange={this.DateChange}
                            />
                        </div>
                        <div className="col">
                            <TotalPrice
                                Income={income}
                                Outcome={outcome}
                            />
                        </div>
                    </div>
                    <Tabs activeIndex={tabIndex} onTabChange={this.TabChange}>
                        <div>
                            <Ionicon
                                className="rounded-circle"
                                fontSize="30px"
                                icon="ios-paper"
                            >
                            </Ionicon>
                            列表模式
                        </div>
                        <div>
                            <Ionicon
                                className="rounded-circle"
                                fontSize="30px"
                                icon="ios-pie"
                            >
                            </Ionicon>
                          图表模式
                        </div>
                    </Tabs>
                        <div className="col">
                            <CreateBtn
                                OnCreate={this.ItemCreate}
                            />
                        </div>
                        {
                            isLoading &&
                            <Loader/>
                        }
                        {
                            !isLoading &&
                            <div role="ItemList">
                                {Tabview === 'list' &&
                                <ItemList
                                    Items={itemsWithCategory}
                                    ItemEdit={this.ItemEdit}
                                    ItemDelete={this.ItemDelete}
                                />
                                }
                                {
                                    Tabview === 'chart' &&
                                    <React.Fragment>
                                        <PieChart title="本月支出" categoryData={chartOutcomDataByCategory} />
                                        <PieChart title="本月收入" categoryData={chartIncomeDataByCategory} />
                                        </React.Fragment>

                                }
                            </div>
                        }
                </React.Fragment>

        )
    }
}
//HOC
export default withRouter(WithContext(Home))