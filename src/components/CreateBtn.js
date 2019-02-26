import React from 'react';
class CreateBtn extends React.Component {
    render(){
        return (
            <button
                className="btn btn-primary btn-block d-flex justify-content-center align-items-center"
                onClick={ (event)=>{
                    event.preventDefault();
                    this.props.OnCreate();
                } }

            >创建一条新的记账记录</button>
        )
    }
}
export default CreateBtn;