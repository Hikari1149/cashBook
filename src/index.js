import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-grid.css';
//import 'bootstrap/dist/css/bootstrap.min.css;'
import axios from 'axios';
/*
axios.get('/items').then((response)=>{
    console.log(response)
});
const newItem= {
        "title": "no",
        "price": 1231,
        "date": "2019-02-22",
        "monthCategory": "2019-2",
        "id": "_kly1klf12",
        "cid": "1",
        "timestamp": 1534291200012
    };
axios.post('/items',newItem).then((response)=>{
    console.log(response);
});
*/
ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
