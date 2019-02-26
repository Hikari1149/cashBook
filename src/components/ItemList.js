import React from 'react';
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'
function ItemList(props) {
    const OnEdit=props.ItemEdit;
    const OnDelete=props.ItemDelete;
    const items=props.Items.map((item,index)=>{
            return <li className="row list-group-item" key={index}>
                    <span className="col-lg-2">
                       <Ionicon
                           className="rounded-circle"
                           font-size="30px"
                           icon={item.category.iconName}
                       >
                       </Ionicon>

                        </span>
                <span className="col-lg-4">{item.title}</span>
                <span className="col-lg-2">
                        {item.category.type === 'income' ? '+' : '-'}
                    {item.price} 元</span>
                <span className="col-lg-2">  {item.date}</span>
                <a className="col-lg-1" onClick={(event) => {
                    event.preventDefault();
                    OnEdit(item)
                }}>

                    <Ionicon
                        className="rounded-circle"
                        fontSize="30px"
                        icon="ios-create-outline"
                    >
                    </Ionicon>

                </a>
                <a className="col-lg-1" onClick={(event) => {
                    event.preventDefault();
                    OnDelete(item)
                }}>
                    <Ionicon
                        className="rounded-circle"
                        fontSize="30px"
                        icon="ios-close"
                    >
                    </Ionicon>

                </a>
            </li>

    });
    return (
        <ul className="list-group">
            {items}
        </ul>
    )
}
ItemList.propTypes={
    Items:PropTypes.array.isRequired,
    ItemEdit:PropTypes.func.isRequired,

}
ItemList.defaultProps={
    ItemEdit:()=>{}
}

export default ItemList;