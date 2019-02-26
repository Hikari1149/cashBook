import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import Home from './containers/Home.js';
import Create from './containers/Create.js';
import {flatterArray, GetDate, ID, PadLeft} from "./utility";
import axios from 'axios';
export const AppContext=React.createContext();
class App extends Component {
    constructor(props){
        super(props);
        this.state={
            items:{},
            categories:{},
            currentDate:GetDate(),
            isLoading:false,
        };
        this.actions={
            getInitData: async ()=>{
                this.setState({
                   isLoading: true
                });
                const {currentDate}= this.state;
              //  const getURLWithData=`/items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_order=desc`;
                const getURLWithData=`/items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_order=desc`
                const results = await Promise.all([axios.get('/categories'), axios.get(getURLWithData)]);
                // 数据从后端获取.
                const [categories,items]= results;
                this.setState({
                    items:flatterArray(items.data),
                    categories: flatterArray(categories.data),
                    isLoading:false,//得到数据
                })

               // console.log(this.state.items);
            },
            DateChange: async (year,month)=> { //更新日期.并更新对应的items
                const getURLWithData = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`
                const items= await axios.get(getURLWithData);
                this.setState({
                     items:flatterArray(items.data),
                     currentDate: {year,month},
                })
                return items;
            },
            ItemDelete: async (item) =>{
                 const deleteItem=await axios.delete(`/items/${item.id}`);
                 delete this.state.items[item.id];//这里改变了state,但不会引起页面刷新
                 this.setState({
                     items:this.state.items
                 })
                return deleteItem;
            },
            ItemCreate: async (data,categoryId)=>{
                const newID=ID();
                const parseDate=GetDate(data.date);
                data.monthCategory=`${parseDate.year}-${parseDate.month}`;
                data.timestamp=new Date(data.date).getTime();//for sort
                console.log(data);
              //  const newItem={...data,id:newID,cid:categoryId,price:data.price*1};
                const newItem=await axios.post('items',{...data,id:newID,cid:categoryId,price:data.price*1});
                this.setState({
                    items:{...this.state.items,[newID]: newItem.data}
                })
            },
            ItemUpdate: async (data,categoryId)=>{
                const modifyItem={
                    ...data,
                    cid:categoryId,
                    timestamp:new Date(data.date).getTime(),//
                    price:data.price*1// str to num
                };
                const updatedItem = await axios.put(`/items/${modifyItem.id}`, modifyItem);
                this.setState({
                    items:{...this.state.items, [modifyItem.id]:modifyItem}
                });
                return updatedItem.data;
            }
        }
    }
    render() {
        return (
            <AppContext.Provider value={
                {
                    state:this.state,
                    actions:this.actions
                }
            }>
            <Router>
              <div className="App">
                <div className="container pb-5">
                    <Route path='/' exact component={Home}/>
                    <Route path='/create' component={Create}/>
                    <Route path='/edit/:id' component={Create} />
                </div>
              </div>
            </Router>
            </AppContext.Provider>
        );
    }
}
export default App;
