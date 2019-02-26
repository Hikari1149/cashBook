import React from 'react';
function TotalPrice(props) {
    const Remain=Number(props.Income)-Number(props.Outcome);
    return <div className="row">
        <div className="col-lg-3"><span>收入:{props.Income}元</span></div>
        <div className="col-lg-3">支出:{props.Outcome}元</div>
        <div className="col-lg-3">剩余:{Remain}元</div>
    </div>
}
export default TotalPrice;