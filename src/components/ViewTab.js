import React from 'react';
import Ionicon from 'react-ionicons'
function getClass(now,name) {
    return now===name?'nav-link active':'nav-link';
}
function ViewTab(props) {
    return <ul className="nav nav-tabs nav-fill nav-my4">
        <li role="presentation" className='nav-item'>
            <a className={getClass(props.ActiveTab,'list')} onClick={(event)=>props.TabChange(event,'list')} href="#">
                <Ionicon
                    className="rounded-circle"
                    fontSize="30px"
                    icon="ios-paper"
                >
                </Ionicon>
                列表模式
            </a>
        </li>

        <li className='nav-item'>
            <a className={getClass(props.ActiveTab,'chart')} href="#" onClick={(event)=>props.TabChange(event,'chart')}>
                <Ionicon
                    className="rounded-circle"
                    fontSize="30px"
                    icon="ios-pie"
                >
                </Ionicon>
                图表模式
            </a>

        </li>


    </ul>
}
export default ViewTab