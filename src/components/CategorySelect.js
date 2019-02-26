import React, { Component } from 'react';
import Ionicon from 'react-ionicons';
import {Colors} from '../utility.js';
class CategorySelect extends Component {
    SelectClick=(event,item)=>{
        event.preventDefault();
        this.props.OnSelect(item);
    };
    render(){
        const {Categories,SelectedCategory}=this.props;
        const SelectID=SelectedCategory && SelectedCategory.id;//根据模式 来判断是否有ID.
    //    console.log(SelectedCategory);
      //  console.log(SelectID);

        return <div className="CategoryComponent">
                <div className="row">
                    {Categories.map((item, index) => {
                        const backcol=(item.id===SelectID)?Colors.blue:Colors.lightGray;
                        const iconcol=(item.id===SelectID)?Colors.white:Colors.gray;
                        const GetClass= (item.id===SelectID)?
                            'category-item col-lg-3 active':'category-item col-lg-3';
                       return <div
                           key={index}
                           className={GetClass}
                           style={{textAlign:'center'}}
                       >
                            <Ionicon
                                className="rounded-circle"
                                fontSize="50px"
                                color={iconcol}
                                style={{backgroundColor:backcol,padding:'5px'}}
                                icon={item.iconName}
                                onClick={(event)=>{this.SelectClick(event,item)}}
                            >
                            </Ionicon>
                           <p>{item.name}</p>
                       </div>
                    })
                    }
                </div>
        </div>
    }
}
export default CategorySelect;